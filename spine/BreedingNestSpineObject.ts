import { BaseSpineObject } from "./BaseSpineObject";
import * as spine from "@esotericsoftware/spine-webgl";

export default class BreedingNestSpineObject extends BaseSpineObject {
  constructor(spineUrl: string, initialAnimation: string) {
    super(spineUrl, initialAnimation);
  }

  protected getAnimationState(
    animationStateData: spine.AnimationStateData
  ): spine.AnimationState {
    const state = super.getAnimationState(animationStateData);
    const track = state.setAnimation(0, "breeding_win", true);
    // Set time to 0 to pause on first frame
    track.trackTime = 0;
    // Prevent the track from advancing
    state.timeScale = 0;
    return state;
  }
}
