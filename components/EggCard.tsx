import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Dragon } from '@/types/dragon';
import Link from 'next/link';
import DragonCanvas from "./DragonCanvas";

function toTitleCase(str: string | undefined): string {
  if (!str) return '';
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

interface EggCardProps {
  egg: Dragon;
  selectedStage: number;
}

function formatRouteParam(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '_');
}

export default function EggCard({ egg, selectedStage }: EggCardProps) {
  return (
    <Link 
      href={`/${formatRouteParam(egg.name)}`} 
      className="block"
    >
      <Card
        className="overflow-hidden border-bistre/10 bg-gradient-to-b from-vanilla to-vanilla/95 relative group
                    w-full h-[420px] flex flex-col cursor-pointer"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.4),transparent_80%)]" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-chamoisee/10 rounded-full blur-3xl group-hover:bg-chamoisee/20 transition-all duration-700" />

        <div className="absolute top-4 left-0 z-10">
          <div className="bg-bistre/90 text-vanilla px-4 py-1.5 rounded-r-full shadow-lg
                         transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
            <span className="text-xs font-semibold truncate max-w-[200px] block">
              {toTitleCase(egg.name)}
            </span>
          </div>
        </div>

        <CardHeader className="bg-gradient-to-b from-chamoisee/20 to-chamoisee/5 flex-1 p-0">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <DragonCanvas egg={egg} selectedStage={selectedStage} />
          </div>
        </CardHeader>

        <CardContent className="p-4 bg-gradient-to-b from-chamoisee/5 to-chamoisee/20 backdrop-blur-sm space-y-4">
          <div className="relative px-6">
            <span className="absolute left-0 top-0 text-2xl text-bistre/40 font-serif" aria-hidden="true">
              &ldquo;
            </span>
            <p className="text-sm text-bistre/70 text-center italic line-clamp-2 min-h-[40px]">
              {egg.egg_description}
            </p>
            <span className="absolute right-0 bottom-0 text-2xl text-bistre/40 font-serif" aria-hidden="true">
              &rdquo;
            </span>
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            <Badge
              variant="outline"
              className={cn(
                "text-xs sm:text-sm rounded-full",
                getRarityStyle(egg.rarity)
              )}
            >
              {egg.rarity}
            </Badge>
            <Badge
              variant="secondary"
              className={cn(
                "text-xs sm:text-sm line-clamp-1 transition-all duration-300 rounded-full",
                egg.region === "Special"
                  ? "bg-gradient-to-r from-[#ff0000] via-[#ff8800] via-[#ffd000] via-[#00ff00] via-[#00ffff] via-[#0000ff] to-[#ff00ff] text-white border-none shadow-sm hover:shadow-md hover:scale-105 hover:brightness-110"
                  : "bg-bistre/20 text-bistre hover:bg-bistre/30"
              )}
            >
              {egg.region}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function getRarityStyle(rarity: string): string {
  const styles = {
    common: "border-green-500/50 text-green-700 bg-green-50 hover:bg-green-100",
    uncommon: "border-blue-500/50 text-blue-700 bg-blue-50 hover:bg-blue-100",
    rare: "border-red-500/50 text-red-700 bg-red-50 hover:bg-red-100",
    epic: "border-purple-500/50 text-purple-700 bg-purple-50 hover:bg-purple-100",
    legendary: "border-yellow-500/50 text-yellow-700 bg-yellow-50 hover:bg-yellow-100",
  };

  return styles[rarity.toLowerCase() as keyof typeof styles] || "";
}