import { SelectedStage } from "@/lib/utils";
import * as spine from "@esotericsoftware/spine-webgl";

export class BaseSpineObject {
  skeleton: spine.Skeleton | null;
  animationState: spine.AnimationState | null;
  binaryUrl: string;
  atlasUrl: string;
  initialAnimation: string;
  skeletonBinary: spine.SkeletonBinary | null;
  skeletonScale: number | null;

  constructor(spineUrl: string, initialAnimation: string) {
    this.skeleton = null;
    this.animationState = null;
    this.binaryUrl = `${spineUrl}.skel`;
    this.atlasUrl = `${spineUrl}.atlas`;
    this.initialAnimation = initialAnimation;
    this.skeletonBinary = null;
    this.skeletonScale = null;
  }

  async loadAssets(canvas: spine.SpineCanvas): Promise<void> {
    canvas.assetManager.loadBinary(this.binaryUrl);
    canvas.assetManager.loadTextureAtlas(this.atlasUrl);
  }

  initialize(canvas: spine.SpineCanvas): void {
    const assetManager = canvas.assetManager;

    // Create the texture atlas
    const atlas = assetManager.require(this.atlasUrl);

    // Create a AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
    const atlasLoader = new spine.AtlasAttachmentLoader(atlas);

    // Create a SkeletonBinary instance for parsing the .skel file
    const skeletonBinary = new spine.SkeletonBinary(atlasLoader);
    this.skeletonBinary = skeletonBinary;

    // Set the scale to apply during parsing, parse the file, and create a new skeleton
    // this.applyProperScale(canvas);
      skeletonBinary.scale = 0.6
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
    // fixes the camera position for canvas rendering
    // on the dragon page and preview page
    // renderer.camera.position.set(0, 50, 0);
    canvas.clear(0, 0, 0, 0);
    renderer.begin();
    renderer.drawSkeleton(this.skeleton, false);
    renderer.end();
  }
}
