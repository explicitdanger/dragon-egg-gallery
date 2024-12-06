import { BaseSpineObject } from "./BaseSpineObject";
import * as spine from "@esotericsoftware/spine-webgl";

class FloorSpineObject extends BaseSpineObject {
  constructor(assetUrl: string) {
    super(assetUrl, "idle");
  }

  initialize(canvas: spine.SpineCanvas): void {
    canvas.renderer.camera.position.set(0, 40, 0);
    super.initialize(canvas);
  }

  update(canvas: spine.SpineCanvas, delta: number): void {
    super.update(canvas, delta);
  }

  render(canvas: spine.SpineCanvas): void {
    super.render(canvas);
  }

  async loadAssets(canvas: spine.SpineCanvas): Promise<void> {
    await super.loadAssets(canvas);
  }
}

export default FloorSpineObject;
