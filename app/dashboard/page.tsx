import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getDashboardStats } from "../actions/dashboard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Dashboard | JobBoard",
  description: "Manage your job postings and applications",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  const stats = await getDashboardStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back, {session.user.name}!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <StatsCard
            title="Posted Jobs"
            value={stats.postedJobs}
            color="blue"
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />

          <StatsCard
            title="My Applications"
            value={stats.applications}
            color="green"
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />

          <StatsCard
            title="Applications Received"
            value={stats.totalApplicationsReceived}
            color="purple"
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Quick Actions
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/jobs/new">
              <Button className="w-full" size="lg">
                Post a New Job
              </Button>
            </Link>
            <Link href="/dashboard/jobs">
              <Button variant="outline" className="w-full" size="lg">
                Manage My Jobs
              </Button>
            </Link>
            <Link href="/dashboard/applications">
              <Button variant="outline" className="w-full" size="lg">
                View Applications
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Posted Jobs Preview */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Job Posts
              </h2>
              <Link href="/dashboard/jobs" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                View all →
              </Link>
            </div>
            {stats.postedJobs > 0 ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You have {stats.postedJobs} active job posting{stats.postedJobs !== 1 ? "s" : ""}
              </p>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You haven't posted any jobs yet
                </p>
                <Link href="/jobs/new">
                  <Button size="sm">Post Your First Job</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Applications Preview */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                My Applications
              </h2>
              <Link href="/dashboard/applications" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                View all →
              </Link>
            </div>
            {stats.applications > 0 ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You have applied to {stats.applications} job{stats.applications !== 1 ? "s" : ""}
              </p>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You haven't applied to any jobs yet
                </p>
                <Link href="/jobs">
                  <Button size="sm">Browse Jobs</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}