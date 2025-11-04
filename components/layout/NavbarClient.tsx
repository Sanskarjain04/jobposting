"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Button } from "../ui/Button";

interface NavbarClientProps {
  session: {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  } | null;
}

export function NavbarClient({ session }: NavbarClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden items-center space-x-4 md:flex lg:space-x-6">
        <Link
          href="/jobs"
          className="text-sm text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 lg:text-base"
        >
          Browse Jobs
        </Link>
        
        {session && (
          <>
            <Link
              href="/dashboard"
              className="text-sm text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 lg:text-base"
            >
              Dashboard
            </Link>
            <Link href="/jobs/new">
              <Button size="sm">Post a Job</Button>
            </Link>
          </>
        )}
      </div>

      {/* Auth Section (Desktop) */}
      <div className="hidden items-center gap-3 md:flex lg:gap-4">
        {session ? (
          <>
            <div className="hidden items-center gap-2 lg:flex">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {session.user.name}
              </span>
            </div>
            <button
              onClick={() => signOut()}
              className="rounded-lg bg-gray-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-gray-700 lg:px-4 lg:py-2"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/auth/signin">
            <Button size="sm">Sign In</Button>
          </Link>
        )}
      </div>

      {/* Mobile menu button */}
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className="sr-only">Open main menu</span>
        {mobileMenuOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-16 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {session && (
              <div className="mb-3 flex items-center gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div className="text-sm">
                  <p className="font-medium text-gray-900 dark:text-white">{session.user.name}</p>
                  <p className="text-gray-500 dark:text-gray-400">{session.user.email}</p>
                </div>
              </div>
            )}

            <Link
              href="/jobs"
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Jobs
            </Link>

            {session && (
              <>
                <Link
                  href="/dashboard"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/jobs/new"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Post a Job
                </Link>
              </>
            )}

            <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-700">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="w-full rounded-lg bg-gray-600 px-4 py-2 text-left text-base font-medium text-white hover:bg-gray-700"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/auth/signin"
                  className="block rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-medium text-white hover:bg-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}