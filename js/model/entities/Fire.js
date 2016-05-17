/**
 * Created by rai on 14/05/16.
 */
function Fire(cnt, id, x, y, size) {
    this.sprite = null;
    this.timer = 0;
    this.context = cnt;
    this.id = id;
    this.x = x;
    this.y = y;
    this.size = {
        w: size.w,
        h: size.h,
    };
    var ss = new SpriteSheet('/pureBomberman/media/finalSprites/fire.png', 38, 38);
    this.sprite = new Animation(this.context, ss, 10, 0, 5);
}