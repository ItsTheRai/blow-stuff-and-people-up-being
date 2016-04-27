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
    this.power = 1
    this.ammoType = 0
    this.maxbombs = 3
    //this.bombs = []
    //draw the object
    this.context.rect(this.x, this.y, this.height, this.width)
    this.context.fillRect(this.x, this.y, this.height, this.width)

    this.getGridLocation = function(){
        return Math.floor(this.x/this.width) + Math.floor((this.x/this.height))*Math.floor((this.y/this.height))
    }

    this.update = function () {
        if (this.alive) {
            this.context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

function Bomb(cnt, id, player, x, y, radius) {
    this.timer = 1000
    this.id = id
    this.player = player
    //this.directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    this.x = x
    this.y = y
    this.radius = radius
    this.context = cnt
    this.exploded = false
    this.exploding = false
    this.power = 1
    this.stage = 1
    this.stageIncrease = false
    //draw the object
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.stroke();

    this.getGridLocation = function(){
        return Math.floor(this.x/(this.radius*2)) + Math.floor(this.x/(this.radius*2))*Math.floor(this.y/(this.radius*2))
    }

    this.getStage = function(){
        if (this.power ==1){
            return 1
        }
        else if (this.power ==2){
            return 2
        }
        else if(this.power ==3){
            return 3
        }
        else if (this.power ==4){
            return 4
        }
    }

    this.getGridSize = function(){

    }

    this.update = function () {
        //TODO animation logic here based on bomb size
        if(this.getStage()==1){
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            this.context.stroke();
        }
        else{
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            this.context.stroke();
        }
    }

    this.explode = function () {
        var self = this
        self.exploding = true
        var timer = setInterval(function () {
            if (self.stage >= self.getStage()) {
                self.exploded= true
                clearInterval(timer)
            }
            self.stage++
            self.stageIncrease = true
        }, 500)
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
    this.context.rect(this.x, this.y, this.height, this.width)
    this.context.fillRect(this.x, this.y, this.height, this.width)

    this.update = function () {
        this.context.fillRect(this.x, this.y, this.width, this.height);
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
    this.context.rect(this.x, this.y, this.height, this.width)
    this.context.fillRect(this.x, this.y, this.height, this.width)

    this.update = function () {
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}

function Walls(cnt, id, x, y, width, height) {
    this.id = id
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.context = cnt
    //draw the object
    this.context.rect(this.x, this.y, this.height, this.width)
    this.context.fillRect(this.x, this.y, this.height, this.width)

    this.update = function () {
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
