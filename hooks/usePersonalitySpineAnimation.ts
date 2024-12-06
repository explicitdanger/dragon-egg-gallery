// import { DragonMoves, SelectedStage } from "@/lib/utils";
// import { animate } from "@/types/SpineObject";
// import { useEffect } from "react";

// export function usePersonalitySpineAnimation(
//   canvasId: string,
//   currentAssetPath: string,
//   animState: string
// ) {
//   console.log("usePersonalitySpineAnimation", canvasId, currentAssetPath, animState);

//   useEffect(() => {
//     const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
//     if (!canvas || !currentAssetPath) {
//       //   console.log('Canvas or currentAsset missing:', { canvas, currentAsset });
//       return;
//     }

//     let currentAnimation = animate(canvas, currentAssetPath, animState);
//   }, [canvasId, currentAssetPath, animState]);
// }

// // else if (canvas.id.includes("front-aura")) {
// //     assetUrl = auraFrontBaseUrl;
// //   } else if (canvas.id.includes("back-aura")) {
// //     assetUrl = auraBackBaseUrl;
// //   }