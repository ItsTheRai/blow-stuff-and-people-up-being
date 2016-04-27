/**
 * Created by rai on 07/03/16.
 */



window.onload = function () {
        //init variables
        //init game canvas object
        var myGameArea = {
            xTiles: 20,
            yTiles: 10,
            gridHeight: 50,
            gridWidth: 50,
            players: [],
            destroyableArea: [],
            solidArea: [],
            //set up initial configuration
            numberOfPlayers: 1,
            bombsize: 25,
            moveSize: 3,   //number of pixels an object is moved by by a single press of a button
            id: 0,
            canvas: this.document.getElementById("mycanvas"),

            startGame: function () {
                this.canvas.width = this.gridWidth * this.xTiles
                this.canvas.height = this.gridHeight * this.yTiles
                this.context = this.canvas.getContext("2d")
                var player1 = new Player(this.context, this.id++, 100, 100, this.gridWidth, this.gridHeight)
                var player2 = new Player(this.context, this.id++, 600, 500, this.gridWidth, this.gridHeight)
                this.players.push(player1)
                this.players.push(player2)
                //create grid border
                for (var i = 0; i < this.xTiles; i++) {
                    this.solidArea.push(new SolidArea(this.context, this.id++, i * this.gridWidth, 0, this.gridWidth, this.gridHeight))
                    this.solidArea.push(new SolidArea(this.context, this.id++, i * this.gridWidth, this.canvas.height - this.gridHeight, this.gridWidth, this.gridHeight))
                }
                for (var j = 1; j < this.yTiles - 1; j++) {
                    this.solidArea.push(new SolidArea(this.context, this.id++, 0, j * this.gridHeight, this.gridWidth, this.gridHeight))
                    this.solidArea.push(new SolidArea(this.context, this.id++, this.canvas.width - this.gridWidth, j * this.gridHeight, this.gridWidth, this.gridHeight))
                }

                this.solidArea.push(new SolidArea(this.context, this.id++, 600, 150, this.gridWidth, this.gridHeight))
                this.solidArea.push(new SolidArea(this.context, this.id++, 500, 200, this.gridWidth, this.gridHeight))
                this.solidArea.push(new SolidArea(this.context, this.id++, 100, 50, this.gridWidth, this.gridHeight))

                this.frameNo = 0
                //reload canvas


                //add event listeners for keyboard
                window.addEventListener('keydown', function (e) {
                    myGameArea.keys = (myGameArea.keys || []);
                    myGameArea.keys[e.keyCode] = true;
                })

                window.addEventListener('keyup', function (e) {
                    myGameArea.keys[e.keyCode] = false;
                    //key listener for bombs
                    if (e.keyCode == 32) {
                        console.log("key presseed")
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
                            myGameArea.plantBomb(myGameArea.players[0]);
                        }
                    }
                    if (e.keyCode == 96) {
                        console.log("key presseed")
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
                            myGameArea.plantBomb(myGameArea.players[1]);
                        }
                    }

                })
                //this.interval = setInterval(updateGame, 1000.0 / 60.0)
                updateGame()
            },

            plantBomb: function (player) {
                if (player.bombs.length < player.maxbombs) {
                    var bomb = new Bomb(this.context, this.id++, player, player.centerX, player.centerY, this.bombsize)
                    player.bombs.push(bomb)
                    console.log("the bomb has been planted")
                }
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


            for (var i = 0; i < myGameArea.solidArea.length; i++) {
                myGameArea.solidArea[i].update()
            }
            for (var i = 0; i < myGameArea.destroyableArea.length; i++) {
                myGameArea.destroyableArea[i].update()
            }

            for (var i = 0; i < myGameArea.players.length; i++) {
                if (myGameArea.players[i].alive) {
                    var total = Math.abs(myGameArea.players[i].speedX) + Math.abs(myGameArea.players[i].speedY)
                    if (total != 0) {
                        var scalar = Math.sqrt(total) / total
                        myGameArea.players[i].speedX *= (myGameArea.moveSize * scalar)
                        myGameArea.players[i].speedY *= (myGameArea.moveSize * scalar)
                    }
                }
                //update movement
                console.log("updating player innit")
                updatePlayerPosition(myGameArea.players[i])
                myGameArea.players[i].update()
            }

            //check for all bombs and damage to players and surronding
            for (var i = 0; i < myGameArea.players.length; i++) {
                for (var j = 0; j < myGameArea.players[i].bombs.length; j++) {
                    var bombb = myGameArea.players[i].bombs[j]
                    bombb.timer -= 10
                    bombb.update()
                    if (bombb.timer <= 0 && !bombb.exploding) {
                        bombb.explode()
                    }
                    else if (bombb.exploded) {
                        console.log("removding bbombss")
                        myGameArea.players[i].bombs.splice(myGameArea.players[i].bombs.indexOf(bombb), 1)
                    }
                    //login here to injure player/destroy wall
                    else if (bombb.exploding) {
                        if (bombb.stageIncrease) {
                            var bomb1 = new Bomb(myGameArea.context, myGameArea.id++, myGameArea.players[i], bombb.x - myGameArea.gridWidth, bombb.y, bombb.radius)
                            bomb1.timer = bombb.timer
                            bomb1.stage = bombb.stage
                            var bomb2 = new Bomb(myGameArea.context, myGameArea.id++, myGameArea.players[i], bombb.x + myGameArea.gridWidth, bombb.y, bombb.radius)
                            bomb2.timer = bombb.timer
                            bomb2.stage = bombb.stage
                            var bomb3 = new Bomb(myGameArea.context, myGameArea.id++, myGameArea.players[i], bombb.x, bombb.y - myGameArea.gridHeight, bombb.radius)
                            bomb3.timer = bombb.timer
                            bomb3.stage = bombb.stage
                            var bomb4 = new Bomb(myGameArea.context, myGameArea.id++, myGameArea.players[i], bombb.x, bombb.y + myGameArea.gridHeight, bombb.radius)
                            bomb4.timer = bombb.timer
                            bomb4.stage = bombb.stage
                            myGameArea.players[i].bombs.push(bomb1)
                            myGameArea.players[i].bombs.push(bomb2)
                            myGameArea.players[i].bombs.push(bomb3)
                            myGameArea.players[i].bombs.push(bomb4)
                            //console.log(myGameArea.players[i].bombs)
                            bombb.stageIncrease = false
                            break
                        }

                        else {
                            for (var x = 0; x < myGameArea.players.length; x++) {
                                //console.log(myGameArea.players[0])
                                //console.log(myGameArea.players[0].getGridLocation())
                                //console.log(bombb)
                                //console.log(bombb.getGridLocation())
                                if (myGameArea.players[x].getGridLocation() == bombb.getGridLocation()) {
                                    console.log("ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
                                    window.alert("you died")
                                    myGameArea.players[x].alive = false
                                }
                            }
                            for (var x = 0; x < myGameArea.destroyableArea.length; x++) {
                                if (myGameArea.destroyableArea[x].getGridLocation() == bombb.getGridLocation()) {
                                    //myGameArea.destroyableArea[x].injure()
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
            player.centerX = player.x + (player.width / 2)
            player.centerY = player.y + (player.height / 2)
        }

        function crashWithRectangele(player, otherobj) {
            var mytop = player.y + player.speedY;
            var mybottom = player.y + player.speedY + (player.height);
            var myleft = player.x + player.speedX;
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




