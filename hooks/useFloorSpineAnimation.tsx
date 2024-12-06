import BackgroundSpineObject from "@/spine/BackgroundSpineObject";
import FloorSpineObject from "@/spine/FloorSpineObject";
import { backgroundBaseUrl } from "@/utils/dragonUtils";
import * as spine from "@esotericsoftware/spine-webgl";
import { useEffect, useRef } from "react";

export default function useFloorSpineAnimation(
  canvasId: string,
  assetUrl: string
) {
  const floorRef = useRef<spine.SpineCanvas | null>(null);

  useEffect(() => {
    if (!assetUrl) {
      console.warn("Floor Spine Object: Asset URL is required");
      return;
    }

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) {
      console.warn(`Canvas with id ${canvasId} not found`);
      return;
    }

    const fullAssetUrl = `${backgroundBaseUrl}${assetUrl}/${assetUrl.split("/").pop()}`;
    const floorSpineObject = new FloorSpineObject(fullAssetUrl);
    floorRef.current = new spine.SpineCanvas(canvas, {
      app: floorSpineObject,
    });

    return () => {
      floorRef.current?.dispose();
      floorRef.current = null;
    };
  }, [canvasId, assetUrl]);

  return floorRef.current;
}
