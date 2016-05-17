/**
 * Created by rai on 14/05/16.
 */
function Bomb(cnt, id, player, x, y, size, tileSize, power) {
    this.alive = true;
    this.sprite = null;
    this.timer = 2000;
    this.id = id;
    this.player = player;
    this.x = x
    this.y = y
    this.size = {
        w: size.w,
        h: size.h
    };
    this.tileSize = {
        w: tileSize.w,
        h: tileSize.h
    };
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

    var ss = new SpriteSheet('/pureBomberman/media/finalSprites/bomb.png', 32, 32)
    this.sprite = new Animation(this.context, ss, 50, 0, 5)

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
                    self.exploded = true;
                    self.fire = [];
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
            this.fire.push(new Fire(this.context, this.id++, this.x + this.tileSize.w, this.y, this.size))
            this.fire.push(new Fire(this.context, this.id++, this.x - this.tileSize.w, this.y, this.size))
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y + this.tileSize.h, this.size))
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y - this.tileSize.h, this.size))
        }
        else if (this.stage == 2) {

            this.fire.push(new Fire(this.context, this.id++, this.x + this.tileSize.w, this.y + this.tileSize.h, this.size))
            this.fire.push(new Fire(this.context, this.id++, this.x + this.tileSize.w, this.y - this.tileSize.h, this.size))
            this.fire.push(new Fire(this.context, this.id++, this.x - this.tileSize.w, this.y - this.tileSize.h, this.size))
            this.fire.push(new Fire(this.context, this.id++, this.x - this.tileSize.w, this.y + this.tileSize.h, this.size))
        }
        else if (this.stage == 3) {
            if (this.fire[1] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.tileSize.w, this.y, this.size))
            } else {
                this.fire.push(null)
            }
            if (this.fire[2] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.tileSize.w, this.y, this.size))
            } else this.fire.push(null)

            if (this.fire[3] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y + 2 * this.tileSize.h, this.size))
            } else this.fire.push(null)

            if (this.fire[4] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y - 2 * this.tileSize.h, this.size))
            } else this.fire.push(null)
        }

        else if (this.stage == 4) {

            if (this.fire[5] == null) {
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[5] != null && this.fire[1] == null && !(this.fire[3] == null)) {
                this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.tileSize.w, this.y + 2 * this.tileSize.h, this.size))
            }
            else if (this.fire[5] != null && this.fire[1] != null && this.fire[3] == null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.tileSize.w, this.y + 1 * this.tileSize.h, this.size))
                this.fire.push(null)
            }
            else {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.tileSize.w, this.y + 1 * this.tileSize.h, this.size))
                this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.tileSize.w, this.y + 2 * this.tileSize.h, this.size))
            }

            if (this.fire[6] == null) {
                this.fire.push(null)
                this.fire.push(null)
            }
            else if ((this.fire[1] == null) && (this.fire[4] != null)) {
                this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.tileSize.w, this.y - 2 * this.tileSize.h, this.size))
            }
            else if (this.fire[1] != null && this.fire[4] == null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.tileSize.w, this.y - 1 * this.tileSize.h, this.size))
                this.fire.push(null)
            }
            else {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.tileSize.w, this.y - 1 * this.tileSize.h, this.size))
                this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.tileSize.w, this.y - 2 * this.tileSize.h, this.size))
            }

            if (this.fire[7] == null) {
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[2] == null && this.fire[4] != null) {
                this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.tileSize.w, this.y - 2 * this.tileSize.h, this.size))
            }
            else if (this.fire[2] != null && this.fire[4] == null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.tileSize.w, this.y - 1 * this.tileSize.h, this.size))
                this.fire.push(null)
            }
            else {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.tileSize.w, this.y - 1 * this.tileSize.h, this.size))
                this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.tileSize.w, this.y - 2 * this.tileSize.h, this.size))
            }

            if (this.fire[8] == null) {
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[2] == null && this.fire[3] != null) {
                this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.tileSize.w, this.y + 2 * this.tileSize.h, this.size))
            }
            else if (this.fire[2] != null && this.fire[3] == null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.tileSize.w, this.y + 1 * this.tileSize.h, this.size))
                this.fire.push(null)
            }
            else {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.tileSize.w, this.y + 1 * this.tileSize.h, this.size))
                this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.tileSize.w, this.y + 2 * this.tileSize.h, this.size))
            }
        }


        if (this.stage == 5) {
            if (this.fire[9] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.tileSize.w, this.y, this.size))
            } else this.fire.push(null)
            if (this.fire[10] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.tileSize.w, this.y, this.size))
            } else this.fire.push(null)
            if (this.fire[11] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y + 3 * this.tileSize.h, this.size))
            } else this.fire.push(null)

            if (this.fire[12] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y - 3 * this.tileSize.h, this.size))
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
                    this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.tileSize.w, this.y + 1 * this.tileSize.h, this.size))
                } else {
                    this.fire.push(null)
                }

                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.tileSize.w, this.y + 2 * this.tileSize.h, this.size))

                if (this.fire[14] != null && this.fire[11] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.tileSize.w, this.y + 3 * this.tileSize.h, this.size))
                } else this.fire.push(null)
            }

            if (this.fire[6] == null) {
                this.fire.push(null)
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[6] != null) {
                if (this.fire[9] != null && this.fire[15] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.tileSize.w, this.y - 1 * this.tileSize.h, this.size))
                } else this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.tileSize.w, this.y - 2 * this.tileSize.h, this.size))
                if (this.fire[16] != null && this.fire[12] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.tileSize.w, this.y - 3 * this.tileSize.h, this.size))
                } else this.fire.push(null)
            }

            if (this.fire[7] == null) {
                this.fire.push(null)
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[7] != null) {
                if (this.fire[10] != null && this.fire[17] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.tileSize.w, this.y - 1 * this.tileSize.h, this.size))
                } else this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.tileSize.w, this.y - 2 * this.tileSize.h, this.size))
                if (this.fire[18] != null && this.fire[12] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.tileSize.w, this.y - 3 * this.tileSize.h, this.size))
                } else this.fire.push(null)
            }

            if (this.fire[8] == null) {
                this.fire.push(null)
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[8] != null) {
                if (this.fire[10] != null && this.fire[19] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.tileSize.w, this.y + 1 * this.tileSize.h, this.size))
                } else this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.tileSize.w, this.y + 2 * this.tileSize.h, this.size))
                if (this.fire[20] != null && this.fire[11] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.tileSize.w, this.y + 3 * this.tileSize.h, this.size))
                } else this.fire.push(null)
            }
        }


        else if (this.stage == 7) {
            //sides
            if (this.fire[21] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 4 * this.tileSize.w, this.y, this.size))
            } else {
                this.fire.push(null)
            }
            if (this.fire[22] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 4 * this.tileSize.w, this.y, this.size))
            } else this.fire.push(null)

            if (this.fire[23] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y + 4 * this.tileSize.h, this.size))
            } else this.fire.push(null)

            if (this.fire[24] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y - 4 * this.tileSize.h, this.size))
            } else this.fire.push(null)

            ////corners
            if (this.fire[13] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.tileSize.w, this.y + 2 * this.tileSize.h, this.size))
            } else this.fire.push(null)
            if (this.fire[14] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.tileSize.w, this.y + 3 * this.tileSize.h, this.size))
            } else this.fire.push(null)
            //
            //
            if (this.fire[15] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.tileSize.w, this.y - 2 * this.tileSize.h, this.size))
            } else this.fire.push(null)
            if (this.fire[16] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.tileSize.w, this.y - 3 * this.tileSize.h, this.size))
            } else this.fire.push(null)
            //
            //
            if (this.fire[17] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.tileSize.w, this.y - 2 * this.tileSize.h, this.size))
            } else this.fire.push(null)
            if (this.fire[18] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.tileSize.w, this.y - 3 * this.tileSize.h, this.size))
            } else this.fire.push(null)
            //
            //
            if (this.fire[19] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.tileSize.w, this.y + 2 * this.tileSize.h, this.size))
            } else this.fire.push(null)
            if (this.fire[20] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.tileSize.w, this.y + 3 * this.tileSize.h, this.size))
            } else this.fire.push(null)
        }
    }
}