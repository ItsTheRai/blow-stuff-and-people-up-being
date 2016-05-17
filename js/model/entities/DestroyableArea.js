/**
 * Created by rai on 14/05/16.
 */
function DestroyableArea(cnt, id, x, y, size) {
    this.sprite = null;
    this.id = id;
    this.x = x;
    this.y = y;
    this.size = {
        w: size.w,
        h: size.h,
    }
    //this.width = width;
    //this.height = height;
    this.context = cnt;
    this.triggered = false;
    this.exploding = false;
    this.exploded = false;
    this.stage = 0;
    this.explosionInterval = 100;

    //draw the object
    var ss = new SpriteSheet('/pureBomberman/media/finalSprites/box48.png', 48, 48);
    this.sprite = new Animation(this.context, ss, 60, 0, 0);

    this.explode = function () {
        var self = this;
        this.exploding = true;
        var timer = setInterval(function () {
            if (self.stage >= 3) {
                self.exploded = true;
                clearInterval(timer);

            }
            else {
                self.stage++;
                //TODO blow up animation here
            }
        }, self.explosionInterval)
    };
}