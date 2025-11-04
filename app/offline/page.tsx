"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

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
    <div className="flex mx-auto h-screen max-w-[500px] w-full flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
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

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {isOnline ? "You're Back Online!" : "You're Offline"}
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {isOnline
            ? "Your connection has been restored."
            : "It looks like you've lost your internet connection. Some features may be limited, but you can still browse cached content."}
        </p>

        <div className="space-y-4">
          {isOnline ? (
            <Link href="/" className="block">
              <Button className="w-full">Return to Homepage</Button>
            </Link>
          ) : (
            <>
              <Link href="/jobs" className="block">
                <Button className="w-full">Browse Cached Jobs</Button>
              </Link>

              <button
                onClick={handleRefresh}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
              >
                Try Again
              </button>
            </>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Tip:</strong> When you're back online, the app will
            automatically sync your data.
          </p>
        </div>
      </div>
    </div>
  );
}