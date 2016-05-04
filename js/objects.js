/**
 * Created by rai on 08/03/16.
 */

function Player(cnt, id, x, y, width, height) {
    this.sprite = null

    this.alive = true
    this.speedX = 0
    this.speedY = 0
    this.PCmode = true
    this.id = id
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.context = cnt
    this.bombs = []
    this.health = 100
    this.speed = 1
    this.power = 4
    this.ammoType = 0
    this.maxbombs = 1000
    this.bombsize = 28
    this.direction = 0
    this.animations=[]
    //set up all animations
    var ss = new SpriteSheet('/pureBomberman/media/betty2.png', 48, 48)

    this.animations.push(new Animation(this.context, ss, 15/this.speed, 0, 0))
    this.animations.push(new Animation(this.context, ss, 15/this.speed, 0, 3))
    this.animations.push(new Animation(this.context, ss, 15/this.speed, 4, 7))
    this.animations.push(new Animation(this.context, ss, 15/this.speed, 8, 11))
    this.animations.push(new Animation(this.context, ss, 15/this.speed, 12, 15))

    this.update = function () {
        if (this.alive) {
            this.animations[this.direction].update()
            this.animations[this.direction].draw(this.x, this.y)
        }
    }

    this.plantBomb = function (x, y) {
        if (this.bombs.length < this.maxbombs) {
            var bomb = new Bomb(this.context, this.id++, this, x, y, this.bombsize, this.bombsize, this.power)
            this.bombs.push(bomb)
            console.log("the bomb has been planted")
        }
    }
}

function SpriteSheet(path, frameWidth, frameHeight) {
    this.image = new Image()
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight

    var self = this
    this.image.onload = function () {
        console.log("loading image")
        self.framesPerRow = Math.floor(self.image.width / self.frameWidth)
        console.log(self.framesPerRow+ " frames per row")
    }
    this.image.src = path
}

function Animation(context, spritesheet, frameSpeed, startFrame, endFrame) {
    this.context = context
    var animationSequence = [];  // array holding the order of the animation
    var currentFrame = 0;        // the current frame to draw
    var counter = 0;             // keep track of frame rate

    // create the sequence of frame numbers for the animation
    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
        animationSequence.push(frameNumber);

    // Update the animation
    this.update = function () {
        // update to the next frame if it is time
        if (counter == (frameSpeed - 1))
            currentFrame = (currentFrame + 1) % animationSequence.length;
        // update the counter
        counter = (counter + 1) % frameSpeed;
    }


    // draw the current frame
    this.draw = function (x, y) {
        // get the row and col of the frame
        var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
        var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);

        this.context.drawImage(
            spritesheet.image,
            col * spritesheet.frameWidth, row * spritesheet.frameHeight,
            spritesheet.frameWidth, spritesheet.frameHeight,
            x, y,
            spritesheet.frameWidth, spritesheet.frameHeight);
    };
}


function Fire(cnt, id, x, y, width, height) {
    this.sprite = null
    this.active = true
    this.timerLimit = 100
    this.timer = 0
    this.context = cnt
    this.id = id
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    var ss = new SpriteSheet('/pureBomberman/media/fire.png', 38, 38)
    this.sprite = new Animation(this.context, ss, 120, 0, 5)
    this.sprite.draw(this.x, this.y)

    this.update = function () {
            this.sprite.update()
            this.sprite.draw(this.x, this.y)
    }
}

function SolidArea(cnt, id, x, y, width, height) {
    this.sprite = null
    this.id = id
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.context = cnt
    //draw the object
    var ss = new SpriteSheet('/pureBomberman/media/tile_wall.png', 32, 32)
    this.sprite = new Animation(this.context, ss, 60, 0, 0)
    this.sprite.update()
    this.sprite.draw(this.x, this.y)

    this.update = function () {
        this.sprite.update()
        this.sprite.draw(this.x, this.y)
    }
}

function Tile(cnt, id, x, y, width, height) {
    this.sprite = null
    this.id = id
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.context = cnt
    //draw the object
    var ss = new SpriteSheet('/pureBomberman/media/tile_grass.png', 32, 32)
    this.sprite = new Animation(this.context, ss, 60, 0, 0)
    this.sprite.update()
    this.sprite.draw(this.x, this.y)

    this.update = function () {
        this.sprite.update()
        this.sprite.draw(this.x, this.y)
    }
}

