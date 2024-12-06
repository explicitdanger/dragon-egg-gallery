export default async function DragonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </div>
  );
}
