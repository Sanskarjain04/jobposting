import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    salary: string | null;
    postedAt: Date;
    postedBy: {
      name: string | null;
      image: string | null;
    };
    _count: {
      applications: number;
    };
  };
}

export function JobCard({ job }: JobCardProps) {
  const typeVariants: Record<string, "default" | "success" | "info" | "warning"> = {
    "Full-time": "success",
    "Part-time": "info",
    "Contract": "warning",
    "Internship": "default",
    "Remote": "success",
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {job.postedBy.image && (
              <Image
                src={job.postedBy.image}
                alt={job.postedBy.name || "User"}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {job.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {job.company}
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{job.location}</span>
            </div>

            <Badge variant={typeVariants[job.type] || "default"}>
              {job.type}
            </Badge>

            {job.salary && (
              <div className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{job.salary}</span>
              </div>
            )}
          </div>

          <p className="mt-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
            {job.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Posted {new Date(job.postedAt).toLocaleDateString()}
              {job._count.applications > 0 && (
                <span className="ml-2">
                  • {job._count.applications} applicant{job._count.applications !== 1 ? "s" : ""}
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <Link href={`/jobs/${job.id}`} className="flex-1">
          <Button className="w-full" size="sm">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}