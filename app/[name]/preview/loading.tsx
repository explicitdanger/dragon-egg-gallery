export default function PreviewLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark">
      <div className="space-y-6 text-center">
        <div className="relative w-24 h-24 mx-auto">
          {/* Outer ring animation */}
          <div className="absolute inset-0 border-4 border-vanilla/20 rounded-full animate-pulse" />
          {/* Inner spinning circle */}
          <div className="absolute inset-0 border-t-4 border-vanilla rounded-full animate-spin" />
        </div>
        <div className="text-vanilla/80 font-sans animate-pulse">
          Loading dragon preview...
        </div>
      </div>
    </div>
  );
} 