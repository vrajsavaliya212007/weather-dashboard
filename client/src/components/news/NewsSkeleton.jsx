function NewsSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({
        length: 6,
      }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-3xl bg-white shadow-lg"
        >
          <div className="h-56 bg-slate-200" />
          <div className="space-y-4 p-6">
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-6 rounded bg-slate-200" />
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsSkeleton;
