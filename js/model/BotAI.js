/**
 * Created by rai on 08/05/16.
 */
function BotAI(player, difficulty) {
    this.game;
    this.player = player;
    this.difficulty = difficulty;
    //stack of targets
    this.targets = [];
    this.running = false;
    this.init = function (game){
        this.game = game;
        for(var i=0; i < game.players.length; i++){
            if(this.player.id!=game.players[i].id) {
                this.targets.push(game.players[i]);
            }
        }
    }

    this.getNextMove = function (game){
        //check if target destroyed
        if (this.targets[this.targets.length - 1] == null || this.targets[this.targets.length - 1].alive == false) {
            this.targets.splice(this.targets.indexOf(this.targets[this.targets.length - 1]), 1);
        }

        //accuire new tar
        if (this.targets.length == 0) {
            this.getNewTarget(game);
        }
        return this.moveToTarget(game);
    }

    this.getNewTarget = function (game) {

    }

    this.getNearDestroyableObject = function(game) {
        for (var i = 0; i < game.destroyableArea.length; i++) {
            if(getGridPlayerPosition(this.player, game)%game.xTiles==0){
                if ((getGridPlayerPosition(this.player, game)+game.xTiles == getGridPosition(game.destroyableArea[i], game))||
                    (getGridPlayerPosition(this.player, game)-game.xTiles == getGridPosition(game.destroyableArea[i], game))||
                    (getGridPlayerPosition(this.player, game)+1 == getGridPosition(game.destroyableArea[i], game))){
                    return true;
                }
            }
            else if(getGridPlayerPosition(this.player, game)%game.xTiles==game.xTiles-1){
                if ((getGridPlayerPosition(this.player, game)+game.xTiles == getGridPosition(game.destroyableArea[i], game))||
                    (getGridPlayerPosition(this.player, game)-game.xTiles == getGridPosition(game.destroyableArea[i], game))||
                    (getGridPlayerPosition(this.player, game)-1 == getGridPosition(game.destroyableArea[i], game))){
                    return true;
                }
            }
            else{
                if ((getGridPlayerPosition(this.player, game) == getGridPosition(game.destroyableArea[i], game)||
                    (getGridPlayerPosition(this.player, game)+game.xTiles == getGridPosition(game.destroyableArea[i], game))||
                    (getGridPlayerPosition(this.player, game)-game.xTiles == getGridPosition(game.destroyableArea[i], game))||
                    (getGridPlayerPosition(this.player, game)+1 == getGridPosition(game.destroyableArea[i], game))||
                    (getGridPlayerPosition(this.player, game)-1 == getGridPosition(game.destroyableArea[i], game)))){
                    return true;
                }
            }
        }
        return false;
    }

    this.moveToTarget = function (game) {
        var speedX = 0;
        var speedY = 0;
        for (var i = 0; i < game.players.length; i++) {
            for (var j = 0; j < game.players[i].bombs.length; j++) {
                if ((Math.abs(this.player.x - game.players[i].bombs[j].x) < game.players[i].bombs[j].power * game.gridSize.w * 2.5) &&
                    (Math.abs(this.player.y - game.players[i].bombs[j].y) < game.players[i].bombs[j].power * game.gridSize.h * 2.5)) {
                    this.running = true;
                    if (this.player.x - game.players[i].bombs[j].x > 0) {
                        speedX += 1;
                    }
                    else if (this.player.x - game.players[i].bombs[j].x < 0) {
                        speedX -= 1;
                    }
                    if (this.player.y - game.players[i].bombs[j].y > 0) {
                        speedY += 1;
                    }
                    else if (this.player.y - game.players[i].bombs[j].y < 0) {
                        speedY -= 1;
                    }
                }
            }
        }


        var result = []

        var lastElement = this.targets[this.targets.length - 1]
        if (speedX == 0 && speedY == 0) {

            if (this.player.x < lastElement.x) {
                result.push(1)
            }
            else if (this.player.x > lastElement.x) {
                result.push(-1)
            }
            if (this.player.y < lastElement.y) {
                result.push(1)
            }
            else if (this.player.y > lastElement.y) {
                result.push(-1)
            }
        }
        else {
            result.push(speedX);
            result.push(speedY);
        }

        //plant bomb if near target
        if(this.getNearDestroyableObject(game)){
            result.push(true);
        }

        else if (Math.abs(this.player.x - lastElement.x) < this.player.size.w * 1.4 && Math.abs(this.player.y - lastElement.y) < this.player.size.h * 1.4) {
            result.push(true);
        }
        else result.push(false);
        return result;
    }

    this.hasBombInRange = function (game) {
        for (var i = 0; i < game.bombs.length; i++) {
            var speedX;
            var speedY;
            if (Math.abs(game.bombs[i].x - this.player.x) < game.bombs[i].power * game.gridSize.w) {
                if (game.bombs[i].x - this.player.x > 0) {
                    speedX += 1;
                }
                else if (game.bombs[i].x - this.player.x > 0) {
                    speedX -= 1;
                }
            }

            if (Math.abs(game.bombs[i].y - this.player.y) < game.bombs[i].power * game.gridSize.w) {
                if (game.bombs[i].y - this.player.y > 0) {
                    speedX += 1;
                }
                else if (game.bombs[i].y - this.player.y > 0) {
                    speedX -= 1;
                }
            }
        }

    }
    this.canGetToTile = function () {
        return true;
    }
}