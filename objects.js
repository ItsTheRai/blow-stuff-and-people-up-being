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
    this.centerX = this.x + (this.width / 2)
    this.centerY = this.y + (this.height / 2)
    this.context = cnt
    this.bombs = []
    this.health = 100
    this.speed = 100
    this.power = 4
    this.ammoType = 0
    this.maxbombs = 3
    this.bombsize = 25
    //this.bombs = []
    //draw the object
    this.context.beginPath()
    this.context.rect(this.x, this.y, this.height, this.width)
    this.context.fillRect(this.x, this.y, this.height, this.width)
    this.context.closePath()

    //this.getGridLocation = function(){
    //    return Math.floor(this.x/this.width) + Math.floor((this.x/this.height))*Math.floor((this.y/this.height))
    //}

    this.plantBomb = function () {
        if (this.bombs.length < this.maxbombs) {
            var bomb = new Bomb(this.context, this.id++, this, this.centerX, this.centerY, this.bombsize, this.power)
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

function Bomb(cnt, id, player, x, y, radius,power) {
    this.timer = 1000
    this.id = id
    this.player = player
    this.x = x
    this.y = y
    this.radius = radius
    this.width = radius*2
    this.height = radius*2
    this.context = cnt
    this.exploded = false
    this.exploding = false
    this.power = power
    this.stage = 0
    this.stageIncrease = false
    this.fire=[]
    //draw the object
    this.explosionInterval=1000
    this.explosionTimer=0

    console.log(this.x)
    console.log(this.y)
    console.log(this.width)
    console.log(this.height)

    console.log(Math.floor(this.x/(this.width)))
    console.log(Math.floor(this.y/(this.height)))

    //console.log(Math.floor(this.x/(this.width)) + Math.floor(this.x/(this.width))*myGameArea.gridHeight)
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.closePath()

    //this.getGridLocation = function(){
    //    return Math.floor(this.x/(this.width)) + Math.floor(this.x/(this.width))*Math.floor(this.y/(this.height))
    //}

    this.getStage = function(){
        if (this.power ==1){
            return 2
        }
        else if (this.power ==2){
            return 4
        }
        else if(this.power ==3){
            return 6
        }
        else if (this.power ==4){
            return 8
        }
    }

    this.update = function () {
        this.timer -=10
        //TODO animation logic here based on bomb size
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            this.context.stroke();
            this.context.closePath()
    }

    this.explode = function () {
        var self = this
        self.exploding = true
        var timer = setInterval(function () {
            //console.log(self.fire)
            if (self.stage >= self.getStage()) {
                if(self.explosionTimer>=4000) {
                    //self.exploded = true
                    //TODO restore this after test
                    self.fire = []
                    clearInterval(timer)
                }
                else self.explosionTimer+=10
            }
            else {
                self.stage++
                self.updateFire()
            }
        }, self.explosionInterval)
    }

    this.updateFire = function() {
        if(this.stage==1){
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x+this.width, this.y, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-this.width, this.y, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y+this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y-this.height, this.width, this.height))
        }
        else if(this.stage==2){
            this.fire.push(new Fire(this.context, this.id++, this.x+this.width, this.y+this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x+this.width, this.y-this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-this.width, this.y+this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-this.width, this.y-this.height, this.width, this.height))
        }
        else if (this.stage==3){
            this.fire.push(new Fire(this.context, this.id++, this.x+2*this.width, this.y, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-2*this.width, this.y, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y+2*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y-2*this.height, this.width, this.height))
        }
        else if (this.stage==4){
            this.fire.push(new Fire(this.context, this.id++, this.x+2*this.width, this.y+this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x+2*this.width, this.y-this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-2*this.width, this.y+this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-2*this.width, this.y-this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x+this.width, this.y+2*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x+this.width, this.y-2*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-this.width, this.y+2*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-this.width, this.y-2*this.height, this.width, this.height))
        }
        else if (this.stage==5){
            this.fire.push(new Fire(this.context, this.id++, this.x+3*this.width, this.y, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-3*this.width, this.y, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y+3*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y-3*this.height, this.width, this.height))
        }
        else if (this.stage==6){
            this.fire.push(new Fire(this.context, this.id++, this.x+this.width, this.y+3*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x+2*this.width, this.y+2*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x+3*this.width, this.y+this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x+3*this.width, this.y-this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x+2*this.width, this.y-2*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x+this.width, this.y-3*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-this.width, this.y+3*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-2*this.width, this.y+2*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-3*this.width, this.y+this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-3*this.width, this.y-this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-2*this.width, this.y-2*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-this.width, this.y-3*this.height, this.width, this.height))
        }
        else if (this.stage==7){
            this.fire.push(new Fire(this.context, this.id++, this.x+4*this.width, this.y, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-4*this.width, this.y, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y+4*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x, this.y-4*this.height, this.width, this.height))

            this.fire.push(new Fire(this.context, this.id++, this.x-2*this.width, this.y-3*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-2*this.width, this.y+3*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-3*this.width, this.y-2*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x-3*this.width, this.y+2*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x+2*this.width, this.y-3*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x+2*this.width, this.y+3*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x+3*this.width, this.y-2*this.height, this.width, this.height))
            this.fire.push(new Fire(this.context, this.id++, this.x+3*this.width, this.y+2*this.height, this.width, this.height))
        }
    }
}
function Fire(cnt, id, x, y, width, height){
    this.active = true
    this.timerLimit=1000
    this.timer = 0
    this.radius = width/2
    this.context =cnt
    this.id = id
    this.x = x
    this.y = y
    this.width = width

    this.update = function () {
        this.timer+=10
        if(this.timer>=this.timerLimit){
            this.active = false;
        }
        //console.log("updating shizzle")
        //TODO explosion animation and shizzle

        this.context.beginPath();
        this.context.fillStyle="black"
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
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

function DestroyableArea(cnt, id, x, y, width, height) {
    this.id = id
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.context = cnt
    //draw the object
    this.context.beginPath()
    this.context.rect(this.x, this.y, this.height, this.width)
    this.context.fillRect(this.x, this.y, this.height, this.width)
    this.context.closePath()
    this.update = function () {
        this.context.beginPath()
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.closePath()
    }
}

