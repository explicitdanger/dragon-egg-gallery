import * as spine from "@esotericsoftware/spine-webgl";
import { SelectedStage } from "@/utils/types";
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
    this.loadBinaryUrl(canvas);
    this.loadAtlasUrl(canvas);
  }

  protected loadBinaryUrl(canvas: spine.SpineCanvas): void {
    canvas.assetManager.loadBinary(this.binaryUrl);
  }

  protected loadAtlasUrl(canvas: spine.SpineCanvas): void {
    canvas.assetManager.loadTextureAtlas(this.atlasUrl);
  }

  initialize(canvas: spine.SpineCanvas): void {
    // Create the texture atlas
    const atlas = this.getAtlasTexture(canvas);

    // Create a AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
    const atlasLoader = this.getAtlasLoader(atlas);

    // Create a SkeletonBinary instance for parsing the .skel file
    const skeletonBinary = this.getSkeletonBinary(atlasLoader);
    this.setSkeletonBinary(skeletonBinary);

    // Set the scale to apply during parsing, parse the file, and create a new skeleton
    // this.applyProperScale(canvas);
    // skeletonBinary.scale = 0.6
    const skeletonData = this.getSkeletonData(canvas);
    const skeleton = this.getSkeleton(skeletonData);
    this.setSkeleton(skeleton);

    // Create an AnimationState, and set the initial animation in looping mode
    const animationStateData = this.getAnimationStateData(skeletonData);
    const animationState = this.getAnimationState(animationStateData);
    this.setAnimationState(animationState);
    // console.log(this.atlasUrl, this.initialAnimation);
    // if (this.initialAnimation && this.initialAnimation !== "") {
    //   this.animationState.setAnimation(0, this.initialAnimation, true);
    // }
  }

  protected getAtlasTexture(canvas: spine.SpineCanvas): spine.TextureAtlas {
    return canvas.assetManager.require(this.atlasUrl);
  }

  protected getAtlasLoader(
    atlas: spine.TextureAtlas
  ): spine.AtlasAttachmentLoader {
    return new spine.AtlasAttachmentLoader(atlas);
  }

  protected getSkeletonBinary(
    atlasLoader: spine.AtlasAttachmentLoader
  ): spine.SkeletonBinary {
    return new spine.SkeletonBinary(atlasLoader);
  }

  protected getSkeletonData(canvas: spine.SpineCanvas): spine.SkeletonData {
    return this.skeletonBinary?.readSkeletonData(
      canvas.assetManager.require(this.binaryUrl)
    ) as spine.SkeletonData;
  }

  protected setSkeletonBinary(skeletonBinary: spine.SkeletonBinary): void {
    this.skeletonBinary = skeletonBinary;
  }

  protected setSkeleton(skeleton: spine.Skeleton): void {
    this.skeleton = skeleton;
  }

  protected getSkeleton(skeletonData: spine.SkeletonData): spine.Skeleton {
    return new spine.Skeleton(skeletonData);
  }

  protected setAnimationState(animationState: spine.AnimationState): void {
    this.animationState = animationState;
  }

  protected getAnimationStateData(
    skeletonData: spine.SkeletonData
  ): spine.AnimationStateData {
    return new spine.AnimationStateData(skeletonData);
  }

  protected getAnimationState(
    animationStateData: spine.AnimationStateData
  ): spine.AnimationState {
    return new spine.AnimationState(animationStateData);
  }

  update(canvas: spine.SpineCanvas, delta: number): void {
    if (!this.animationState || !this.skeleton) return;

    // Update the animation state using the delta time
    this.updateAnimationState(delta);
    // Apply the animation state to the skeleton
    this.applyAnimationState();
    // Let the skeleton update the transforms of its bones
    this.updateSkeleton();
  }

  protected updateAnimationState(delta: number): void {
    this.animationState?.update(delta);
  }

  protected applyAnimationState(): void {
    this.animationState?.apply(this.skeleton as spine.Skeleton);
  }

  protected updateSkeleton(): void {
    this.skeleton?.updateWorldTransform();
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
