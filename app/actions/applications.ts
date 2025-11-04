"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function applyForJob(jobId: string) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { success: false, error: "You must be signed in to apply" };
  }

  try {
    // Check if already applied
    const existingApplication = await prisma.application.findUnique({
      where: {
        jobId_userId: {
          jobId,
          userId: session.user.id,
        },
      },
    });

    if (existingApplication) {
      return { success: false, error: "You have already applied for this job" };
    }

    // Create application
    await prisma.application.create({
      data: {
        jobId,
        userId: session.user.id,
        status: "PENDING",
      },
    });

    revalidatePath(`/jobs/${jobId}`);
    revalidatePath("/dashboard/applications");
    
    return { success: true, message: "Application submitted successfully!" };
  } catch (error) {
    console.error("Error applying for job:", error);
    return { success: false, error: "Failed to submit application" };
  }
}

export async function checkApplicationStatus(jobId: string) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return null;
  }

  try {
    const application = await prisma.application.findUnique({
      where: {
        jobId_userId: {
          jobId,
          userId: session.user.id,
        },
      },
      select: {
        id: true,
        status: true,
        appliedAt: true,
      },
    });

    return application;
  } catch (error) {
    console.error("Error checking application status:", error);
    return null;
  }
}

export async function withdrawApplication(jobId: string) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.application.delete({
      where: {
        jobId_userId: {
          jobId,
          userId: session.user.id,
        },
      },
    });

    revalidatePath(`/jobs/${jobId}`);
    revalidatePath("/dashboard/applications");
    
    return { success: true, message: "Application withdrawn successfully" };
  } catch (error) {
    console.error("Error withdrawing application:", error);
    return { success: false, error: "Failed to withdraw application" };
  }
}

export async function getRelatedJobs(jobId: string, jobType: string, location: string) {
  try {
    const relatedJobs = await prisma.job.findMany({
      where: {
        id: { not: jobId },
        OR: [
          { type: jobType },
          { location: { contains: location, mode: "insensitive" } },
        ],
      },
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
      take: 3,
      orderBy: {
        postedAt: "desc",
      },
    });

    return relatedJobs;
  } catch (error) {
    console.error("Error fetching related jobs:", error);
    return [];
  }
}