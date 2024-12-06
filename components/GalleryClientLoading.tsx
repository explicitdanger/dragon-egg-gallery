import { Suspense } from "react";
import GalleryClientContent from "./GalleryClient";
import { Dragon } from "@/types/dragon";

interface GalleryClientProps {
  initialData: Dragon[];
  regions: string[];
}

export default function GalleryClientLoading({
    initialData,
    regions,
  }: GalleryClientProps) {
    return (
      <div className="space-y-8">
  
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="space-y-4 text-center">
                <div className="animate-bounce text-4xl">🥚</div>
                <p className="text-vanilla/80 animate-pulse">
                  Hatching dragons...
                </p>
              </div>
            </div>
          }
        >
          <GalleryClientContent initialData={initialData} regions={regions} />
        </Suspense>
      </div>
    );
  }