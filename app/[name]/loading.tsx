export default function DragonLoading() {
  return (
    <main className="py-12 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header skeleton */}
          <div className="mb-8 flex items-center gap-4">
            <div className="w-24 h-6 bg-vanilla/10 rounded animate-pulse" />
            <div className="w-48 h-8 bg-vanilla/10 rounded animate-pulse" />
          </div>
          
          {/* Decorative top border */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-1 bg-vanilla/20 rounded-full" />
          </div>
          
          {/* Main content card */}
          <div className="relative p-[2px] rounded-lg bg-gradient-to-r from-vanilla/30 via-vanilla/20 to-vanilla/30">
            <div className="relative bg-[#F3E5AB]/95 rounded-lg p-8">
              {/* Inner border */}
              <div className="absolute inset-4 border-2 border-bistre/10 rounded-lg pointer-events-none" />
              
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-bistre/20 rounded-tl" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-bistre/20 rounded-tr" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-bistre/20 rounded-bl" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-bistre/20 rounded-br" />
              
              {/* Content grid */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Sprites skeleton */}
                <div className="space-y-6">
                  {/* Egg sprites container */}
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-8 items-center">
                      <div className="aspect-square bg-white/50 rounded-lg animate-pulse" />
                      <div className="aspect-square bg-white/50 rounded-lg animate-pulse" />
                    </div>
                  </div>
                  
                  {/* Growth stages skeleton */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="aspect-square bg-white/50 rounded-lg animate-pulse" />
                    <div className="aspect-square bg-white/50 rounded-lg animate-pulse" />
                    <div className="aspect-square bg-white/50 rounded-lg animate-pulse" />
                  </div>
                </div>

                {/* Details skeleton */}
                <div className="space-y-8">
                  {/* Description skeleton */}
                  <div>
                    <div className="w-32 h-8 bg-bistre/10 rounded mb-4 animate-pulse" />
                    <div className="h-24 bg-white/50 rounded-lg animate-pulse" />
                  </div>

                  {/* Stats skeleton */}
                  <div>
                    <div className="w-24 h-8 bg-bistre/10 rounded mb-4 animate-pulse" />
                    <div className="grid grid-cols-2 gap-6">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-20 bg-white/30 rounded-lg animate-pulse" />
                      ))}
                    </div>
                  </div>

                  {/* Additional Info skeleton */}
                  <div>
                    <div className="w-48 h-8 bg-bistre/10 rounded mb-4 animate-pulse" />
                    <div className="grid grid-cols-2 gap-6">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-20 bg-white/30 rounded-lg animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative bottom border */}
          <div className="flex justify-center mt-6 space-x-2">
            <div className="w-3 h-3 bg-vanilla/20 rounded-full" />
            <div className="w-3 h-3 bg-vanilla/15 rounded-full" />
            <div className="w-3 h-3 bg-vanilla/10 rounded-full" />
          </div>

          {/* Footer skeleton */}
          <div className="text-center mt-8">
            <div className="inline-block w-64 h-10 bg-vanilla/10 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
} 