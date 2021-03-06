/**
 * Created by rai on 14/05/16.
 */
function Bot(cnt, id, x, y, size, difficulty) {
    this.bombId = 0;
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
    var ss1 = new SpriteSheet('media/finalSprites/2minirai_front48.png', 48, 48);
    var ss2 = new SpriteSheet('media/finalSprites/2minirai_front_left48.png', 48, 48);
    var ss3 = new SpriteSheet('media/finalSprites/2minirai_left48.png', 48, 48);

    var ss4 = new SpriteSheet('media/finalSprites/2minirai_back_left48.png', 48, 48);
    var ss5 = new SpriteSheet('media/finalSprites/2minirai_back48.png', 48, 48);
    var ss6 = new SpriteSheet('media/finalSprites/2minirai_back_right48.png', 48, 48);
    var ss7 = new SpriteSheet('media/finalSprites/2minirai_right48.png', 48, 48);
    var ss8 = new SpriteSheet('media/finalSprites/2minirai_front_right48.png', 48, 48);

    this.animations.push(new Animation(this.context, ss1, 5 / this.speed, 0, 0));
    this.animations.push(new Animation(this.context, ss1, 5 / this.speed, 0, 7));
    this.animations.push(new Animation(this.context, ss2, 5 / this.speed, 0, 7));
    this.animations.push(new Animation(this.context, ss3, 5 / this.speed, 0, 7));
    this.animations.push(new Animation(this.context, ss4, 5 / this.speed, 0, 7));
    this.animations.push(new Animation(this.context, ss5, 5 / this.speed, 0, 7));
    this.animations.push(new Animation(this.context, ss6, 5 / this.speed, 0, 7));
    this.animations.push(new Animation(this.context, ss7, 5 / this.speed, 0, 7));
    this.animations.push(new Animation(this.context, ss8, 5 / this.speed, 0, 7));

    this.plantBomb = function (tileX, tileY, gridSize) {
        if (this.bombs.length < this.maxbombs) {
            var middleX = tileX + (gridSize.w - this.bombsize) / 2;
            var middleY = tileY + (gridSize.h - this.bombsize) / 2;
            var bomb = new Bomb(this.context, this.bombId++, this, middleX, middleY, {
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