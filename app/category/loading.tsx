export default function CategoryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Category header skeleton */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gray-200 animate-pulse" />
        <div className="space-y-2">
          <div className="h-8 w-32 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-4 w-56 rounded bg-gray-100 animate-pulse" />
        </div>
      </div>

      {/* Sort bar skeleton */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-6 py-4 flex justify-end">
        <div className="h-10 w-40 rounded-lg bg-gray-100 animate-pulse" />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-200 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-16 rounded bg-gray-100 animate-pulse" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <div className="h-3 w-16 rounded bg-gray-100 animate-pulse" />
                <div className="h-6 w-24 rounded bg-gray-200 animate-pulse" />
              </div>
              <div className="h-5 w-14 rounded-full bg-gray-100 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
