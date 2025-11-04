export default function JobDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button Skeleton */}
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700 mb-6" />

        <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          {/* Header Skeleton */}
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="flex-1 space-y-3">
                <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="flex gap-4">
                  <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-6 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}