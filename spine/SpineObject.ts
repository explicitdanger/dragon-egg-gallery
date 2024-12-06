import {
  auraBackBaseUrl,
  auraFrontBaseUrl,
  backgroundBaseUrl,
  dragonBaseUrl,
  floorBaseUrl,
} from "@/utils/dragonUtils";
import * as spine from "@esotericsoftware/spine-webgl";
import { personalityJson } from "../types/personality";

export class SpineObject {
  skeleton: spine.Skeleton | null;
  animationState: spine.AnimationState | null;
  binaryUrl: string;
  atlasUrl: string;
  initialAnimation: string;
  skeletonBinary: spine.SkeletonBinary | null;
  skeletonScale: number | null;
  renderer: spine.SceneRenderer | null;
  view: string;
  aspectRatio: number;

  constructor(
    spineUrl: string,
    initialAnimation: string,
    view: string = "card"
  ) {
    this.skeleton = null;
    this.animationState = null;
    this.binaryUrl = `${spineUrl}.skel`;
    this.atlasUrl = `${spineUrl}.atlas`;
    this.initialAnimation = initialAnimation;
    this.skeletonBinary = null;
    this.skeletonScale = null;
    this.renderer = null;
    this.view = view;
    this.aspectRatio = window.innerWidth / window.innerHeight;
  }

  async loadAssets(canvas: spine.SpineCanvas): Promise<void> {
    canvas.assetManager.loadBinary(this.binaryUrl);
    canvas.assetManager.loadTextureAtlas(this.atlasUrl);
    this.renderer = canvas.renderer;
    // this.setCameraPosition();
  }

  initialize(canvas: spine.SpineCanvas): void {
    const assetManager = canvas.assetManager;
    this.renderer = canvas.renderer;

    // Create the texture atlas
    const atlas = assetManager.require(this.atlasUrl);

    // Create a AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
    const atlasLoader = new spine.AtlasAttachmentLoader(atlas);

    // Create a SkeletonBinary instance for parsing the .skel file
    const skeletonBinary = new spine.SkeletonBinary(atlasLoader);
    this.skeletonBinary = skeletonBinary;

    // Set the scale to apply during parsing, parse the file, and create a new skeleton
    // this.applyProperScale();
    this.applyScale();
    // parse skeleton data and scale it before reading data
    const skeletonData = skeletonBinary.readSkeletonData(
      assetManager.require(this.binaryUrl)
    );
    this.skeleton = new spine.Skeleton(skeletonData);

    // Create an AnimationState, and set the initial animation in looping mode
    const animationStateData = new spine.AnimationStateData(skeletonData);
    // console.log(this.atlasUrl, this.initialAnimation);
    this.animationState = new spine.AnimationState(animationStateData);
    if (this.initialAnimation && this.initialAnimation !== "") {
      this.animationState.setAnimation(0, this.initialAnimation, true);
    }

    // this.setCameraPosition();
  }

  update(canvas: spine.SpineCanvas, delta: number): void {
    if (!this.animationState || !this.skeleton) return;

    // Update the animation state using the delta time
    this.animationState.update(delta);
    // Apply the animation state to the skeleton
    this.animationState.apply(this.skeleton);
    // Let the skeleton update the transforms of its bones
    this.skeleton.updateWorldTransform();
  }

  render(canvas: spine.SpineCanvas): void {
    if (!this.skeleton) return;

    const renderer = canvas.renderer;
    renderer.resize(spine.ResizeMode.Expand);
    this.setCameraPosition();
    canvas.clear(0, 0, 0, 0);
    renderer.begin();
    renderer.drawSkeleton(this.skeleton, false);
    renderer.end();
  }

