/**
 * Created by rai on 07/05/16.
 */
function Controller(){
   this.bindListeners = function(myGameArea) {
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })

        window.addEventListener('keyup', function (e) {
            //console.log(myGameArea)
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
                    console.log(myGameArea)
                    console.log(myGameArea.players[0])
                    //players position is measured from their feet location
                    var c = getGridPlayerPosition(myGameArea.players[0], myGameArea)
                    var bombCoords = getGridTilePoint(c, myGameArea.xTiles, myGameArea.yTiles, myGameArea.gridSize.w, myGameArea.gridSize.h)
                    console.log(bombCoords)
                    console.log(c)
                    myGameArea.players[0].plantBomb(bombCoords[0], bombCoords[1], myGameArea.gridSize);
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
    }


    this.updateGameView = function (myGameArea) {
        //console.log("mygameare", myGameArea)
        //window.requestAnimationFrame(updateGame);
        if (!myGameArea.gameRunning) {
            myGameArea.gameloopSound.stop()
        }

        //this.clear(myGameArea)
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

////////////////////////////////////////////////////////////////




        for (var i = 0; i < myGameArea.destroyableArea.length; i++) {
            desArea = myGameArea.destroyableArea[i]

            if (desArea.triggered && !desArea.exploding) {
                desArea.explode()
            }
            else if (desArea.exploded) {
                myGameArea.destroyableArea.splice(myGameArea.destroyableArea.indexOf(desArea), 1)
            }
            //desArea.update()
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
            this.updatePlayerPosition(myGameArea.players[i], myGameArea)
            //myGameArea.players[i].update()
        }

        //check for all bombs and damage to players and surronding
        for (var i = 0; i < myGameArea.players.length; i++) {
            for (var j = 0; j < myGameArea.players[i].bombs.length; j++) {
                var bombb = myGameArea.players[i].bombs[j]
                bombb.update()
                if (bombb.timer <= 0 && !bombb.exploding) {
                    bombb.explode()
                    myGameArea.bombSound.play()
                }
                //TODO restore this
                else if (bombb.exploded) {
                    myGameArea.players[i].bombs.splice(myGameArea.players[i].bombs.indexOf(bombb), 1)
                }
                //login here to injure player/destroy wall
                else if (bombb.exploding) {
                    for (var q = 0; q < bombb.fire.length; q++) {
                        if (bombb.fire[q] != null) {
                            //bombb.fire[q].update()
                            removeFlag = false
                            for (var x = 0; x < myGameArea.players.length; x++) {
                                if (getGridPosition(myGameArea.players[x], myGameArea) == getGridPosition(bombb.fire[q], myGameArea)) {
                                    //window.alert("you died")
                                    //TODO restore this if
                                    //myGameArea.players[x].alive = false
                                    //flag for removal of objects
                                    removeFlag = true
                                }
                            }

                            for (var x = 0; x < myGameArea.destroyableArea.length; x++) {
                                if (!myGameArea.destroyableArea[x].triggered &&
                                    getGridPosition(myGameArea.destroyableArea[x], myGameArea) == getGridPosition(bombb.fire[q], myGameArea)) {
                                    myGameArea.destroyableArea[x].triggered = true;
                                    //random perk
                                    var rand = Math.floor(Math.random() * 3);
                                    //odds of getting a perk
                                    var perkOdds = Math.random()
                                    if (perkOdds < 0.3) {
                                        myGameArea.perks.push(new Perk(myGameArea.destroyableArea[x].x, myGameArea.destroyableArea[x].y, myGameArea.context, myGameArea.gridSize, rand));
                                    }
                                    removeFlag = true;
                                }
                            }

                            for (var x = 0; x < myGameArea.solidArea.length; x++) {
                                if (getGridPosition(myGameArea.solidArea[x], myGameArea) == getGridPosition(bombb.fire[q], myGameArea)) {
                                    removeFlag = true
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



    this.updatePlayerPosition = function(player, myGameArea) {
        console.log()
        if (player instanceof Player) {
            //check for collisions here
            var moveX = true
            var moveY = true
            for (var i = 0; i < myGameArea.players.length; i++) {
                for (var j = 0; j < myGameArea.players[i].bombs.length; j++) {

                    //test for bombs for each player
                    var crash = this.crashWithRectangele(player, myGameArea.players[i].bombs[j])
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
                var crash = this.crashWithRectangele(player, myGameArea.players[i])
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
                var crash = this.crashWithRectangele(player, myGameArea.destroyableArea[i])
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
                var crash = this.crashWithRectangele(player, myGameArea.solidArea[i])
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

            for (var i = 0; i < myGameArea.perks.length; i++) {
                var crash = this.crashWithRectangele(player, myGameArea.perks[i])
                console.log("perk size", myGameArea.perks)
                console.log("crash", crash)
                if (crash >= 0) {
                    //play sound
                    myGameArea.powerupSound.play()
                    player.addPerk(myGameArea.perks[i])
                    myGameArea.perks.splice(myGameArea.perks.indexOf(myGameArea.perks[i]), 1)
                }
            }

            //return (player.speedX, player.speedY)


            player.x += player.speedX
            player.y += player.speedY

            //set player direction for animation
            if (player.speedX > 0) {
                player.direction = 4
            }
            else if (player.speedX < 0) {
                player.direction = 2
            }
            else if (player.speedY > 0) {
                player.direction = 1
            }
            else if (player.speedY < 0) {
                player.direction = 3
            }
            else player.direction = 0

        }
        else if(player instanceof Bot){

        }
    }

    this.crashWithRectangele=function(player, otherobj) {
        var mytop = (player.y + player.speedY) + player.size.h / 2;
        var mybottom = player.y + player.speedY + (player.size.h);
        var myleft = (player.x + player.speedX) + player.size.w / 2;
        var myright = player.x + player.speedX + (player.size.w);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.size.h);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.size.w);
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

    this.crashWithCircle = function(player, otherobj) {
        var myX = player.x
        var myY = player.y
        var myWidth = player.size.w
        var myHeight = player.size.h
        var mytop = player.y;
        var mybottom = player.y + player.speedY + (player.size.h)
        var myleft = player.x + player.speedX;
        var myright = player.x + player.speedX + (player.size.w);
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



}