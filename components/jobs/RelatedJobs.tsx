import Link from "next/link";
import { JobCard } from "./JobCard";

interface RelatedJobsProps {
  jobs: any[];
}

export function RelatedJobs({ jobs }: RelatedJobsProps) {
  if (jobs.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Jobs
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div key={job.id} className="transform transition-transform hover:scale-105">
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
}