  private setCameraPosition(): void {
    if (!this.renderer) {
      console.warn("Renderer not initialized");
      return;
    }

    if (this.view === "card" && this.aspectRatio <= 1) {
      this.renderer.camera.position.set(0, 120, 0);
    } else if (this.view === "card" && this.aspectRatio > 1) {
      this.renderer.camera.position.set(0, 50, 0);
    } else if (this.view === "profile" && this.aspectRatio <= 1) {
      this.renderer.camera.position.set(0, 165, 0);
    } else if (this.view === "profile" && this.aspectRatio > 1) {
      this.renderer.camera.position.set(0, 75, 0);
    } else if (this.view === "preview") {
      this.renderer.camera.position.set(0, 200, 0);
      this.skeletonScale = 0.6;
    }
  }

  private applyScale(): void {
    if (!this.skeletonBinary?.scale) return;

    // if (this.aspectRatio > 1) {
      // for desktops
    //   if (this.view === "preview") {
    //     this.skeletonBinary.scale = 0.5;
    //   } else if (this.view === "card") {
    //     this.skeletonBinary.scale = 0.4;
    //   } else if (this.view === "profile") {
    //     this.skeletonBinary.scale = 0.5;
    //   }
    // } else {
    //   // for mobiles
    //   if (this.view === "preview") {
    //     this.skeletonBinary.scale = 0.8;
    //   } else if (this.view === "card") {
    //     this.skeletonBinary.scale = 0.8;
    //   } else if (this.view === "profile") {
    //     this.skeletonBinary.scale = 0.5;
    //   }
    // }
    if (this.view === "preview") {
      this.skeletonBinary.scale = 0.5;
      // for desktops
    } else if (this.view === "card" && this.aspectRatio > 1) {
      this.skeletonBinary.scale = 0.4;
    } else if (this.view === "profile" && this.aspectRatio > 1) {
      this.skeletonBinary.scale = 0.5;
      // for mobiles
    } else if (this.view === "card" && this.aspectRatio <= 1) {
      this.skeletonBinary.scale = 0.8;
    } else if (this.view === "profile" && this.aspectRatio <= 1) {
      this.skeletonBinary.scale = 0.8;
    }
  }
}

export function animate(
  canvas: HTMLCanvasElement,
  url: string,
  animState: string,
  view: string
): spine.SpineCanvas {
  let assetUrl = `${dragonBaseUrl}${url}/${url}`;
  if (canvas.id.includes("front-aura")) {
    assetUrl = auraFrontBaseUrl;
  } else if (canvas.id.includes("back-aura")) {
    assetUrl = auraBackBaseUrl;
  }
  const spineObject = new SpineObject(assetUrl, animState, view);
  return new spine.SpineCanvas(canvas, {
    app: spineObject,
  });
}
const AURA_BASE_URLS = {
  front:
    "https://raw.githubusercontent.com/vega-spica/Personality-Sneak-Peek-Expanded/main/res/spine/aura/aura_front/aura_front",
  back: "https://raw.githubusercontent.com/vega-spica/Personality-Sneak-Peek-Expanded/main/res/spine/aura/aura_back/aura_back",
  each: "https://raw.githubusercontent.com/vega-spica/Personality-Sneak-Peek-Expanded/main/res/spine/aura_each",
} as const;

interface AuraConfig {
  url: string;
  animState: string;
}

function getAuraConfig(
  personality: (typeof personalityJson)[keyof typeof personalityJson],
  type: "front" | "back"
): AuraConfig {
  if (personality.each) {
    return {
      url: `${AURA_BASE_URLS.each}/${personality.each}/${personality.each}`,
      animState: personality[type],
    };
  }

  return {
    url: AURA_BASE_URLS[type],
    animState: personality[type],
  };
}

export function animateAura(
  canvas: HTMLCanvasElement,
  personalityName: string,
  type: "front" | "back",
  view: string
): spine.SpineCanvas | null {
  const personality = personalityJson[personalityName];
  if (!personality) return null;

  const { url, animState } = getAuraConfig(personality, type);
  const spineObject = new SpineObject(url, animState, view);
  return new spine.SpineCanvas(canvas, {
    app: spineObject,
  });
}
