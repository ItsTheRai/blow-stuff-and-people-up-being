/**
 * Created by rai on 14/05/16.
 */
function Animation(context, spritesheet, frameSpeed, startFrame, endFrame) {
    this.context = context;
    this.animationSequence = [];  // array holding the order of the animation
    this.currentFrame = 0;        // the current frame to draw
    this.counter = 0;             // keep track of frame rate
    this.spritesheet = spritesheet
    this.frameSpeed = frameSpeed
    // create the sequence of frame numbers for the animation
    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
        this.animationSequence.push(frameNumber);
}