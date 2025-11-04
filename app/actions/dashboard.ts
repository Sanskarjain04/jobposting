"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getDashboardStats() {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const [postedJobs, applications, totalApplicationsReceived] = await Promise.all([
      prisma.job.count({
        where: { postedById: session.user.id },
      }),
      prisma.application.count({
        where: { userId: session.user.id },
      }),
      prisma.application.count({
        where: {
          job: {
            postedById: session.user.id,
          },
        },
      }),
    ]);

    return {
      postedJobs,
      applications,
      totalApplicationsReceived,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      postedJobs: 0,
      applications: 0,
      totalApplicationsReceived: 0,
    };
  }
}

export async function getUserPostedJobs() {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const jobs = await prisma.job.findMany({
      where: { postedById: session.user.id },
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: {
        postedAt: "desc",
      },
    });

    return jobs;
  } catch (error) {
    console.error("Error fetching user jobs:", error);
    return [];
  }
}

export async function getUserApplications() {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const applications = await prisma.application.findMany({
      where: { userId: session.user.id },
      include: {
        job: {
          include: {
            postedBy: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        appliedAt: "desc",
      },
    });

    return applications;
  } catch (error) {
    console.error("Error fetching user applications:", error);
    return [];
  }
}

export async function deleteJob(jobId: string) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Verify ownership
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { postedById: true },
    });

    if (!job || job.postedById !== session.user.id) {
      return { success: false, error: "You don't have permission to delete this job" };
    }

    // Delete job (cascade will delete applications)
    await prisma.job.delete({
      where: { id: jobId },
    });

    return { success: true, message: "Job deleted successfully" };
  } catch (error) {
    console.error("Error deleting job:", error);
    return { success: false, error: "Failed to delete job" };
  }
}