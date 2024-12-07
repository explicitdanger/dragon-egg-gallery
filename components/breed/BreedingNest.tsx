import useBreedingNestAnimation from "@/hooks/useBreedingNestAnimation";

export default function BreedingNest() {
  const canvasId = "nest-canvas";
  useBreedingNestAnimation(canvasId);
  return (
    <div className="flex justify-center items-center w-full h-full">
      <canvas id={canvasId} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
