/**
 * Created by rai on 14/05/16.
 */
function Tile(cnt, id, x, y, size) {
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
    //draw the object
    var ss = new SpriteSheet('/pureBomberman/media/finalSprites/tile_grass48.png', 48, 48);
    this.sprite = new Animation(this.context, ss, 60, 0, 0);
}