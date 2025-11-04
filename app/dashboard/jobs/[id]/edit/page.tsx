import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getJobById } from "@/app/actions/jobs";
import { EditJobForm } from "@/components/jobs/EditJobForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return { title: "Job Not Found" };
  }

  return {
    title: `Edit ${job.title} | JobBoard`,
    description: `Edit job posting for ${job.title}`,
  };
}

export default async function EditJobPage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  // Check if user is the owner
  if (job.postedById !== session.user.id) {
    redirect("/dashboard/jobs");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Edit Job Posting
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Update the details of your job posting
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 md:p-8">
          <EditJobForm job={job} />
        </div>

        {/* Warning Notice */}
        <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-900 dark:bg-yellow-950">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">
                Important Notice
              </h3>
              <p className="mt-1 text-sm text-yellow-800 dark:text-yellow-200">
                Existing applicants will be notified of major changes to this job posting. Please ensure all information is accurate before updating.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}