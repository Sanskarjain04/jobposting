import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getUserApplications } from "@/app/actions/dashboard";
import { ApplicationCard } from "@/components/dashboard/ApplicationCard";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "My Applications | JobBoard",
  description: "View and manage your job applications",
};

export default async function ApplicationsPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  const applications = await getUserApplications();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Applications
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {applications.length} application{applications.length !== 1 ? "s" : ""} submitted
          </p>
        </div>

        {/* Applications List */}
        {applications.length > 0 ? (
          <div className="grid gap-6">
            {applications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              No applications yet
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Start applying to jobs to see them here.
            </p>
            <div className="mt-6">
              <Link href="/jobs">
                <Button>Browse Jobs</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}