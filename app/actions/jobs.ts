"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export interface SearchParams {
  keyword?: string;
  type?: string;
  location?: string;
  page?: number;
}

export async function getJobs(params: SearchParams = {}) {
  const { keyword = "", type = "", location = "", page = 1 } = params;
  const itemsPerPage = 10;
  const skip = (page - 1) * itemsPerPage;

  try {
    const where = {
      AND: [
        keyword
          ? {
              OR: [
                { title: { contains: keyword, mode: "insensitive" as const } },
                { description: { contains: keyword, mode: "insensitive" as const } },
                { company: { contains: keyword, mode: "insensitive" as const } },
              ],
            }
          : {},
        type ? { type: { equals: type } } : {},
        location ? { location: { contains: location, mode: "insensitive" as const } } : {},
      ],
    };

    const [jobs, totalCount] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          postedBy: {
            select: {
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              applications: true,
            },
          },
        },
        orderBy: {
          postedAt: "desc",
        },
        skip,
        take: itemsPerPage,
      }),
      prisma.job.count({ where }),
    ]);

    return {
      jobs,
      totalCount,
      totalPages: Math.ceil(totalCount / itemsPerPage),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return {
      jobs: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}

export async function getJobById(id: string) {
  try {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        postedBy: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
        applications: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return job;
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}

export async function createJob(formData: FormData) {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const company = formData.get("company") as string;
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const description = formData.get("description") as string;
  const salary = formData.get("salary") as string;

  // Server-side validation
  if (!title?.trim() || !company?.trim() || !location?.trim() || !type || !description?.trim()) {
    return { success: false, error: "All required fields must be filled" };
  }

  try {
    const job = await prisma.job.create({
      data: {
        title: title.trim(),
        company: company.trim(),
        location: location.trim(),
        type,
        description: description.trim(),
        salary: salary?.trim() || null,
        postedById: session.user.id,
      },
    });

    revalidatePath("/jobs");
    revalidatePath("/dashboard/jobs");
    
    return { success: true, jobId: job.id };
  } catch (error) {
    console.error("Error creating job:", error);
    return { success: false, error: "Failed to create job" };
  }
}

export async function updateJob(jobId: string, formData: FormData) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const company = formData.get("company") as string;
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const description = formData.get("description") as string;
  const salary = formData.get("salary") as string;

  // Server-side validation
  if (!title?.trim() || !company?.trim() || !location?.trim() || !type || !description?.trim()) {
    return { success: false, error: "All required fields must be filled" };
  }

  try {
    // Verify ownership
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { postedById: true },
    });

    if (!job || job.postedById !== session.user.id) {
      return { success: false, error: "You don't have permission to edit this job" };
    }

    // Update job
    await prisma.job.update({
      where: { id: jobId },
      data: {
        title: title.trim(),
        company: company.trim(),
        location: location.trim(),
        type,
        description: description.trim(),
        salary: salary?.trim() || null,
      },
    });

    revalidatePath("/jobs");
    revalidatePath("/dashboard/jobs");
    revalidatePath(`/jobs/${jobId}`);
    
    return { success: true, jobId };
  } catch (error) {
    console.error("Error updating job:", error);
    return { success: false, error: "Failed to update job" };
  }
}