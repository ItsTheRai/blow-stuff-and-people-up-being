/**
 * Created by rai on 14/05/16.
 */
function SpriteSheet(path, frameWidth, frameHeight) {
    this.image = new Image();
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    var self = this;
    this.image.onload = function () {
        self.framesPerRow = Math.floor(self.image.width / self.frameWidth);
    }
    this.image.src = path;
}