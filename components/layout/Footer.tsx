import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="text-xl font-bold text-blue-600 sm:text-2xl">
              JobBoard
            </Link>
            <p className="mt-3 max-w-xs text-sm text-gray-600 dark:text-gray-400 sm:mt-4">
              Find your dream job or post opportunities to connect with talented professionals.
            </p>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              For Job Seekers
            </h3>
            <ul className="mt-3 space-y-2 sm:mt-4">
              <li>
                <Link href="/jobs" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/dashboard/applications" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  My Applications
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              For Employers
            </h3>
            <ul className="mt-3 space-y-2 sm:mt-4">
              <li>
                <Link href="/jobs/new" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/dashboard/jobs" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Manage Jobs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-800 sm:mt-12 sm:pt-8">
          <p className="text-center text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            © {new Date().getFullYear()} JobBoard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}