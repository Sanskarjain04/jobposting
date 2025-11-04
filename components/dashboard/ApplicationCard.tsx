import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface ApplicationCardProps {
  application: {
    id: string;
    status: string;
    appliedAt: Date;
    job: {
      id: string;
      title: string;
      company: string;
      location: string;
      type: string;
      postedBy: {
        name: string | null;
        image: string | null;
      };
    };
  };
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const statusColors: Record<string, "default" | "success" | "warning" | "danger" | "info"> = {
    PENDING: "warning",
    REVIEWING: "info",
    ACCEPTED: "success",
    REJECTED: "danger",
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {application.job.postedBy.image && (
              <Image
                src={application.job.postedBy.image}
                alt={application.job.postedBy.name || "User"}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {application.job.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {application.job.company} • {application.job.location}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <Badge variant={statusColors[application.status] || "default"}>
              {application.status}
            </Badge>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Applied {new Date(application.appliedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link href={`/jobs/${application.job.id}`}>
          <Button variant="outline" size="sm" className="w-full">
            View Job Details
          </Button>
        </Link>
      </div>
    </div>
  );
}