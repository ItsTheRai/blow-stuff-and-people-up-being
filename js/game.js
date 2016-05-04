/**
 * Created by rai on 07/03/16.
 */



window.onload = function () {
    //init variables
    //init game canvas object
    var myGameArea = {
        xTiles: 40,
        yTiles: 19,
        gridHeight: 32,
        gridWidth: 32,
        players: [],
        destroyableArea: [],
        solidArea: [],
        tiles:[],
        //set up initial configuration
        numberOfPlayers: 1,
        //bombsize: 25,
        moveSize: 3,   //number of pixels an object is moved by by a single press of a button
        id: 0,
        canvas: this.document.getElementById("mycanvas"),

        startGame: function () {
            this.canvas.width = this.gridWidth * this.xTiles
            this.canvas.height = this.gridHeight * this.yTiles
            this.context = this.canvas.getContext("2d")
            var player1 = new Player(this.context, this.id++, 50, 50, 38, 38)
            var player2 = new Player(this.context, this.id++, 600, 500, this.gridWidth, this.gridHeight)
            this.players.push(player1)
            //this.players.push(player2)
            //create grid border
            //paint in grid
            for (var i = 0; i < this.xTiles; i++) {
                for (var j = 0; j < this.yTiles; j++) {
                    this.tiles.push(new Tile(this.context, this.id++, i * this.gridWidth, j * this.gridWidth, this.gridWidth, this.gridHeight))
                }
            }
            //great border
            //horizontal
            for (var i = 0; i < this.xTiles; i++) {
                this.solidArea.push(new SolidArea(this.context, this.id++, i * this.gridWidth, 0, this.gridWidth, this.gridHeight))
                this.solidArea.push(new SolidArea(this.context, this.id++, i * this.gridWidth, this.canvas.height - this.gridHeight, this.gridWidth, this.gridHeight))
            }
            //vertical
            for (var j = 1; j < this.yTiles - 1; j++) {
                this.solidArea.push(new SolidArea(this.context, this.id++, 0, j * this.gridHeight, this.gridWidth, this.gridHeight))
                this.solidArea.push(new SolidArea(this.context, this.id++, this.canvas.width - this.gridWidth, j * this.gridHeight, this.gridWidth, this.gridHeight))
            }

            //maze grid
            for (var i = 7; i < this.xTiles; i++) {
                for (var j = 7; j < this.yTiles; j++) {
                    if (j % 2 == 0&& i % 2 ==0) {
                        this.solidArea.push(new SolidArea(this.context, this.id++, i * this.gridWidth, j * this.gridHeight, this.gridWidth, this.gridHeight))
                    }
                }
                if(i%2===1) {
                    //this.solidArea.push(new SolidArea(this.context, this.id++, i * this.gridWidth, j * this.gridHeight, this.gridWidth, this.gridHeight))
                }
            }

            this.solidArea.push(new SolidArea(this.context, this.id++, 350, 200, this.gridWidth, this.gridHeight))
            //destroyable area
            this.destroyableArea.push(new DestroyableArea(this.context, this.id++, 150, 150, this.gridWidth, this.gridHeight))
            this.destroyableArea.push(new DestroyableArea(this.context, this.id++, 150, 200, this.gridWidth, this.gridHeight))
            this.destroyableArea.push(new DestroyableArea(this.context, this.id++, 150, 250, this.gridWidth, this.gridHeight))

            //add event listeners for keyboard
            window.addEventListener('keydown', function (e) {
                myGameArea.keys = (myGameArea.keys || []);
                myGameArea.keys[e.keyCode] = true;
            })

            window.addEventListener('keyup', function (e) {
                myGameArea.keys[e.keyCode] = false;
                //key listener for bombs
                if (e.keyCode == 32) {
                    var dx = true
                    var dy = true
                    //check if bomb can be planted there
                    for (var i; i < myGameArea.players.length; i++) {
                        //dx = (Math.abs(myGameArea.players[0].centerX - myGameArea.bombs[i].centerX) >= myGameArea.players[0].radius + myGameArea.bombs[i].radius)
                        //dy = (Math.abs(myGameArea.players[0].centerY - myGameArea.bombs[i].centerY) >= myGameArea.players[0].radius + myGameArea.bombs[i].radius)
                        //if (!dx || !dy) {
                        //    continue
                    }//TODO uncomment dis

                    if (dx && dy) {

                        var bombCoords = getGridTilePoint(getGridPosition(myGameArea.players[0], myGameArea), myGameArea.xTiles, myGameArea.yTiles, myGameArea.gridWidth, myGameArea.gridHeight)
                        myGameArea.players[0].plantBomb(bombCoords[0], bombCoords[1]);
                    }
                }
                if (e.keyCode == 96) {
                    var dx = true
                    var dy = true
                    //check if bomb can be planted there
                    for (var i; i < myGameArea.players.length; i++) {
                        for (var j; j < myGameArea.players[i].bombs.length; j++) {

                            //dx = (Math.abs(myGameArea.players[0].centerX - myGameArea.bombs[i].centerX) >= myGameArea.players[0].radius + myGameArea.bombs[i].radius)
                            //dy = (Math.abs(myGameArea.players[0].centerY - myGameArea.bombs[i].centerY) >= myGameArea.players[0].radius + myGameArea.bombs[i].radius)
                            //if (!dx || !dy) {
                            //    continue
                        }
                    }//TODO uncomment dis


                    if (dx && dy) {
                        myGameArea.players[1].plantBomb();
                    }
                }
            })
            updateGame()
        },


        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        },

        stop: function () {
            clearInterval(this.interval)
        }
    }

    function updateGame() {
        window.requestAnimationFrame(updateGame);
        myGameArea.clear()
        //restet player speed
        for (var i = 0; i < myGameArea.players.length; i++) {
            myGameArea.players[i].speedX = 0
            myGameArea.players[i].speedY = 0
        }

        //left
        if (myGameArea.keys && myGameArea.keys[37]) {
            myGameArea.players[0].speedX += -1;
        }
        //right
        if (myGameArea.keys && myGameArea.keys[39]) {
            myGameArea.players[0].speedX += 1;
        }
        //up
        if (myGameArea.keys && myGameArea.keys[38]) {
            myGameArea.players[0].speedY += -1;
        }
        //down
        if (myGameArea.keys && myGameArea.keys[40]) {
            myGameArea.players[0].speedY += 1;
        }

        /////////////////////////////////////////////////

        //if (myGameArea.keys && myGameArea.keys[32]) {
        //
        //}
        //////////////////////////////////////////////
        //player 2

        if (myGameArea.keys && myGameArea.keys[65]) {
            myGameArea.players[1].speedX += -1;
        }
        //d
        if (myGameArea.keys && myGameArea.keys[68]) {
            myGameArea.players[1].speedX += 1;
        }
        //w
        if (myGameArea.keys && myGameArea.keys[87]) {
            myGameArea.players[1].speedY += -1;
        }
        //s
        if (myGameArea.keys && myGameArea.keys[83]) {
            myGameArea.players[1].speedY += 1;
        }


        for (var i = 0; i < myGameArea.tiles.length; i++) {
            myGameArea.tiles[i].update()
        }
        for (var i = 0; i < myGameArea.solidArea.length; i++) {
            myGameArea.solidArea[i].update()
        }
        for (var i = 0; i < myGameArea.destroyableArea.length; i++) {
            desArea = myGameArea.destroyableArea[i]

            if (desArea.triggered && !desArea.exploding) {
                desArea.explode()
            }
            else if(desArea.exploded){
                myGameArea.destroyableArea.splice(myGameArea.destroyableArea.indexOf(desArea), 1)
            }
            desArea.update()
        }

        for (var i = 0; i < myGameArea.players.length; i++) {
            if (myGameArea.players[i].alive) {
                var total = Math.abs(myGameArea.players[i].speedX) + Math.abs(myGameArea.players[i].speedY)
                if (total != 0) {
                    var scalar = Math.sqrt(total) / total
                    myGameArea.players[i].speedX *= (myGameArea.moveSize * scalar) * myGameArea.players[i].speed
                    myGameArea.players[i].speedY *= (myGameArea.moveSize * scalar) * myGameArea.players[i].speed
                }
            }
            //update movement
            updatePlayerPosition(myGameArea.players[i])
            myGameArea.players[i].update()
        }

        //check for all bombs and damage to players and surronding
        for (var i = 0; i < myGameArea.players.length; i++) {
            for (var j = 0; j < myGameArea.players[i].bombs.length; j++) {
                var bombb = myGameArea.players[i].bombs[j]
                bombb.update()
                if (bombb.timer <= 0 && !bombb.exploding) {
                    bombb.explode()
                }
                //TODO restore this
                else if (bombb.exploded) {
                    myGameArea.players[i].bombs.splice(myGameArea.players[i].bombs.indexOf(bombb), 1)
                    //bombb=null
                }
                //login here to injure player/destroy wall
                else if (bombb.exploding) {
                    for (var q = 0; q < bombb.fire.length; q++) {
                        if (bombb.fire[q] != null) {

                            bombb.fire[q].update()
                            removeFlag = false
                            for (var x = 0; x < myGameArea.players.length; x++) {
                                if (getGridPosition(myGameArea.players[x], myGameArea) == getGridPosition(bombb.fire[q], myGameArea)) {
                                    //window.alert("you died")
                                    //TODO restore this if
                                    //myGameArea.players[x].alive = false
                                    removeFlag = true
                                }
                            }

                            for (var x = 0; x < myGameArea.destroyableArea.length; x++) {
                                if (getGridPosition(myGameArea.destroyableArea[x], myGameArea) == getGridPosition(bombb.fire[q], myGameArea)) {
                                    myGameArea.destroyableArea[x].triggered = true
                                    removeFlag = true
                                    console.log("triggered")
                                }
                            }

                            for (var x = 0; x < myGameArea.solidArea.length; x++) {
                                if (getGridPosition(myGameArea.solidArea[x], myGameArea) == getGridPosition(bombb.fire[q], myGameArea)) {
                                    removeFlag = true
                                    console.log("triggered")
                                }
                            }

                            if (removeFlag) {
                                //set to null to keep positioning of all fires
                                bombb.fire[q] = null
                                //bombb.fire.splice(bombb.fire.indexOf(bombb.fire[q]), 1)
                            }
                        }
                    }

                }
            }
        }
    }



    function updatePlayerPosition(player) {
        //check for collisions here
        var moveX = true
        var moveY = true
        for (var i = 0; i < myGameArea.players.length; i++) {
            for (var j = 0; j < myGameArea.players[i].bombs.length; j++) {

                //test for bombs for each player
                var crash = crashWithCircle(player, myGameArea.players[i].bombs[j])
                if (crash == 0) {
                    player.speedY = Math.max(player.speedY, 0)
                }
                if (crash == 1) {
                    player.speedX = Math.min(player.speedX, 0)
                }
                if (crash == 2) {
                    player.speedY = Math.min(player.speedY, 0)
                }
                if (crash == 3) {
                    player.speedX = Math.max(player.speedX, 0)
                }
            }
            //skip if found itself
            if (player.id == myGameArea.players[i].id) {
                continue
            }
            var crash = crashWithRectangele(player, myGameArea.players[i])
            if (crash == 0) {
                player.speedY = Math.max(player.speedY, 0)
            }
            if (crash == 1) {
                player.speedX = Math.min(player.speedX, 0)
            }
            if (crash == 2) {
                player.speedY = Math.min(player.speedY, 0)
            }
            if (crash == 3) {
                player.speedX = Math.max(player.speedX, 0)
            }
        }

        for (var i = 0; i < myGameArea.destroyableArea.length; i++) {
            var crash = crashWithRectangele(player, myGameArea.destroyableArea[i])
            if (crash == 0) {
                player.speedY = Math.max(player.speedY, 0)
            }
            if (crash == 1) {
                player.speedX = Math.min(player.speedX, 0)
            }
            if (crash == 2) {
                player.speedY = Math.min(player.speedY, 0)
            }
            if (crash == 3) {
                player.speedX = Math.max(player.speedX, 0)
            }
        }
        for (var i = 0; i < myGameArea.solidArea.length; i++) {
            var crash = crashWithRectangele(player, myGameArea.solidArea[i])
            if (crash == 0) {
                player.speedY = Math.max(player.speedY, 0)
            }
            if (crash == 1) {
                player.speedX = Math.min(player.speedX, 0)
            }
            if (crash == 2) {
                player.speedY = Math.min(player.speedY, 0)
            }
            if (crash == 3) {
                player.speedX = Math.max(player.speedX, 0)
            }
        }

        player.x += player.speedX
        player.y += player.speedY
        if(player.speedX>0){
            player.direction = 4
        }
        else if (player.speedX<0){
            player.direction = 2
        }
        else if (player.speedY>0){
            player.direction = 1
        }
        else if (player.speedY<0){
            player.direction = 3
        }
        else player.direction = 0

    }

    function crashWithRectangele(player, otherobj) {
        var mytop = (player.y + player.speedY) +player.height/2;
        var mybottom = player.y + player.speedY + (player.height);
        var myleft = (player.x + player.speedX) +player.width/2;
        var myright = player.x + player.speedX + (player.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        //var crash = -1
        if (
            (myright <= otherleft) ||
            (myleft >= otherright) ||
            (mybottom <= othertop) ||
            (mytop >= otherbottom)) {
        }
        else {
            var l = Math.abs(myleft - otherright)
            var r = Math.abs(myright - otherleft)
            var t = Math.abs(mytop - otherbottom)
            var b = Math.abs(mybottom - othertop)
            var min = Math.min(l, r, t, b)

            if (t == min) {
                return 0
            }
            if (r == min) {
                return 1
            }
            if (b == min) {
                return 2
            }
            if (l == min) {
                return 3
            }
            return -1
        }
    }

    function crashWithCircle(player, otherobj) {
        var myX = player.x
        var myY = player.y
        var myWidth = player.width
        var myHeight = player.height
        var mytop = player.y;
        var mybottom = player.y + player.speedY + (player.height)
        var myleft = player.x + player.speedX;
        var myright = player.x + player.speedX + (player.width);
        var otherCentreX = otherobj.x
        var otherCenterY = otherobj.y
        var otherRadius = otherobj.radius
        var othertop = otherobj.y - (otherobj.radius)
        var otherbottom = otherobj.y + (otherobj.radius)
        var otherleft = otherobj.x - (otherobj.radius)
        var otherright = otherobj.x + (otherobj.radius)
        //var crash = -1
        if (
            (myright <= otherleft) ||
            (myleft >= otherright) ||
            (mybottom <= othertop) ||
            (mytop >= otherbottom)) {
        }
        else {
            var l = Math.abs(myleft - otherright)
            var r = Math.abs(myright - otherleft)
            var t = Math.abs(mytop - otherbottom)
            var b = Math.abs(mybottom - othertop)
            var min = Math.min(l, r, t, b)

            if (t == min) {
                return 0
            }
            if (r == min) {
                return 1
            }
            if (b == min) {
                return 2
            }
            if (l == min) {
                return 3
            }
            return -1
        }
    }

    myGameArea.startGame()

}




