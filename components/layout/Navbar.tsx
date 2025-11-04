import Link from "next/link";
import { auth } from "@/lib/auth";
import { UserAvatar } from "../auth/UserAvatar";
import { SignInButton, SignOutButton } from "../auth/SignInButton";
import { Button } from "../ui/Button";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              JobBoard
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/jobs"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              Browse Jobs
            </Link>
            
            {session && (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                >
                  Dashboard
                </Link>
                <Link href="/jobs/new">
                  <Button size="sm">Post a Job</Button>
                </Link>
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <UserAvatar />
                <SignOutButton />
              </div>
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {session && (
        <div className="border-t border-gray-200 dark:border-gray-800 md:hidden">
          <div className="flex items-center justify-around px-4 py-3">
            <Link
              href="/jobs"
              className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300"
            >
              Browse Jobs
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300"
            >
              Dashboard
            </Link>
            <Link
              href="/jobs/new"
              className="text-sm text-blue-600 font-medium"
            >
              Post Job
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}