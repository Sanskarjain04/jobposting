import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getJobById } from "@/app/actions/jobs";
import { checkApplicationStatus, getRelatedJobs } from "@/app/actions/applications";
import { auth } from "@/lib/auth";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ApplyButton } from "@/components/jobs/ApplyButton";
import { RelatedJobs } from "@/components/jobs/RelatedJobs";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: `${job.title} at ${job.company} | JobBoard`,
    description: job.description.substring(0, 160),
    openGraph: {
      title: job.title,
      description: job.description.substring(0, 160),
      type: "website",
    },
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth();
  
  const job = await getJobById(id);
  
  if (!job) {
    notFound();
  }

  const application = session ? await checkApplicationStatus(id) : null;
  const isOwner = session?.user?.id === job.postedById;
  const relatedJobs = await getRelatedJobs(id, job.type, job.location);

  const typeVariants: Record<string, "default" | "success" | "info" | "warning"> = {
    "Full-time": "success",
    "Part-time": "info",
    "Contract": "warning",
    "Internship": "default",
    "Remote": "success",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Jobs
        </Link>

        <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          {/* Header Section */}
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  {job.postedBy.image && (
                    <Image
                      src={job.postedBy.image}
                      alt={job.postedBy.name || "User"}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {job.title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                      {job.company}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{job.location}</span>
                  </div>

                  <Badge variant={typeVariants[job.type] || "default"}>
                    {job.type}
                  </Badge>

                  {job.salary && (
                    <div className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{job.salary}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Job Description
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {job.description}
                  </p>
                </div>
              </div>

              {/* Applicants Section (Only for Job Owner) */}
              {isOwner && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Applications ({job.applications.length})
                  </h2>
                  {job.applications.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">
                      No applications yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {job.applications.map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {app.user.image && (
                              <Image
                                src={app.user.image}
                                alt={app.user.name || "User"}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {app.user.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {app.user.email}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={
                              app.status === "ACCEPTED" ? "success" :
                              app.status === "REJECTED" ? "danger" :
                              app.status === "REVIEWING" ? "info" : "warning"
                            }>
                              {app.status}
                            </Badge>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Applied {new Date(app.appliedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Apply Button */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <ApplyButton
                    jobId={job.id}
                    isOwner={isOwner}
                    application={application}
                    isAuthenticated={!!session}
                  />
                </div>

                {/* Posted By */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                    Posted By
                  </h3>
                  <div className="flex items-center gap-3">
                    {job.postedBy.image && (
                      <Image
                        src={job.postedBy.image}
                        alt={job.postedBy.name || "User"}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {job.postedBy.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {job.postedBy.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Job Stats */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                    Job Statistics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Total Applicants
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {job.applications.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Posted
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {new Date(job.postedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Jobs */}
        <RelatedJobs jobs={relatedJobs} />
      </div>
    </div>
  );
}