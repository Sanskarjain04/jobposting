"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      router.push("/");
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    // Check initial status
    setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [router]);

  const handleRefresh = () => {
    if (navigator.onLine) {
      router.push("/");
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mb-6 sm:mb-8">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 sm:h-20 sm:w-20 md:h-24 md:w-24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
          {isOnline ? "You're Back Online!" : "You're Offline"}
        </h1>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-base md:text-lg">
          {isOnline
            ? "Your connection has been restored."
            : "It looks like you've lost your internet connection. Some features may be limited."}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3 sm:mt-8">
          {isOnline ? (
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-6 sm:py-3 sm:text-base"
            >
              Return to Homepage
            </Link>
          ) : (
            <>
              <Link
                href="/jobs"
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-6 sm:py-3 sm:text-base"
              >
                Browse Cached Jobs
              </Link>

              <button
                onClick={handleRefresh}
                className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:px-6 sm:py-3 sm:text-base"
              >
                Try Again
              </button>
            </>
          )}
        </div>

        {/* Tip */}
        <div className="mt-6 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20 sm:mt-8 sm:p-4">
          <p className="text-xs text-blue-800 dark:text-blue-200 sm:text-sm">
            💡 <strong>Tip:</strong> When you're back online, the app will
            automatically sync your data.
          </p>
        </div>
      </div>
    </div>
  );
}