function DestroyableArea(cnt, id, x, y, width, height) {
    this.sprite = null
    this.id = id
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.context = cnt
    this.triggered = false
    this.exploding = false
    this.exploded = false
    this.stage = 0
    this.explosionInterval = 500

    console.log("created area")
    //draw the object
    var ss = new SpriteSheet('/pureBomberman/media/tile_wood.png', 32, 32)
    this.sprite = new Animation(this.context, ss, 60, 0, 0)
    this.sprite.update()
    this.sprite.draw(this.x, this.y)

    this.update = function () {
        this.sprite.update()
        this.sprite.draw(this.x, this.y)
    }


    this.explode = function () {
        var self = this
        this.exploding = true
        var timer = setInterval(function () {
            if (self.stage >= 3) {
                self.exploded = true
                clearInterval(timer)

            }
            else {
                self.stage++
                //TODO blow up animation here
            }
        }, self.explosionInterval)
    }
}

function Bomb(cnt, id, player, x, y, width, height, power) {
    this.sprite = null
    this.timer = 2000
    this.id = id
    this.player = player
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.context = cnt
    this.exploded = false
    this.exploding = false
    this.power = power
    this.stage = 0
    this.stageIncrease = false
    this.fire = []
    //draw the object
    this.explosionInterval = 50
    this.explosionTimer = 500

    var ss = new SpriteSheet('/pureBomberman/media/bomb.png', 28, 28)
    this.sprite = new Animation(this.context, ss, 42, 0, 5)
    this.sprite.draw(this.x, this.y)

    this.update = function () {
    if(this.timer>=0) {
        this.timer -= 10
        this.sprite.update()
        this.sprite.draw(this.x, this.y)
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

            this.fire.push(new Fire(this.context, this.id++, this.x, this.y, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x + this.width, this.y, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x - this.width, this.y, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y + this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y - this.height, this.width, this.height))
        }
        else if (this.stage == 2) {

            this.fire.push(new Fire(this.context, this.id++, this.x + this.width, this.y + this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x + this.width, this.y - this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x - this.width, this.y - this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x - this.width, this.y + this.height, this.width, this.height))
            //console.log(this.fire)
        }
        else if (this.stage == 3) {
            if (this.fire[1] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y, this.width, this.height))
            } else {
                this.fire.push(null)
            }
            if (this.fire[2] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y, this.width, this.height))
            } else this.fire.push(null)

            if (this.fire[3] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y + 2 * this.height, this.width, this.height))
            } else this.fire.push(null)

            if (this.fire[4] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y - 2 * this.height, this.width, this.height))
            } else this.fire.push(null)
        }

        else if (this.stage == 4) {

            if (this.fire[5] == null) {
                this.fire.push(null)
                this.fire.push(null)
                console.log(this.fire)
            }
            else if (this.fire[5] != null && this.fire[1] == null && !(this.fire[3] == null)) {
                this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.width, this.y + 2 * this.height, this.width, this.height))
            }
            else if (this.fire[5] != null && this.fire[1] != null && this.fire[3] == null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y + 1 * this.height, this.width, this.height))
                this.fire.push(null)
            }
            else {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y + 1 * this.height, this.width, this.height))
                this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.width, this.y + 2 * this.height, this.width, this.height))
            }

            if (this.fire[6] == null) {
                this.fire.push(null)
                this.fire.push(null)
            }
            else if ((this.fire[1] == null) && (this.fire[4] != null)) {
                this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.width, this.y - 2 * this.height, this.width, this.height))
            }
            else if (this.fire[1] != null && this.fire[4] == null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y - 1 * this.height, this.width, this.height))
                this.fire.push(null)
            }
            else {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y - 1 * this.height, this.width, this.height))
                this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.width, this.y - 2 * this.height, this.width, this.height))
            }

            if (this.fire[7] == null) {
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[2] == null && this.fire[4] != null) {
                this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.width, this.y - 2 * this.height, this.width, this.height))
            }
            else if (this.fire[2] != null && this.fire[4] == null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y - 1 * this.height, this.width, this.height))
                this.fire.push(null)
            }
            else {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y - 1 * this.height, this.width, this.height))
                this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.width, this.y - 2 * this.height, this.width, this.height))
            }

            if (this.fire[8] == null) {
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[2] == null && this.fire[3] != null) {
                this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.width, this.y + 2 * this.height, this.width, this.height))
            }
            else if (this.fire[2] != null && this.fire[3] == null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y + 1 * this.height, this.width, this.height))
                this.fire.push(null)
            }
            else {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y + 1 * this.height, this.width, this.height))
                this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.width, this.y + 2 * this.height, this.width, this.height))
            }
        }


        if (this.stage == 5) {
            if (this.fire[9] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.width, this.y, this.width, this.height))
            } else this.fire.push(null)
            if (this.fire[10] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.width, this.y, this.width, this.height))
            } else this.fire.push(null)
            if (this.fire[11] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y + 3 * this.height, this.width, this.height))
            } else this.fire.push(null)

            if (this.fire[12] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y - 3 * this.height, this.width, this.height))
            } else this.fire.push(null)
        }

        else if (this.stage == 6) {

            if (this.fire[5] == null) {
                this.fire.push(null)
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[5] != null) {
                console.log(this.fire)
                if (this.fire[9] != null && this.fire[13] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.width, this.y + 1 * this.height, this.width, this.height))
                } else {
                    this.fire.push(null)
                }

                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y + 2 * this.height, this.width, this.height))

                if (this.fire[14] != null && this.fire[11] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.width, this.y + 3 * this.height, this.width, this.height))
                } else this.fire.push(null)
            }

            if (this.fire[6] == null) {
                this.fire.push(null)
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[6] != null) {
                if (this.fire[9] != null && this.fire[15] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.width, this.y - 1 * this.height, this.width, this.height))
                } else this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y - 2 * this.height, this.width, this.height))
                if (this.fire[16] != null && this.fire[12] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x + 1 * this.width, this.y - 3 * this.height, this.width, this.height))
                } else this.fire.push(null)
            }

            if (this.fire[7] == null) {
                this.fire.push(null)
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[7] != null) {
                if (this.fire[10] != null && this.fire[17] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.width, this.y - 1 * this.height, this.width, this.height))
                } else this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y - 2 * this.height, this.width, this.height))
                if (this.fire[18] != null && this.fire[12] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.width, this.y - 3 * this.height, this.width, this.height))
                } else this.fire.push(null)
            }

            if (this.fire[8] == null) {
                this.fire.push(null)
                this.fire.push(null)
                this.fire.push(null)
            }
            else if (this.fire[8] != null) {
                if (this.fire[10] != null && this.fire[19] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.width, this.y + 1 * this.height, this.width, this.height))
                } else this.fire.push(null)
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y + 2 * this.height, this.width, this.height))
                if (this.fire[20] != null && this.fire[11] != null) {
                    this.fire.push(new Fire(this.context, this.id++, this.x - 1 * this.width, this.y + 3 * this.height, this.width, this.height))
                } else this.fire.push(null)
            }
        }


        else if (this.stage == 7) {
            //sides
            if (this.fire[21] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 4 * this.width, this.y, this.width, this.height))
            } else {
                this.fire.push(null)
            }
            if (this.fire[22] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 4 * this.width, this.y, this.width, this.height))
            } else this.fire.push(null)

            if (this.fire[23] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y + 4 * this.height, this.width, this.height))
            } else this.fire.push(null)

            if (this.fire[24] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x, this.y - 4 * this.height, this.width, this.height))
            } else this.fire.push(null)

            ////corners
            if (this.fire[13] != null) {
                console.log("what what")
                this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.width, this.y + 2 * this.height, this.width, this.height))
            } else this.fire.push(null)
            if (this.fire[14] != null) {
                console.log("what what")
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y + 3 * this.height, this.width, this.height))
            } else this.fire.push(null)
            //
            //
            if (this.fire[15] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.width, this.y - 2 * this.height, this.width, this.height))
            } else this.fire.push(null)
            if (this.fire[16] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y - 3 * this.height, this.width, this.height))
            } else this.fire.push(null)
            //
            //
            if (this.fire[17] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.width, this.y - 2 * this.height, this.width, this.height))
            } else this.fire.push(null)
            if (this.fire[18] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y - 3 * this.height, this.width, this.height))
            } else this.fire.push(null)
            //
            //
            if (this.fire[19] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.width, this.y + 2 * this.height, this.width, this.height))
            } else this.fire.push(null)
            if (this.fire[20] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y + 3 * this.height, this.width, this.height))
            } else this.fire.push(null)
        }
    }
}

