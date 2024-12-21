import BreedingNestSpineObject from "@/spine/BreedingNestSpineObject";
import { useEffect, useRef } from "react";
import * as spine from "@esotericsoftware/spine-webgl";

function animateBreedingNest(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const spineUrl = "https://raw.githubusercontent.com/vega-spica/Personality-Sneak-Peek-Expanded/main/res/spine/breeding/dvc_breeding";
    const breedingNestSpineObject = new BreedingNestSpineObject(spineUrl, "");
    return new spine.SpineCanvas(canvas, {
        app: breedingNestSpineObject,
    });
}

export default function useBreedingNestAnimation(canvasId: string) {
    if (!canvasId.includes("nest-canvas")) return;
    const breedingNestRef = useRef<spine.SpineCanvas | null>(null);

    useEffect(() => {
        breedingNestRef.current = animateBreedingNest(canvasId);
        return () => {
            if (breedingNestRef.current) {
                breedingNestRef.current.dispose();
                breedingNestRef.current = null;
            }
        };
    }, []);
}
