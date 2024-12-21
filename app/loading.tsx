export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="space-y-4 text-center">
        <div className="animate-bounce text-4xl">🥚</div>
        <p className="text-vanilla/80 animate-pulse">Hatching dragons...</p>
      </div>
    </div>
  );
}
