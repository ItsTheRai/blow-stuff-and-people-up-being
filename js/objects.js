/**
 * Created by rai on 08/03/16.
 */

function Player(cnt, id, x, y, width, height) {
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
    this.speed = 2
    this.power = 4
    this.ammoType = 0
    this.maxbombs = 1000
    this.bombsize = 25
    //draw the object
    this.context.beginPath()
    this.context.rect(this.x, this.y, this.height, this.width)
    this.context.fillRect(this.x, this.y, this.height, this.width)
    this.context.closePath()

    this.plantBomb = function (x, y) {
        if (this.bombs.length < this.maxbombs) {
            var bomb = new Bomb(this.context, this.id++, this, x, y, this.bombsize, this.power)
            this.bombs.push(bomb)
            console.log("the bomb has been planted")
        }
    }

    this.update = function () {
        if (this.alive) {
            this.context.beginPath()
            this.context.fillRect(this.x, this.y, this.width, this.height);
            this.context.closePath()
        }
    }
}

function Bomb(cnt, id, player, x, y, radius, power) {
    this.timer = 2000
    this.id = id
    this.player = player
    this.x = x
    this.y = y
    this.radius = radius
    this.width = radius * 2
    this.height = radius * 2
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

    this.context.beginPath();
    this.context.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.radius, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.closePath()

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

    this.update = function () {
        this.timer -= 10
        //TODO animation logic here based on bomb size
        this.context.beginPath();
        this.context.strokeStyle = "red"
        this.context.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.radius, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.closePath()
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
            //console.log(this.fire)

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
            }else this.fire.push(null)
            if (this.fire[14] != null) {
                console.log("what what")
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y + 3 * this.height, this.width, this.height))
            }else this.fire.push(null)
            //
            //
            if (this.fire[15] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 3 * this.width, this.y - 2 * this.height, this.width, this.height))
            }else this.fire.push(null)
            if (this.fire[16] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x + 2 * this.width, this.y - 3 * this.height, this.width, this.height))
            }else this.fire.push(null)
            //
            //
            if (this.fire[17] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.width, this.y - 2 * this.height, this.width, this.height))
            }else this.fire.push(null)
            if (this.fire[18] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y - 3 * this.height, this.width, this.height))
            }else this.fire.push(null)
            //
            //
            if (this.fire[19] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 3 * this.width, this.y + 2 * this.height, this.width, this.height))
            }else this.fire.push(null)
            if (this.fire[20] != null) {
                this.fire.push(new Fire(this.context, this.id++, this.x - 2 * this.width, this.y + 3 * this.height, this.width, this.height))
            }else this.fire.push(null)
        }
    }
}

function Fire(cnt, id, x, y, width, height) {
    this.active = true
    this.timerLimit = 100
    this.timer = 0
    this.radius = width / 2
    this.context = cnt
    this.id = id
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.update = function () {
        this.timer += 10
        if (this.timer >= this.timerLimit) {
            this.active = false
        }
        //TODO explosion animation and shizzle

        this.context.beginPath()
        this.context.fillStyle = "black"
        this.context.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.radius, 0, 2 * Math.PI)
        this.context.fill()
        this.context.closePath()
    }

}

function SolidArea(cnt, id, x, y, width, height) {
    this.id = id
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.context = cnt
    //draw the object
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.height, this.width)
    this.context.fillRect(this.x, this.y, this.height, this.width)
    this.context.closePath()

    this.update = function () {
        this.context.beginPath();
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.closePath()
    }
}

function Tile(cnt, id, x, y, width, height) {
    this.id = id
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.context = cnt
    //draw the object
    this.context.beginPath()
    this.context.lineWidth = "2"
    this.context.strokeStyle = "gray"
    this.context.rect(this.x, this.y, this.height, this.width)
    this.context.stroke()
    this.context.closePath()
    this.update = function () {
        this.context.beginPath()
        this.context.lineWidth = "2"
        this.context.strokeStyle = "gray"
        this.context.rect(this.x, this.y, this.height, this.width)
        this.context.stroke()
        this.context.closePath()
    }
}

function DestroyableArea(cnt, id, x, y, width, height) {
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
    this.context.beginPath()
    this.context.lineWidth = "20"
    this.context.strokeStyle = "green"
    this.context.rect(this.x, this.y, this.height, this.width)
    //this.context.fillRect(this.x, this.y, this.height, this.width)
    this.context.stroke()
    this.context.closePath()
    this.update = function () {
        this.context.beginPath()
        this.context.lineWidth = "20"
        this.context.strokeStyle = "green"
        this.context.rect(this.x, this.y, this.height, this.width)
        this.context.stroke()
        this.context.closePath()
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