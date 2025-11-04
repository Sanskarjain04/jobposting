"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { applyForJob, withdrawApplication } from "@/app/actions/applications";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

interface ApplyButtonProps {
  jobId: string;
  isOwner: boolean;
  application: {
    id: string;
    status: string;
    appliedAt: Date;
  } | null;
  isAuthenticated: boolean;
}

export function ApplyButton({ jobId, isOwner, application, isAuthenticated }: ApplyButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleApply = async () => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
      return;
    }

    startTransition(async () => {
      const result = await applyForJob(jobId);
      
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.error);
      }
      
      setShowConfirm(false);
    });
  };

  const handleWithdraw = async () => {
    startTransition(async () => {
      const result = await withdrawApplication(jobId);
      
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.error);
      }
      
      setShowConfirm(false);
    });
  };

  // Owner cannot apply to their own job
  if (isOwner) {
    return (
      <Badge variant="info" className="text-base px-4 py-2">
        Your Job Posting
      </Badge>
    );
  }

  // Already applied
  if (application) {
    const statusColors: Record<string, "default" | "success" | "warning" | "danger"> = {
      PENDING: "warning",
      REVIEWING: "info",
      ACCEPTED: "success",
      REJECTED: "danger",
    };

    return (
      <div className="space-y-3">
        <Badge variant={statusColors[application.status] || "default"} className="text-base px-4 py-2">
          Application {application.status}
        </Badge>
        
        {application.status === "PENDING" && (
          <>
            {!showConfirm ? (
              <Button
                variant="outline"
                onClick={() => setShowConfirm(true)}
                className="w-full"
              >
                Withdraw Application
              </Button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Are you sure you want to withdraw your application?
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={handleWithdraw}
                    disabled={isPending}
                    className="flex-1"
                  >
                    {isPending ? "Withdrawing..." : "Yes, Withdraw"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Not applied yet
  if (!showConfirm) {
    return (
      <Button
        onClick={() => setShowConfirm(true)}
        size="lg"
        className="w-full"
      >
        Apply for this Job
      </Button>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Ready to apply for this position?
      </p>
      <div className="flex gap-3">
        <Button
          onClick={handleApply}
          disabled={isPending}
          size="lg"
          className="flex-1"
        >
          {isPending ? "Submitting..." : "Confirm Application"}
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowConfirm(false)}
          size="lg"
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}