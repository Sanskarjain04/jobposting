"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateJob } from "@/app/actions/jobs";
import { Button } from "../ui/Button";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

interface EditJobFormProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    salary: string | null;
  };
}

export function EditJobForm({ job }: EditJobFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    
    // Client-side validation
    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const location = formData.get("location") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;

    const newErrors: Record<string, string> = {};
    if (!title?.trim()) newErrors.title = "Title is required";
    if (!company?.trim()) newErrors.company = "Company is required";
    if (!location?.trim()) newErrors.location = "Location is required";
    if (!type) newErrors.type = "Job type is required";
    if (!description?.trim()) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    startTransition(async () => {
      const result = await updateJob(job.id, formData);
      
      if (result.success) {
        router.push(`/jobs/${result.jobId}`);
      } else {
        alert(result.error || "Failed to update job");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Job Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={job.title}
          placeholder="e.g. Senior Frontend Developer"
          className={`w-full rounded-lg border ${
            errors.title ? "border-red-500" : "border-gray-300 dark:border-gray-600"
          } px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      {/* Company Name */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          defaultValue={job.company}
          placeholder="e.g. Tech Corp"
          className={`w-full rounded-lg border ${
            errors.company ? "border-red-500" : "border-gray-300 dark:border-gray-600"
          } px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
        />
        {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
      </div>

      {/* Location and Job Type Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={job.location}
            placeholder="e.g. San Francisco, CA or Remote"
            className={`w-full rounded-lg border ${
              errors.location ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            } px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
          />
          {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
        </div>

        {/* Job Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Job Type <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            name="type"
            defaultValue={job.type}
            className={`w-full rounded-lg border ${
              errors.type ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            } px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
          >
            <option value="">Select job type</option>
            {JOB_TYPES.map((jobType) => (
              <option key={jobType} value={jobType}>
                {jobType}
              </option>
            ))}
          </select>
          {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
        </div>
      </div>

      {/* Salary (Optional) */}
      <div>
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Salary Range <span className="text-sm text-gray-500">(Optional)</span>
        </label>
        <input
          type="text"
          id="salary"
          name="salary"
          defaultValue={job.salary || ""}
          placeholder="e.g. $80,000 - $120,000"
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Include salary range to attract more candidates
        </p>
      </div>

      {/* Job Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Job Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={10}
          defaultValue={job.description}
          placeholder="Describe the role, responsibilities, requirements, and benefits..."
          className={`w-full rounded-lg border ${
            errors.description ? "border-red-500" : "border-gray-300 dark:border-gray-600"
          } px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Provide detailed information about the position
        </p>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="submit"
          disabled={isPending}
          size="lg"
          className="flex-1"
        >
          {isPending ? "Updating Job..." : "Update Job"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.push(`/jobs/${job.id}`)}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}