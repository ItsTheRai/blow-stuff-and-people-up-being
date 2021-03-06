/**
 * Created by rai on 09/05/16.
 */
/**
 * Created by rai on 07/05/16.
 */
function Logic(game) {
    this.game = game;
    this.gameFinished = false;
    //this.gameFinished = false;

    this.init = function () {
        game.init();
    }

    this.resetGame = function () {
        this.game = new Game(this.game.canvas)
        //this.game.init();
    }

    this.stopGame = function () {
        this.game.stop();
    }

    this.updateMovement = function (input) {
        //console.log(this.game.players)
        //left
        if (input[37]) {
            for( var i = 0; i < this.game.players.length; i++){
                if(this.game.players[i].id==0) {
                    this.game.players[i].speedX += -1;
                }
            }
        }
        //right
        if (input[39]) {
            for( var i = 0; i < this.game.players.length; i++){
                if(this.game.players[i].id==0) {
                    this.game.players[i].speedX += 1;
                }
            }
        }
        //up
        if (input[38]) {
            for( var i = 0; i < this.game.players.length; i++){
                if(this.game.players[i].id==0) {
                    this.game.players[i].speedY += -1;
                }
            }
        }
        //down
        if (input[40]) {
            for( var i = 0; i < this.game.players.length; i++){
                if(this.game.players[i].id==0) {
                    this.game.players[i].speedY += 1;
                }
            }
        }

        if (input[32]) {
            var player;
            for( var i = 0; i < this.game.players.length; i++){
                if(this.game.players[i].id==0) {
                    player = this.game.players[i];
                }
            }
            var hasBomb = false;
            var flag = false;
            var c = getGridPlayerPosition(player, this.game);

            for (var k = 0; k < this.game.players.length; k++) {
                for (var m = 0; m < this.game.players[k].bombs.length; m++) {
                    var p = getGridPlayerPosition(this.game.players[k].bombs[m], this.game);
                    if (c == p) {
                        flag = true;
                    }
                }
            }
            if (!flag) {

                var bombCoords = getGridTilePoint(c, this.game.xTiles, this.game.yTiles, this.game.gridSize.w, this.game.gridSize.h);
                console.log(bombCoords)
                console.log(player);
                player.plantBomb(bombCoords[0], bombCoords[1], this.game.gridSize);
            }
        }

        //player 2
        if (input[65]) {
            for( var i = 0; i < this.game.players.length; i++){
                if(this.game.players[i].id==1) {
                    this.game.players[i].speedX += -1;
                }
            }
        }
        //d
        if (input[68]) {
            for( var i = 0; i < this.game.players.length; i++){
                if(this.game.players[i].id==1) {
                    this.game.players[i].speedX += 1;
                }
            }
        }
        //w
        if (input[87]) {
            for( var i = 0; i < this.game.players.length; i++){
                if(this.game.players[i].id==1) {
                    this.game.players[i].speedY += -1;
                }
            }
        }
        //s
        if (input[83]) {
            for( var i = 0; i < this.game.players.length; i++){
                if(this.game.players[i].id==1) {
                    this.game.players[i].speedY += 1;
                }
            }
        }

        if (input[48]) {
            var player;
            for( var i = 0; i < this.game.players.length; i++){
                if(this.game.players[i].id==1) {
                    player = this.game.players[i];
                    break;
                }
            }
            var hasBomb = false;
            var flag = false;
            var c = getGridPlayerPosition(player, this.game);

            for (var k = 0; k < this.game.players.length; k++) {
                for (var m = 0; m < this.game.players[k].bombs.length; m++) {
                    var p = getGridPlayerPosition(this.game.players[k].bombs[m], this.game);
                    if (c == p) {
                        flag = true;
                    }
                }
            }
            if (!flag) {
                var bombCoords = getGridTilePoint(c, this.game.xTiles, this.game.yTiles, this.game.gridSize.w, this.game.gridSize.h);
                player.plantBomb(bombCoords[0], bombCoords[1], this.game.gridSize);
            }
        }
    }


    // Update the animation conter
    this.updateAnimationCounter = function (animation) {
        // update to the next frame if it is time
        if (animation.counter == (animation.frameSpeed - 1))
            animation.currentFrame = (animation.currentFrame + 1) % animation.animationSequence.length;
        // update the counter
        animation.counter = (animation.counter + 1) % animation.frameSpeed;
    }

    this.updateGameStep = function () {
        if (this.game.gameRunning) {
            for (var i = 0; i < this.game.players.length; i++) {
                if (!this.game.players[i].alive && !this.game.players[i].removed) {
                    this.killPlayer(this.game.players[i]);
                    this.game.players[i].direction = 5;
                }
                if (this.game.players[i].alive) {
                    if (this.game.players[i] instanceof Bot) {
                        //get bot moves
                        var nextMove = this.game.players[i].botAI.getNextMove(this.game);
                        this.game.players[i].speedX = nextMove[0];
                        this.game.players[i].speedY = nextMove[1];
                        //wants to plant bomb
                        if (nextMove[2]) {
                            var c = getGridPlayerPosition(this.game.players[i], this.game);
                            var bombCoords = getGridTilePoint(c, this.game.xTiles, this.game.yTiles, this.game.gridSize.w,
                                this.game.gridSize.h);

                            var flag = false;
                            var p = getGridPlayerPosition(this.game.players[i], this.game);

                            for (var k = 0; k < this.game.players.length; k++) {
                                for (var m = 0; m < this.game.players[k].bombs.length; m++) {
                                    var c = getGridPlayerPosition(this.game.players[k].bombs[m], this.game);
                                    if (c == p) {
                                        flag = true;
                                    }
                                }
                            }
                            if (!flag) {
                                this.game.players[i].plantBomb(bombCoords[0], bombCoords[1], this.game.gridSize);
                            }
                        }
                    }
                    //calculate potential movement direction and adjust for lateral lines
                    // if movement is lateral, sqrt the value
                    var total = Math.abs(this.game.players[i].speedX) + Math.abs(this.game.players[i].speedY);
                    if (total != 0) {
                        var scalar = Math.sqrt(total) / total;
                        this.game.players[i].speedX *= (this.game.moveSize * scalar) * this.game.players[i].speed;
                        this.game.players[i].speedY *= (this.game.moveSize * scalar) * this.game.players[i].speed;
                    }
                    //check for collisions
                    this.checkForCollisions(this.game.players[i], this.game);

                    //update player animation
                    this.updateAnimationCounter(this.game.players[i].animations[this.game.players[i].direction]);
                    if (this.game.players[i] instanceof Bot) {
                        if (this.game.players[i].x == this.game.players[i].botAI.previousX &&
                            this.game.players[i].y == this.game.players[i].botAI.previousY) {
                            this.game.players[i].moving = false;
                        }
                    }
                }
            }

            //check if boxes have been destroyed
            for (var i = 0; i < this.game.destroyableArea.length; i++) {
                var desArea = this.game.destroyableArea[i];
                //update destroyable are animation
                this.updateAnimationCounter(desArea.sprite);
                if (desArea.triggered && !desArea.exploding) {
                    desArea.explode();
                }
                else if (desArea.exploded) {
                    this.game.destroyableArea.splice(this.game.destroyableArea.indexOf(desArea), 1);
                }

            }

            //check for all bombs and damage to players and surronding
            for (var i = 0; i < this.game.players.length; i++) {
                for (var j = 0; j < this.game.players[i].bombs.length; j++) {
                    this.updateAnimationCounter(this.game.players[i].bombs[j].sprite);
                    ///////////////////////////////////////////////////
                    var bombb = this.game.players[i].bombs[j];
                    bombb.update();
                    if (bombb.timer <= 0 && !bombb.exploding) {
                        bombb.explode();
                        this.game.bombSound.play();
                    }
                    //TODO restore this
                    else if (bombb.exploded) {
                        this.game.players[i].bombs.splice(this.game.players[i].bombs.indexOf(bombb), 1);
                        bombb.alive = false;
                    }
                    //login here to injure player/destroy wall
                    else if (bombb.exploding) {
                        for (var q = 0; q < bombb.fire.length; q++) {
                            if (bombb.fire[q] != null) {
                                //bombb.fire[q].update()
                                removeFlag = false;
                                for (var x = 0; x < this.game.players.length; x++) {
                                    if (getGridPosition(this.game.players[x], this.game) ==
                                        getGridPosition(bombb.fire[q], this.game)) {
                                        //window.alert("you died")
                                        //TODO restore this if
                                        if(this.game.players[x].godMode){
                                            continue;
                                        }
                                        this.game.players[x].alive = false
                                        this.game.players[x].direction = 5;
                                        //flag for removal of objects
                                        removeFlag = true;
                                    }
                                }

                                for (var x = 0; x < this.game.destroyableArea.length; x++) {
                                    if (bombb.fire[q] != null && !this.game.destroyableArea[x].triggered &&
                                        getGridPosition(this.game.destroyableArea[x], this.game) ==
                                        getGridPosition(bombb.fire[q], this.game)) {
                                        this.game.destroyableArea[x].triggered = true;
                                        //random perk
                                        var rand = Math.floor(Math.random() * 3);
                                        //odds of getting a perk
                                        var perkOdds = Math.random();
                                        if (perkOdds < 0.3) {
                                            this.game.perks.push(new Perk(this.game.destroyableArea[x].x,
                                                this.game.destroyableArea[x].y, this.game.context, this.game.gridSize, rand));
                                        }
                                        removeFlag = true;
                                    }
                                }

                                for (var x = 0; x < this.game.solidArea.length; x++) {
                                    if (getGridPosition(this.game.solidArea[x], this.game) ==
                                        getGridPosition(bombb.fire[q], this.game)) {
                                        removeFlag = true;
                                    }
                                }

                                if (removeFlag) {
                                    //set to null to keep positioning of all fires
                                    bombb.fire[q] = null;
                                    //bombb.fire.splice(bombb.fire.indexOf(bombb.fire[q]), 1)
                                }
                                if (bombb.fire[q] != null) {
                                    this.updateAnimationCounter(bombb.fire[q].sprite);
                                }
                            }
                        }

                    }

                }
            }

            //remove destroyed players
            var counter = 0;
            for (var i = 0; i < this.game.players.length; i++) {
                if (this.game.players[i].removed) {
                    counter++;
                    console.log(this.game.players, i)
                    this.game.players.splice(i, 1);
                    console.log(this.game.players)
                    return;
                }
            }
            //console.log(counter);

            //check if anyone still alive
            var counter = 0;
            if (this.game.players.length <= 1) {
                if (!this.gameFinished) {
                    this.gameFinished = true;
                    this.endGame();
                    return;
                }
            }
        }
    }

    this.endGame = function () {
        var self = this;
        setTimeout(function () {
            self.game.gameRunning = false;
            self.game.gameloopSound.stop();
            self.gameFinished = false;
            console.log("stopping game");
            //self.game = null;
        }, 1000)
    };

    this.killPlayer = function (player) {
        setTimeout(function () {
            player.removed = true;
            //console.log("getting rid of player")
        }, 1000)
    }

    this.checkForCollisions = function (player) {
        if (player.id === 0) {
        }
        //check for collisions here
        var moveX = true;
        var moveY = true;
        for (var i = 0; i < this.game.players.length; i++) {
            for (var j = 0; j < this.game.players[i].bombs.length; j++) {
                if (player.bombs.indexOf(this.game.players[i].bombs[j]) != -1) {
                    continue;
                }
                //test for bombs for each player
                var crash = this.crashWithRectangele(player, this.game.players[i].bombs[j]);
                if (crash == 0) {
                    player.speedY = Math.max(player.speedY, 0);
                }
                if (crash == 1) {
                    player.speedX = Math.min(player.speedX, 0);
                }
                if (crash == 2) {
                    player.speedY = Math.min(player.speedY, 0);
                }
                if (crash == 3) {
                    player.speedX = Math.max(player.speedX, 0);
                }
            }

            //skip if found itself
            if (player.id == this.game.players[i].id) {
                continue;
            }
            var crash = this.crashWithRectangele(player, this.game.players[i]);
            if (crash == 0) {
                player.speedY = Math.max(player.speedY, 0);
            }
            if (crash == 1) {
                player.speedX = Math.min(player.speedX, 0);
            }
            if (crash == 2) {
                player.speedY = Math.min(player.speedY, 0);
            }
            if (crash == 3) {
                player.speedX = Math.max(player.speedX, 0);
            }
        }

        for (var i = 0; i < this.game.destroyableArea.length; i++) {
            var crash = this.crashWithRectangele(player, this.game.destroyableArea[i]);
            if (crash == 0) {
                player.speedY = Math.max(player.speedY, 0);
            }
            if (crash == 1) {
                player.speedX = Math.min(player.speedX, 0);
            }
            if (crash == 2) {
                player.speedY = Math.min(player.speedY, 0);
            }
            if (crash == 3) {
                player.speedX = Math.max(player.speedX, 0);
            }
        }

        for (var i = 0; i < this.game.solidArea.length; i++) {
            var crash = this.crashWithRectangele(player, this.game.solidArea[i]);
            if (crash == 0) {
                player.speedY = Math.max(player.speedY, 0);
            }
            if (crash == 1) {
                player.speedX = Math.min(player.speedX, 0);
            }
            if (crash == 2) {
                player.speedY = Math.min(player.speedY, 0);
            }
            if (crash == 3) {
                player.speedX = Math.max(player.speedX, 0);
            }
        }

        for (var i = 0; i < this.game.perks.length; i++) {
            var crash = this.crashWithRectangele(player, this.game.perks[i]);
            if (crash >= 0) {
                //play sound
                this.game.powerupSound.play();
                player.addPerk(this.game.perks[i]);
                this.game.perks.splice(this.game.perks.indexOf(this.game.perks[i]), 1);
            }
        }


        this.updatePlayerLocation(player)
    }
    ;

    this.updatePlayerLocation = function (player) {
        player.x += player.speedX;
        player.y += player.speedY;

        //set player direction for animation
        if (player.speedX == 0 && player.speedY > 0) {
            player.direction = 1;
        }
        else if (player.speedX < 0 && player.speedY > 0) {
            player.direction = 2;
        }
        else if (player.speedX < 0 && player.speedY == 0) {
            player.direction = 3;
        }
        else if (player.speedX < 0 && player.speedY < 0) {
            player.direction = 4;
        }
        else if (player.speedX == 0 && player.speedY < 0) {
            player.direction = 5;
        }
        else if (player.speedX > 0 && player.speedY < 0) {
            player.direction = 6;
        }
        else if (player.speedX > 0 && player.speedY == 0) {
            player.direction = 7;
        }
        else if (player.speedX > 0 && player.speedY > 0) {
            player.direction = 8;
        }
        else player.direction = 0;
        //reset values
        player.speedX = 0;
        player.speedY = 0;
    }

    this.crashWithRectangele = function (player, otherobj) {
        var mytop = (player.y + player.speedY) + (player.size.h / 3)
        var mybottom = player.y + player.speedY + (player.size.h) - (player.size.h / 3);
        var myleft = (player.x + player.speedX) + (player.size.w / 3);
        var myright = player.x + player.speedX + (player.size.w) - (player.size.w / 3);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.size.h);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.size.w);
        if (
            (myright <= otherleft) ||
            (myleft >= otherright) ||
            (mybottom <= othertop) ||
            (mytop >= otherbottom)) {
        }
        else {
            var l = Math.abs(myleft - otherright);
            var r = Math.abs(myright - otherleft);
            var t = Math.abs(mytop - otherbottom);
            var b = Math.abs(mybottom - othertop);
            var min = Math.min(l, r, t, b);

            if (t == min) {
                return 0;
            }
            if (r == min) {
                return 1;
            }
            if (b == min) {
                return 2;
            }
            if (l == min) {
                return 3;
            }
            return -1;
        }
    };

    this.crashWithCircle = function (player, otherobj) {
        var mytop = player.y;
        var mybottom = player.y + player.speedY + (player.size.h);
        var myleft = player.x + player.speedX;
        var myright = player.x + player.speedX + (player.size.w);
        var othertop = otherobj.y - (otherobj.radius);
        var otherbottom = otherobj.y + (otherobj.radius);
        var otherleft = otherobj.x - (otherobj.radius);
        var otherright = otherobj.x + (otherobj.radius);
        //var crash = -1
        if (
            (myright <= otherleft) ||
            (myleft >= otherright) ||
            (mybottom <= othertop) ||
            (mytop >= otherbottom)) {
        }
        else {
            var l = Math.abs(myleft - otherright);
            var r = Math.abs(myright - otherleft);
            var t = Math.abs(mytop - otherbottom);
            var b = Math.abs(mybottom - othertop);
            var min = Math.min(l, r, t, b);

            if (t == min) {
                return 0;
            }
            if (r == min) {
                return 1;
            }
            if (b == min) {
                return 2;
            }
            if (l == min) {
                return 3;
            }
            return -1;
        }
    }


}