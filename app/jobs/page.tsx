import { Suspense } from "react";
import { getJobs } from "../actions/jobs";
import { SearchFilters } from "@/components/jobs/SearchFilters";
import { JobList } from "@/components/jobs/JobList";

interface PageProps {
  searchParams: Promise<{
    keyword?: string;
    type?: string;
    location?: string;
    page?: string;
  }>;
}

export default async function JobsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { jobs, totalCount, totalPages, currentPage } = await getJobs({
    keyword: params.keyword,
    type: params.type,
    location: params.location,
    page: params.page ? parseInt(params.page) : 1,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Find Your Next Opportunity
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {totalCount} job{totalCount !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* Search Filters */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <Suspense fallback={<div>Loading filters...</div>}>
            <SearchFilters />
          </Suspense>
        </div>

        {/* Job Listings */}
        <Suspense
          fallback={
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"
                />
              ))}
            </div>
          }
        >
          <JobList jobs={jobs} totalPages={totalPages} currentPage={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}