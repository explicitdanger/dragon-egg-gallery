// this class is not being used for dragon spine objects
// see SpineObject.ts for the main class

import { BaseSpineObject } from "./BaseSpineObject";
import * as spine from "@esotericsoftware/spine-webgl";

type DragonSpineObjectProps = {
  assetUrl: string;
  initialAnimation: string;
};

class DragonSpineObject extends BaseSpineObject {
  constructor({ assetUrl, initialAnimation }: DragonSpineObjectProps) {
    super(assetUrl, initialAnimation);
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
}

export default DragonSpineObject;
