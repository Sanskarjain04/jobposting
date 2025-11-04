import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Find Your Dream Job
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Connect with top employers and discover opportunities that match your
            skills and ambitions.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/jobs">
              <Button size="lg">Browse Jobs</Button>
            </Link>
            {session ? (
              <Link href="/jobs/new">
                <Button variant="outline" size="lg">
                  Post a Job
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signin">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
              <svg
                className="h-6 w-6 text-blue-600 dark:text-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Easy Job Search
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Filter jobs by type, location, and keywords to find the perfect
              match.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
              <svg
                className="h-6 w-6 text-green-600 dark:text-green-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Quick Apply
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Apply to jobs with one click and track your application status.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
              <svg
                className="h-6 w-6 text-purple-600 dark:text-purple-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Manage Applications
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Employers can review and manage applications efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 dark:bg-blue-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">1000+</p>
              <p className="mt-2 text-blue-100">Active Jobs</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">500+</p>
              <p className="mt-2 text-blue-100">Companies</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">5000+</p>
              <p className="mt-2 text-blue-100">Job Seekers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            {session
              ? "Post your first job or browse available opportunities."
              : "Sign in to post jobs or apply to positions."}
          </p>
          <div className="mt-8">
            {session ? (
              <Link href="/jobs/new">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Post Your First Job
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signin">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-gray-300 text-blue-600 hover:bg-gray-100"
                >
                  <span className=" text-blue-600 font-semibold">Get Started</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
