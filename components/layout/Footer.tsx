import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              JobBoard
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Find your dream job or post opportunities to connect with talented professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              For Job Seekers
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/jobs" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/dashboard/applications" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">
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
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/jobs/new" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/dashboard/jobs" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">
                  Manage Jobs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} JobBoard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}