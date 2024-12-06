import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-destructive text-text">
      <h1 className="text-9xl font-bold text-chamoisee">404</h1>
      <div className="bg-bistre px-6 py-3 rounded-lg shadow-lg">
        <h2 className="text-2xl text-vanilla font-semibold">Page Not Found</h2>
      </div>
      <p className="text-walnut-brown mt-6 text-lg">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-chamoisee hover:bg-bistre-2 text-vanilla rounded-md transition-colors duration-300"
      >
        Return Home
      </Link>
    </div>
  );
}
