import BackgroundSpineObject from "@/spine/BackgroundSpineObject";
import { backgroundBaseUrl } from "@/utils/dragonUtils";
import * as spine from "@esotericsoftware/spine-webgl";
import { useEffect, useRef } from "react";

export default function useBackgroundSpineAnimation(
  canvasId: string,
  assetUrl: string
) {
  const backgroundRef = useRef<spine.SpineCanvas | null>(null);

  useEffect(() => {
    if (!assetUrl) {
      console.warn("Background Spine Object: Asset URL is required");
      return;
    }

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) {
      console.warn(`Canvas with id ${canvasId} not found`);
      return;
    }

    const fullAssetUrl = `${backgroundBaseUrl}${assetUrl}/${assetUrl.split("/").pop()}`;
    const backgroundSpineObject = new BackgroundSpineObject(fullAssetUrl);
    backgroundRef.current = new spine.SpineCanvas(canvas, {
      app: backgroundSpineObject,
    });

    return () => {
      backgroundRef.current?.dispose();
      backgroundRef.current = null;
    };
  }, [canvasId, assetUrl]);

  return backgroundRef.current;
}
