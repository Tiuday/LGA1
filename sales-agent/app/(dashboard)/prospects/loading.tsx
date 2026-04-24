export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="h-8 w-48 bg-surface-border animate-pulse mb-8" />
      <div className="border border-surface-border divide-y divide-surface-border">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="px-5 py-4 flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-surface-border animate-pulse" />
              <div className="h-3 w-20 bg-surface-border animate-pulse" />
            </div>
            <div className="h-6 w-16 bg-surface-border animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
