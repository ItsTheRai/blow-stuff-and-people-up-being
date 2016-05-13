/**
 * Created by rai on 08/03/16.
 */

function Player(cnt, id, x, y, size) {
    this.sprite = null;
    this.alive = true;
    this.speedX = 0;
    this.speedY = 0;
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
    //dead
    this.animations.push(new Animation(this.context, ss, 15 / this.speed, 16, 16));


    this.plantBomb = function (tileX, tileY, gridSize) {
        if (this.bombs.length < this.maxbombs) {
            var middleX = tileX + (gridSize.w - this.bombsize) / 2;
            var middleY = tileY + (gridSize.h - this.bombsize) / 2;
            var bomb = new Bomb(this.context, this.id++, this, middleX, middleY, {
                w: this.bombsize,
                h: this.bombsize
            }, this.power);
            this.bombs.push(bomb);
        }
    };

    this.addPerk = function (perk) {
        if (perk.perkNumber == 0) {
            this.speed += 0.5;
        }
        else if (perk.perkNumber == 1) {
            this.maxbombs += 1;
        }
        else if (perk.perkNumber == 2) {
            this.power += 1;
        }
    };
}


function Bot(cnt, id, x, y, size, difficulty) {
    this.botAI = new BotAI(this, difficulty)
    this.sprite = null;
    this.alive = true;
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
            }, this.power);
            this.bombs.push(bomb);
        }
    };

    this.addPerk = function (perk) {
        if (perk.perkNumber == 0) {
            this.speed += 0.5;
        }
        else if (perk.perkNumber == 1) {
            this.maxbombs += 1;
        }
        else if (perk.perkNumber == 2) {
            this.power += 1;
        }
    };
}


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

    var ss = new SpriteSheet('/pureBomberman/media/perks.png', 32, 32);

    this.sprite = new Animation(this.context, ss, 60, perkNumber, perkNumber);
}


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

function SolidArea(cnt, id, x, y, size) {
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
    var ss = new SpriteSheet('/pureBomberman/media/boulder.png', 32, 32);
    this.sprite = new Animation(this.context, ss, 60, 0, 0);
}

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
    var ss = new SpriteSheet('/pureBomberman/media/tile_grass48.png', 48, 48);
    this.sprite = new Animation(this.context, ss, 60, 0, 0);
}

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
    var ss = new SpriteSheet('/pureBomberman/media/tile_wood.png', 32, 32);
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
};

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
    var ss = new SpriteSheet('/pureBomberman/media/fire.png', 38, 38);
    this.sprite = new Animation(this.context, ss, 10, 0, 5);
}

