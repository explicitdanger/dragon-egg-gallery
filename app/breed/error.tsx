'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="py-12 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-medium text-vanilla mb-4">
            Oops! Something went wrong
          </h2>
          <button
            onClick={reset}
            className="px-4 py-2 bg-vanilla/20 text-vanilla rounded-lg hover:bg-vanilla/30 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
} 