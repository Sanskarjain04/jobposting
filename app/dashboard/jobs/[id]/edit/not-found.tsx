import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function EditJobNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Job Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The job you're trying to edit doesn't exist or you don't have permission to edit it.
        </p>
        <Link href="/dashboard/jobs">
          <Button size="lg">Back to My Jobs</Button>
        </Link>
      </div>
    </div>
  );
}