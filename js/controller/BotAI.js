/**
 * Created by rai on 08/05/16.
 */
function BotAI(player, difficulty) {
    this.previousX;
    this.previousY;
    this.moving = false;
    this.game;
    this.player = player;
    this.difficulty = difficulty;
    //stack of targets
    this.targets = [];
    this.path;
    this.gameGraph;
    this.escaping = false;
    this.dangerBombs = []
    this.running = false;
    this.escapePath;

    this.init = function (game) {
        this.game = game;
        var shufPLayers = getShuffle(game.players);
        for (var i = 0; i < shufPLayers.length; i++) {
            var player = shufPLayers[i];
            if (this.player.id != player.id) {
                this.targets.push(player);
            }
        }
    };

    this.createGraphFromMap = function (game) {
        var graphArray = [];
        //fill graph with all ones
        for (var i = 0; i < game.xTiles; i++) {
            graphArray[i] = [];
            for (var j = 0; j < game.yTiles; j++) {
                graphArray[i][j] = 1;
            }
        }
        for (var i = 0; i < game.solidArea.length; i++) {
            var x = getXfromPosition(getGridPlayerPosition(this.game.solidArea[i], game), game.xTiles);
            var y = getYfromPosition(getGridPlayerPosition(this.game.solidArea[i], game), game.xTiles);
            graphArray[x][y] = 0;
        }
        for (var i = 0; i < game.destroyableArea.length; i++) {
            var x = getXfromPosition(getGridPlayerPosition(game.destroyableArea[i], game), game.xTiles);
            var y = getYfromPosition(getGridPlayerPosition(game.destroyableArea[i], game), game.xTiles);
            graphArray[x][y] = 10;
        }
        for (var i = 0; i < game.players.length; i++) {
            for (var j = 0; j < game.players[i].bombs.length; j++) {
                var x = getXfromPosition(getGridPlayerPosition(game.players[i].bombs[j], game), game.xTiles);
                var y = getYfromPosition(getGridPlayerPosition(game.players[i].bombs[j], game), game.xTiles);
                graphArray[x][y] = 0;
            }
        }
        for (var i = 0; i < game.players.length; i++) {
            for (var j = 0; j < game.players[i].bombs.length; j++) {
                var x = getXfromPosition(getGridPlayerPosition(game.players[i].bombs[j], game), game.xTiles);
                var y = getYfromPosition(getGridPlayerPosition(game.players[i].bombs[j], game), game.xTiles);
                graphArray[x][y] = 0;
                for (var k = 0; k < game.players[i].bombs[j].fire.length; k++) {
                    if (game.players[i].bombs[j].fire[k] != null) {
                        var x = getXfromPosition(getGridPlayerPosition(game.players[i].bombs[j].fire[k], game), game.xTiles);
                        var y = getYfromPosition(getGridPlayerPosition(game.players[i].bombs[j].fire[k], game), game.xTiles);
                        graphArray[x][y] = 0;
                    }
                }
            }
        }

        var graph = new Graph(graphArray, {diagonal: false});
        return graph;
    };


    this.createGraphFromMapForEscape = function (game) {
        var graphArray = [];
        //fill graph with all ones
        for (var i = 0; i < game.xTiles; i++) {
            graphArray[i] = [];
            for (var j = 0; j < game.yTiles; j++) {
                graphArray[i][j] = 1;
            }
        }
        for (var i = 0; i < game.solidArea.length; i++) {
            var x = getXfromPosition(getGridPlayerPosition(this.game.solidArea[i], game), game.xTiles);
            var y = getYfromPosition(getGridPlayerPosition(this.game.solidArea[i], game), game.xTiles);
            graphArray[x][y] = 0;
        }
        //cant blow up walls when running
        for (var i = 0; i < game.destroyableArea.length; i++) {
            var x = getXfromPosition(getGridPlayerPosition(game.destroyableArea[i], game), game.xTiles);
            var y = getYfromPosition(getGridPlayerPosition(game.destroyableArea[i], game), game.xTiles);
            graphArray[x][y] = 0;
        }
        //players can get in the way
        for (var i = 0; i < game.players.length; i++) {
            var x = getXfromPosition(getGridPlayerPosition(game.players[i], game), game.xTiles);
            var y = getYfromPosition(getGridPlayerPosition(game.players[i], game), game.xTiles);
            graphArray[x][y] = 0;
            for (var j = 0; j < game.players[i].bombs.length; j++) {
                var x = getXfromPosition(getGridPlayerPosition(game.players[i].bombs[j], game), game.xTiles);
                var y = getYfromPosition(getGridPlayerPosition(game.players[i].bombs[j], game), game.xTiles);

                graphArray[x][y] = 0;
                for (var k = 0; k < game.players[i].bombs[j].fire.length; k++) {
                    if (game.players[i].bombs[j].fire[k] != null) {
                        var x = getXfromPosition(getGridPlayerPosition(game.players[i].bombs[j].fire[k], game), game.xTiles);
                        var y = getYfromPosition(getGridPlayerPosition(game.players[i].bombs[j].fire[k], game), game.xTiles);
                        graphArray[x][y] = 0;
                    }
                }
            }
        }

        var graph = new Graph(graphArray, {diagonal: false});
        return graph;
    };


    this.findPath = function (graphArray, startObj, endObj, searchType) {
        //console.log(searchType)
        var startX = getXfromPosition(getGridPlayerPosition(startObj, this.game), this.game.xTiles);
        var startY = getYfromPosition(getGridPlayerPosition(startObj, this.game), this.game.xTiles);
        var start = graphArray.grid[startX][startY];

        var endX = getXfromPosition(getGridPlayerPosition(endObj, this.game), this.game.xTiles);
        var endY = getYfromPosition(getGridPlayerPosition(endObj, this.game), this.game.xTiles);
        var end = graphArray.grid[endX][endY];
        var r = astar.search(graphArray, start, end, searchType);
        return r;
    };

    this.getNextMove = function (game) {
        this.previousX = this.player.x;
        this.previousY = this.player.y;
        //check if target destroyed
        if (this.targets[this.targets.length - 1] == null || this.targets[this.targets.length - 1].alive == false) {
            this.targets.splice(this.targets.indexOf(this.targets[this.targets.length - 1]), 1);
            this.escaping = false;
        }
        //if no targets, game is over, don't do anything
        if (this.targets.length == 0) {
            console.log("end of targets");
            return [0,0,false];
        }
        //check if need to flee from bomb
        if (!this.escaping) {
            for (var i = 0; i < this.game.players.length; i++) {
                for (var j = 0; j < this.game.players[i].bombs.length; j++) {
                    if ((Math.abs(this.player.x - this.game.players[i].bombs[j].x) < this.game.players[i].bombs[j].power * this.game.gridSize.w * 2.5) &&
                        (Math.abs(this.player.y - this.game.players[i].bombs[j].y) < this.game.players[i].bombs[j].power * this.game.gridSize.h * 2.5)) {
                        var bomb = this.game.players[i].bombs[j];
                        this.dangerBombs.push(bomb);
                        //console.log(this.dangerBombs);
                        //in the range of a bomb
                        //check grid around escaping border
                        var bestEscape = [];
                        var g = getGridPlayerPosition(this.player, this.game)
                        var playerGridX = getXfromPosition(g, this.game.xTiles);
                        var playerGridY = getYfromPosition(g, this.game.xTiles);
                        for (var k = 0; k < game.tiles.length; k++) {
                            var g = getGridPlayerPosition(game.tiles[k], this.game);
                            var objectGridX = getXfromPosition(g, this.game.xTiles);
                            var objectGridY = getYfromPosition(g, this.game.xTiles);
                            if (bomb.power == 1) {
                                if (((playerGridX - 2) == (objectGridX) && (playerGridY - 2) <= (objectGridY) && (playerGridY + 2) >= (objectGridY)) ||
                                    ((playerGridX + 2) == (objectGridX) && (playerGridY - 2) <= (objectGridY) && (playerGridY + 2) >= (objectGridY)) ||
                                    ((playerGridY - 2) == (objectGridY) && (playerGridX - 2) <= (objectGridX) && (playerGridX + 2) >= (objectGridX)) ||
                                    ((playerGridY + 2) == (objectGridY) && (playerGridX - 2) <= (objectGridX) && (playerGridX + 2) >= (objectGridX))
                                ) {
                                    var path = this.getPathToTarget(game.tiles[k], this.createGraphFromMapForEscape(game), {heuristic: astar.heuristics.manhattan});
                                    //for first found result
                                    if (bestEscape.length == 0 && path.length > 0) {
                                        bestEscape = path;
                                    }
                                    //else look for shorter path
                                    else if (bestEscape.length < path.length) {
                                        bestEscape = path;
                                    }
                                }
                            }
                            else if (bomb.power == 2) {
                                if (((playerGridX - 3) == (objectGridX) && (playerGridY - 3) <= (objectGridY) && (playerGridY + 3) >= (objectGridY)) ||
                                    ((playerGridX + 3) == (objectGridX) && (playerGridY - 3) <= (objectGridY) && (playerGridY + 3) >= (objectGridY)) ||
                                    ((playerGridY - 3) == (objectGridY) && (playerGridX - 3) <= (objectGridX) && (playerGridX + 3) >= (objectGridX)) ||
                                    ((playerGridY + 3) == (objectGridY) && (playerGridX - 3) <= (objectGridX) && (playerGridX + 3) >= (objectGridX))
                                ) {
                                    var path = this.getPathToTarget(game.tiles[k], this.createGraphFromMapForEscape(game), {heuristic: astar.heuristics.manhattan});
                                    //for first found result
                                    if (bestEscape.length == 0 && path.length > 0) {
                                        bestEscape = path;
                                    }
                                    //else look for shorter path
                                    else if (bestEscape.length < path.length) {
                                        bestEscape = path;
                                    }
                                }
                            }
                            else if (bomb.power == 3) {
                                if (((playerGridX - 4) == (objectGridX) && (playerGridY - 4) <= (objectGridY) && (playerGridY + 4) >= (objectGridY)) ||
                                    ((playerGridX + 4) == (objectGridX) && (playerGridY - 4) <= (objectGridY) && (playerGridY + 4) >= (objectGridY)) ||
                                    ((playerGridY - 4) == (objectGridY) && (playerGridX - 4) <= (objectGridX) && (playerGridX + 4) >= (objectGridX)) ||
                                    ((playerGridY + 4) == (objectGridY) && (playerGridX - 4) <= (objectGridX) && (playerGridX + 4) >= (objectGridX))
                                ) {
                                    var path = this.getPathToTarget(game.tiles[k], this.createGraphFromMapForEscape(game), {heuristic: astar.heuristics.manhattan});
                                    //for first found result
                                    if (bestEscape.length == 0 && path.length > 0) {
                                        bestEscape = path;
                                    }
                                    //else look for shorter path
                                    else if (bestEscape.length < path.length) {
                                        bestEscape = path;
                                    }
                                }
                            }

                        }
                        //this.targets.push(bestEscape);
                        //console.log(bestEscape);
                        this.escapePath = bestEscape;
                        this.escaping = true;
                        this.moving = true;
                        return this.moveToTarget(this.escapePath, game);
                    }
                }

            }
            //return this.moveToTarget(this.path, game);
        }
        //console.log(this.moving);

        //path has been found and the bot is moving in the right direction
        if (!this.escaping && this.moving) {
            return this.moveToTarget(this.path, game);
        }
        if (this.escaping && this.moving) {
            return this.moveToTarget(this.escapePath, game);
        }
        if (this.escaping && !this.moving) {
            //console.log(this.escapePath);
            //console.log(this.escapePath);
            //not moving so must have reached the target, so remove it
            this.escapePath.splice(this.escapePath.indexOf(this.escapePath[0]), 1);
            if (this.escapePath.length == 0) {
                //console.log(this.dangerBombs[this.dangerBombs.length - 1])
                if (!this.dangerBombs[this.dangerBombs.length - 1].alive) {
                    //console.log("removing somethin")
                    this.dangerBombs.splice(this.dangerBombs.indexOf(this.dangerBombs[this.dangerBombs.length - 1]), 1);
                }
                //we have escaped the bomb, now wait for it to go off
                if (this.dangerBombs.length > 0) {
                    //console.log("running hi hi");
                    return [0, 0, false];
                }
                else {
                    this.escaping = false;
                    this.moving = false;
                    return this.moveToTarget(this.path, game);
                }
            }
            else {
                this.moving = true;
                //console.log("moving to target")
                return this.moveToTarget(this.escapePath, game);
            }
        }
        //mini target reached
        if (!this.moving && !this.escaping) {
            //recalculate path to enemy target
            this.path = this.getPathToTarget(this.targets[this.targets.length - 1], this.createGraphFromMap(game), {heuristic: astar.heuristics.manhattan});
            //console.log(this.targets[this.targets.length - 1]);
            //console.log(this.path);
            //cant reach target, so find a box and blow it up
            if (this.path.length == 0) {
                //console.log("shouldnt have happened");
                return [0, 0, false];
            }
            //target can be reached, so move towards it
            else {
                this.moving = true;
                return this.moveToTarget(this.path, game);
            }
        }
    };

    this.getPathToTarget = function (target, gameGraph, searchType) {
        var g = getGridPlayerPosition(this.player, this.game)
        var playerGridX = getXfromPosition(g, this.game.xTiles);
        var playerGridY = getYfromPosition(g, this.game.xTiles);
        var path = this.findPath(gameGraph, this.player, target, searchType);
        return path;
    };

    this.moveToTarget = function (path, game) {
        if (path.length == 0) {
            return [0, 0, false];
        }
        //path[0] = {x:11, y:9}
        var target = path[0];
        var speedX = 0;
        var speedY = 0;
        var playerX = Math.floor(this.player.x + this.player.size.w / 2)
        var playerY = Math.floor(this.player.y + this.player.size.h / 2)

        var targetX = Math.floor(target.x * this.game.gridSize.w + this.game.gridSize.w / 2);
        var targetY = Math.floor(target.y * this.game.gridSize.h + this.game.gridSize.h / 2);

        //console.log(playerX, playerY, targetX, targetX);
        //escape bombs if in range


        var result = []
        //move player based on previous rules
        {
            if (playerX < targetX - 5) {
                result.push(1)
            }
            else if (playerX > targetX + 5) {
                result.push(-1)
            }
            else if (playerX <= targetX + 5 && playerX >= targetX - 5) {
                result.push(0);
            }
            if (playerY < targetY - 10) {
                result.push(1)
            }
            else if (playerY > targetY + 10) {
                result.push(-1)
            }
            else if (playerY <= targetY + 10 && playerY >= targetY - 10) {
                result.push(0);
            }
            //target is reached
            if (result[0] == 0 && result[1] == 0) {
                this.moving = false;
            }
            //plant bomb if near target

            //todo

            if (!this.escaping && this.getNearDestroyableObject(path, game)) {
                result.push(true);
            }
            else result.push(false);
        }
        return result;
    };


    this.getNearDestroyableObject = function (path, game) {
        if (path.length == 0) {
            return false;
        }
        var playerTileGridPos = getGridPlayerPosition(this.player, game);
        var playerX = getXfromPosition(playerTileGridPos, game.xTiles);
        var playerY = getYfromPosition(playerTileGridPos, game.xTiles);

        for (var i = 0; i < game.destroyableArea.length; i++) {
            var tileGridPos = getGridPlayerPosition(game.destroyableArea[i], game);
            var objectX = getXfromPosition(tileGridPos, game.xTiles);
            var objectY = getYfromPosition(tileGridPos, game.xTiles);

            if(path.length>=2) {
                if ((objectX == path[0].x && objectY == path[0].y) ||
                    (objectX == path[1].x && objectY == path[1].y &&
                    playerX == path[0].x && playerY == path[0].y)
                ) {
                    //console.log(objectX, objectY, path);
                    return true;
                }
            }
            else if(path.length==1){
                if ((objectX == path[0].x && objectY == path[0].y)
                ) {
                    return true;
                }
            }
        }
        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].id == this.player.id) {
                continue;
            }
            var tileGridPos = getGridPlayerPosition(game.players[i], game);
            var objectX = getXfromPosition(tileGridPos, game.xTiles);
            var objectY = getYfromPosition(tileGridPos, game.xTiles);
            if(path.length>=2) {
                if ((objectX == path[0].x && objectY == path[0].y) ||
                    (objectX == path[1].x && objectY == path[1].y &&
                    playerX == path[0].x && playerY == path[0].y)
                ) {
                    //console.log(objectX, objectY, path);
                    return true;
                }
            }
            else if(path.length==1){
                if ((objectX == path[0].x && objectY == path[0].y)
                ) {
                    return true;
                }
            }
        }
        return false;
    };


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

    };

    this.canGetToTile = function () {
        return true;
    };
}