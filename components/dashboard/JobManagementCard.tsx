"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteJob } from "@/app/actions/dashboard";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface JobManagementCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    postedAt: Date;
    _count: {
      applications: number;
    };
  };
}

export function JobManagementCard({ job }: JobManagementCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteJob(job.id);
      
      if (result.success) {
        alert(result.message);
        router.refresh();
      } else {
        alert(result.error);
      }
      
      setShowConfirm(false);
    });
  };

  const typeVariants: Record<string, "default" | "success" | "info" | "warning"> = {
    "Full-time": "success",
    "Part-time": "info",
    "Contract": "warning",
    "Internship": "default",
    "Remote": "success",
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {job.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {job.company} • {job.location}
          </p>
          
          <div className="mt-3 flex items-center gap-3">
            <Badge variant={typeVariants[job.type] || "default"}>
              {job.type}
            </Badge>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {job._count.applications} applicant{job._count.applications !== 1 ? "s" : ""}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Posted {new Date(job.postedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <Link href={`/jobs/${job.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </Link>
        <Link href={`/dashboard/jobs/${job.id}/edit`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            Edit
          </Button>
        </Link>
        
        {!showConfirm ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConfirm(true)}
            className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
          >
            Delete
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "..." : "✓"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfirm(false)}
            >
              ✕
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}