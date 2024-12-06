import { useEffect, useRef } from "react";
import { animate } from "@/spine/SpineObject";
import { DragonMoves, SelectedStage } from "@/lib/utils";
import * as spine from "@esotericsoftware/spine-webgl";

export function useSpineAnimation(
  canvasId: string,
  currentAssetPath: string,
  animState: string,
  view: string
) {
  const currentAnimationRef = useRef<spine.SpineCanvas | null>(null);

  useEffect(() => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas || !currentAssetPath) return;

    // Cleanup previous animation before creating new one
    if (currentAnimationRef.current) {
      currentAnimationRef.current.dispose();
      currentAnimationRef.current = null;
    }

    // Create new animation
    currentAnimationRef.current = animate(
      canvas,
      currentAssetPath,
      DragonMoves.IDLE,
      view
    );

    // Skip event listeners for non-interactive elements
    if (canvasId.includes("front-aura") || canvasId.includes("back-aura")) {
      return;
    }

    const handleAnimation = (newAnimState: DragonMoves) => {
      if (currentAnimationRef.current) {
        currentAnimationRef.current.dispose();
      }
      currentAnimationRef.current = animate(
        canvas,
        currentAssetPath,
        newAnimState,
        view
      );
    };

    // Event Handlers
    const handleClick = () => {
      handleAnimation(DragonMoves.MOVE);
      setTimeout(() => handleAnimation(DragonMoves.IDLE), 4500);
    };

    const handleStart = () => handleAnimation(DragonMoves.HOLD);
    const handleEnd = () => handleAnimation(DragonMoves.IDLE);
    const handleEnter = () => handleAnimation(DragonMoves.TOUCH);
    const handleLeave = () => handleAnimation(DragonMoves.IDLE);

    // Add event listeners
    const events = {
      click: handleClick,
      mousedown: handleStart,
      mouseup: handleEnd,
      mouseenter: handleEnter,
      mouseleave: handleLeave,
      touchstart: handleStart,
      touchend: handleEnd,
      touchcancel: handleEnd,
    };

    Object.entries(events).forEach(([event, handler]) => {
      canvas.addEventListener(event, handler);
    });

    // Cleanup function
    return () => {
      Object.entries(events).forEach(([event, handler]) => {
        canvas.removeEventListener(event, handler);
      });

      if (currentAnimationRef.current) {
        currentAnimationRef.current.dispose();
        currentAnimationRef.current = null;
      }
    };
  }, [currentAssetPath, view, canvasId]);
}
