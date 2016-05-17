/**
 * Created by rai on 14/05/16.
 */
function Perk(x, y, context, size, perkNumber) {
    this.x = x;
    this.y = y;
    this.context = context;
    this.size = {
        w: size.w,
        h: size.h,
    }
    //this.width = width;
    //this.height = height;
    this.perkNumber = perkNumber;

    var ss = new SpriteSheet('/pureBomberman/media/finalSprites/perks.png', 48, 48);

    this.sprite = new Animation(this.context, ss, 60, perkNumber, perkNumber);
}