function Bomb(cnt, id, player, x, y, size, power) {
    this.sprite = null;
    this.timer = 2000;
    this.id = id;
    this.player = player;
    this.x = x
    this.y = y
    this.size = {
        w: size.w,
        h: size.h,
    }
    this.width = this.size.w
    this.height = this.size.h
    this.context = cnt
    this.exploded = false
    this.exploding = false
    this.power = power
    this.stage = 0
    this.stageIncrease = false
    this.fire = []
    //draw the object
    //interval bomb spreads
    this.explosionInterval = 10
    //interval fire exists
    this.explosionTimer = 500

    var ss = new SpriteSheet('/pureBomberman/media/bomb.png', 32, 32)
    this.sprite = new Animation(this.context, ss, 42, 0, 5)

    //this.sprite = new Animation(this.context, ss, 10, 0, 5)

    this.update = function () {
        if (this.timer >= 0) {
            this.timer -= 10
        }
    }


    this.getStage = function () {
        if (this.power == 1) {
            return 2
        }
        else if (this.power == 2) {
            return 4
        }
        else if (this.power == 3) {
            return 6
        }
        else if (this.power == 4) {
            return 8
        }
    }


    this.explode = function () {
        var self = this
        self.exploding = true
        var timer = setInterval(function () {
            if (self.stage >= self.getStage()) {
                if (self.explosionTimer <= 10) {
                    self.exploded = true
                    self.fire = []
                    clearInterval(timer)
                }
                else self.explosionTimer -= 10
            }
            else {
                self.stage++
                self.updateFire()
            }
        }, self.explosionInterval)
    }

    this.updateFire = function () {
        if (this.stage == 1) {

            this.fire.push(new Fire(this.context, this.id++, this.x, this.y, this.size))
            this.fire.push(new Fire(this.context, this.id++, this.x + this.width, this.y, this.size))
            this.fire.push(new Fire(this.context, this.id++, this.x - this.width, this.y, this.size))
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y + this.height, this.size))
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y - this.height, this.size))
        }
        else if (this.stage == 2) {

            this.fire.push(new Fire(this.context, this.id++, this.x + this.width, this.y + this.height, this.size))
            this.fire.push(new Fire(this.context, this.id++, this.x + this.width, this.y - this.height, this.size))
            this.fire.push(new Fire(this.context, this.id++, this.x - this.width, this.y - this.height, this.size))
            this.fire.push(new Fire(this.context, this.id++, this.x - this.width, this.y + this.height, this.size))
        }
        else if (this.stage == 3) {
            if (this.fire[1] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y, this.size))
            } else {
                this.fire.push(null)
            }
            if (this.fire[2] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y, this.size))
            } else this.fire.push(null)

            if (this.fire[3] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y + 2 * this.height, this.size))
            } else this.fire.push(null)

            if (this.fire[4] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y - 2 * this.height, this.size))
            } else this.fire.push(null)
        }

        else if (this.stage == 4) {

            if (this.fire[5] == null) {
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[5] != null && this.fire[1] == null && !(this.fire[3] == null)) {
                this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.width, this.y + 2 * this.height, this.size))
            }
            else if (this.fire[5] != null && this.fire[1] != null && this.fire[3] == null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y + 1 * this.height, this.size))
                this.fire.push(null)
            }
            else {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y + 1 * this.height, this.size))
                this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.width, this.y + 2 * this.height, this.size))
            }

            if (this.fire[6] == null) {
                this.fire.push(null)
                this.fire.push(null)
            }
            else if ((this.fire[1] == null) && (this.fire[4] != null)) {
                this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.width, this.y - 2 * this.height, this.size))
            }
            else if (this.fire[1] != null && this.fire[4] == null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y - 1 * this.height, this.size))
                this.fire.push(null)
            }
            else {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y - 1 * this.height, this.size))
                this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.width, this.y - 2 * this.height, this.size))
            }

            if (this.fire[7] == null) {
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[2] == null && this.fire[4] != null) {
                this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.width, this.y - 2 * this.height, this.size))
            }
            else if (this.fire[2] != null && this.fire[4] == null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y - 1 * this.height, this.size))
                this.fire.push(null)
            }
            else {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y - 1 * this.height, this.size))
                this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.width, this.y - 2 * this.height, this.size))
            }

            if (this.fire[8] == null) {
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[2] == null && this.fire[3] != null) {
                this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.width, this.y + 2 * this.height, this.size))
            }
            else if (this.fire[2] != null && this.fire[3] == null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y + 1 * this.height, this.size))
                this.fire.push(null)
            }
            else {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y + 1 * this.height, this.size))
                this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.width, this.y + 2 * this.height, this.size))
            }
        }


        if (this.stage == 5) {
            if (this.fire[9] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.width, this.y, this.size))
            } else this.fire.push(null)
            if (this.fire[10] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.width, this.y, this.size))
            } else this.fire.push(null)
            if (this.fire[11] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y + 3 * this.height, this.size))
            } else this.fire.push(null)

            if (this.fire[12] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y - 3 * this.height, this.size))
            } else this.fire.push(null)
        }

        else if (this.stage == 6) {

            if (this.fire[5] == null) {
                this.fire.push(null)
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[5] != null) {
                if (this.fire[9] != null && this.fire[13] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.width, this.y + 1 * this.height, this.size))
                } else {
                    this.fire.push(null)
                }

                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y + 2 * this.height, this.size))

                if (this.fire[14] != null && this.fire[11] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.width, this.y + 3 * this.height, this.size))
                } else this.fire.push(null)
            }

            if (this.fire[6] == null) {
                this.fire.push(null)
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[6] != null) {
                if (this.fire[9] != null && this.fire[15] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.width, this.y - 1 * this.height, this.size))
                } else this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y - 2 * this.height, this.size))
                if (this.fire[16] != null && this.fire[12] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.width, this.y - 3 * this.height, this.size))
                } else this.fire.push(null)
            }

            if (this.fire[7] == null) {
                this.fire.push(null)
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[7] != null) {
                if (this.fire[10] != null && this.fire[17] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.width, this.y - 1 * this.height, this.size))
                } else this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y - 2 * this.height, this.size))
                if (this.fire[18] != null && this.fire[12] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.width, this.y - 3 * this.height, this.size))
                } else this.fire.push(null)
            }

            if (this.fire[8] == null) {
                this.fire.push(null)
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[8] != null) {
                if (this.fire[10] != null && this.fire[19] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.width, this.y + 1 * this.height, this.size))
                } else this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y + 2 * this.height, this.size))
                if (this.fire[20] != null && this.fire[11] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.width, this.y + 3 * this.height, this.size))
                } else this.fire.push(null)
            }
        }


        else if (this.stage == 7) {
            //sides
            if (this.fire[21] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 4 * this.width, this.y, this.size))
            } else {
                this.fire.push(null)
            }
            if (this.fire[22] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 4 * this.width, this.y, this.size))
            } else this.fire.push(null)

            if (this.fire[23] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y + 4 * this.height, this.size))
            } else this.fire.push(null)

            if (this.fire[24] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y - 4 * this.height, this.size))
            } else this.fire.push(null)

            ////corners
            if (this.fire[13] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.width, this.y + 2 * this.height, this.size))
            } else this.fire.push(null)
            if (this.fire[14] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y + 3 * this.height, this.size))
            } else this.fire.push(null)
            //
            //
            if (this.fire[15] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.width, this.y - 2 * this.height, this.size))
            } else this.fire.push(null)
            if (this.fire[16] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y - 3 * this.height, this.size))
            } else this.fire.push(null)
            //
            //
            if (this.fire[17] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.width, this.y - 2 * this.height, this.size))
            } else this.fire.push(null)
            if (this.fire[18] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y - 3 * this.height, this.size))
            } else this.fire.push(null)
            //
            //
            if (this.fire[19] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.width, this.y + 2 * this.height, this.size))
            } else this.fire.push(null)
            if (this.fire[20] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y + 3 * this.height, this.size))
            } else this.fire.push(null)
        }
    }
}