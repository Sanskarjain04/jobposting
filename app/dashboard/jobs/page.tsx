import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getUserPostedJobs } from "@/app/actions/dashboard";
import { JobManagementCard } from "@/components/dashboard/JobManagementCard";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Manage Jobs | JobBoard",
  description: "Manage your posted jobs",
};

export default async function ManageJobsPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  const jobs = await getUserPostedJobs();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Manage Jobs
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {jobs.length} active job posting{jobs.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link href="/jobs/new">
            <Button>Post New Job</Button>
          </Link>
        </div>

        {/* Jobs List */}
        {jobs.length > 0 ? (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <JobManagementCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              No jobs posted yet
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Get started by posting your first job opening.
            </p>
            <div className="mt-6">
              <Link href="/jobs/new">
                <Button>Post Your First Job</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}