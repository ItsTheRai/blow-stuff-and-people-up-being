/**
 * Created by rai on 14/05/16.
 */
function Bot(cnt, id, x, y, size, difficulty) {
    this.bombEscape = false;
    this.botAI = new BotAI(this, difficulty);
    this.sprite = null;
    this.alive = true;
    this.removed = false;
    this.speedX = 0;
    this.speedY = 0;
    this.PCmode = true;
    this.id = id;
    this.location = {
        x: x,
        y: y,
    }
    this.x = x;
    this.y = y;
    this.size = {
        w: size.w,
        h: size.h,
    }
    this.context = cnt;
    this.bombs = [];
    this.health = 100;
    this.speed = 1;
    this.power = 1;
    this.ammoType = 0;
    this.maxbombs = 1;
    this.bombsize = 28;
    this.direction = 0;
    this.animations = [];
    //set up all animations
    var ss = new SpriteSheet('/pureBomberman/media/betty2.png', 48, 48);

    this.animations.push(new Animation(this.context, ss, 15 / this.speed, 0, 0));
    this.animations.push(new Animation(this.context, ss, 15 / this.speed, 0, 3));
    this.animations.push(new Animation(this.context, ss, 15 / this.speed, 4, 7));
    this.animations.push(new Animation(this.context, ss, 15 / this.speed, 8, 11));
    this.animations.push(new Animation(this.context, ss, 15 / this.speed, 12, 15));

    this.animations.push(new Animation(this.context, ss, 15 / this.speed, 16, 16));

    this.plantBomb = function (tileX, tileY, gridSize) {
        if (this.bombs.length < this.maxbombs) {
            var middleX = tileX + (gridSize.w - this.bombsize) / 2;
            var middleY = tileY + (gridSize.h - this.bombsize) / 2;
            var bomb = new Bomb(this.context, this.id++, this, middleX, middleY, {
                w: this.bombsize,
                h: this.bombsize
            }, gridSize, this.power);
            this.bombs.push(bomb);
        }
    };

    this.addPerk = function (perk) {
        if (perk.perkNumber == 0) {
            this.maxbombs += 1;
        }
        else if (perk.perkNumber == 1) {
            this.speed += 0.5;
        }
        else if (perk.perkNumber == 2) {
            this.power += 1;
        }
    };
}