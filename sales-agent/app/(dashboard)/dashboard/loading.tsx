export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="h-8 w-48 bg-surface-border animate-pulse mb-2" />
      <div className="h-4 w-72 bg-surface-border animate-pulse mb-8" />
      <div className="border border-surface-border bg-surface-2 p-6 h-64 animate-pulse" />
    </div>
  );
}
