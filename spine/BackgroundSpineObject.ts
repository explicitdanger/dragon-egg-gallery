import { BaseSpineObject } from "./BaseSpineObject";
import * as spine from "@esotericsoftware/spine-webgl";

class BackgroundSpineObject extends BaseSpineObject {
  constructor(assetUrl: string) {
    super(assetUrl, "idle");
  }

  protected getSkeletonBinary(
    atlasLoader: spine.AtlasAttachmentLoader
  ): spine.SkeletonBinary {
    const binary = super.getSkeletonBinary(atlasLoader);
    binary.scale = 0.6;
    return binary;
  }

  async loadAssets(canvas: spine.SpineCanvas): Promise<void> {
    await super.loadAssets(canvas);
  }

  initialize(canvas: spine.SpineCanvas): void {
    super.initialize(canvas);
  }

  update(canvas: spine.SpineCanvas, delta: number): void {
    super.update(canvas, delta);
  }

  render(canvas: spine.SpineCanvas): void {
    super.render(canvas);
  }
}

export default BackgroundSpineObject;
