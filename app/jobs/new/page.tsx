import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { JobForm } from "@/components/jobs/JobForm";

export const metadata = {
  title: "Post a Job | JobBoard",
  description: "Post a new job opportunity on JobBoard",
};

export default async function NewJobPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Post a New Job
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Fill in the details below to create a new job posting
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 md:p-8">
          <JobForm />
        </div>

        {/* Tips Section */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
          <h3 className="mb-3 text-lg font-semibold text-blue-900 dark:text-blue-100">
            💡 Tips for a Great Job Post
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Use a clear, descriptive job title that includes the seniority level</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Include specific requirements and qualifications needed for the role</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Mention key responsibilities and what a typical day looks like</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Be transparent about salary range to attract qualified candidates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Highlight company culture, benefits, and growth opportunities</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}