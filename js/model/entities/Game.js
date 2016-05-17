/**
 * Created by rai on 07/03/16.
 */
//init variables
//init game canvas object
function Game(canvas) {
    this.canvas = canvas;
    this.mapsize;
    this.xTiles;
    this.yTiles;
    this.gridSize = {
        w: 48,
        h: 48,
    };
    this.playerSize = {
        w: 48,
        h: 48,
    };
    this.players = [];
    this.destroyableArea = [];
    this.solidArea = [];
    this.tiles = [];
    this.perks = [];
    //set up initial configuration
    this.moveSize = 1;   //number of pixels an object is moved by by a single press of a button
    this.id = 0;
    //get canvas
    this.bombSound = null;
    this.powerupSound = null;
    this.gameloopSound = null;
    this.gameRunning = false;
    this.playerCount;
    this.gameSize;

    this.context = this.canvas.getContext("2d");

    this.setPlayerCount = function (count) {
        this.playerCount = count;
    }
    this.setGameSize = function (size) {
        this.gameSize = size;
        if (size == 2 || size == 4) {
            this.xTiles = 15;
            this.yTiles = 11;
        }
        if (size == 20) {
            this.xTiles = 25;
            this.yTiles = 17;
        }
    }

    this.init = function () {
        //set flag

        //load sounds
        this.bombSound = new Sound("/pureBomberman/sound/bombExplosion.wav");
        this.powerupSound = new Sound("/pureBomberman/sound/powerUp.wav");
        this.gameloopSound = new Sound("/pureBomberman/sound/gameloop_normal.mp3");
        this.gameloopSound.setRepeat(true);
        //this.gameloopSound.play();
        this.canvas.width = this.gridSize.w * this.xTiles;
        this.canvas.height = this.gridSize.h * this.yTiles;
        //init map

        //paint in grid
        for (var i = 0; i < this.xTiles; i++) {
            for (var j = 0; j < this.yTiles; j++) {
                this.tiles.push(new Tile(this.context, this.id++, i * this.gridSize.w, j * this.gridSize.w, this.gridSize));
            }
        }
        //create grid border
        //horizontal
        for (var i = 0; i < this.xTiles; i++) {
            this.solidArea.push(new SolidArea(this.context, this.id++, i * this.gridSize.w, 0, this.gridSize));
            this.solidArea.push(new SolidArea(this.context, this.id++, i * this.gridSize.w, this.canvas.height - this.gridSize.h, this.gridSize));
        }
        //vertical
        for (var j = 1; j < this.yTiles - 1; j++) {
            this.solidArea.push(new SolidArea(this.context, this.id++, 0, j * this.gridSize.h, this.gridSize));
            this.solidArea.push(new SolidArea(this.context, this.id++, this.canvas.width - this.gridSize.w, j * this.gridSize.h, this.gridSize));
        }

        //init players
        var player0 = new Player(this.context, this.id++, this.gridSize.w, this.gridSize.h, this.playerSize);
        this.players.push(player0)

        if (this.playerCount == 1) {
            var player1 = new Bot(this.context, this.id++, (this.xTiles - 1) * this.gridSize.w -
                this.playerSize.w, (this.yTiles - 1) * this.gridSize.h - this.playerSize.h, this.playerSize, 0);
            player1.botAI.init(this);
            this.players.push(player1)
        }
        else if (this.playerCount == 2) {
            var player2 = new Player(this.context, this.id++, (this.xTiles - 1) * this.gridSize.w -
                this.playerSize.w, (this.yTiles - 1) * this.gridSize.h - this.playerSize.h, this.playerSize);
            this.players.push(player2)
        }

        //add bots if necassary

        if (this.gameSize == 4) {
            var player3 = new Bot(this.context, this.id++, this.gridSize.w, (this.yTiles - 1) * this.gridSize.h - this.playerSize.h, this.playerSize, 0);
            player3.botAI.init(this);
            this.players.push(player3);
            var player4 = new Bot(this.context, this.id++, (this.xTiles - 1) * this.gridSize.w - this.playerSize.w, this.gridSize.h,
                this.playerSize, 0);
            player4.botAI.init(this);
            this.players.push(player4)
        }

        else if (this.gameSize == 20) {
            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 4; j++) {
                    if (i == 0 && j == 0 || i == 5 && j == 3) {
                        continue;
                    }
                    var bot = new Bot(this.context, this.id++,
                        i * 4 * this.gridSize.w + 1 * this.gridSize.w,
                        j * 4 * this.gridSize.h + 1 * this.gridSize.h, this.gridSize,
                        this.playerSize, 0);

                    bot.botAI.init(this);
                    this.players.push(bot)
                    if (i == 0 && j == 0) {
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                    }
                    else if (i == 0 && j == 3) {
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 1 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 3 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));

                    }
                    else if (i == 5 && j == 0) {

                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 1 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 3 * this.gridSize.h, this.gridSize));
                    }
                    else if (i == 5 && j == 3) {
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));

                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 1 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 3 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 1 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 3 * this.gridSize.h, this.gridSize));
                    }
                    else if (i == 0) {
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 1 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 3 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                    }
                    else if (i == 5) {
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 1 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 3 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 1 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 3 * this.gridSize.h, this.gridSize));
                    }
                    else if (j == 0) {

                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 1 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 3 * this.gridSize.h, this.gridSize));
                    }
                    else if (j == 3) {
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));

                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 1 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 3 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 1 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 3 * this.gridSize.h, this.gridSize));
                    }
                    else {
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w,
                            j * 4 * this.gridSize.h, this.gridSize));
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                        this.solidArea.push(new SolidArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 2 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 2 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 1 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 3 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 0 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 1 * this.gridSize.h, this.gridSize));
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++,
                            i * 4 * this.gridSize.w + 0 * this.gridSize.w,
                            j * 4 * this.gridSize.h + 3 * this.gridSize.h, this.gridSize));

                    }
                }
            }
        }
        if (this.gameSize != 20) {
            //maze
            //grid
            for (var i = 1; i < this.xTiles - 2; i++) {
                for (var j = 1; j < this.yTiles - 2; j++) {
                    if (j % 2 == 0 && i % 2 == 0) {
                        this.solidArea.push(new SolidArea(this.context, this.id++, i * this.gridSize.w, j * this.gridSize.h, this.gridSize));
                    }
                }
            }

            for (var i = 1; i < this.xTiles - 1; i++) {
                for (var j = 1; j < this.yTiles - 1; j++) {
                    if (i == 1 && j == 1 ||
                        i == 1 && j == 2 ||
                        i == 1 && j == 3 ||
                        i == 2 && j == 1 ||
                        i == 2 && j == 3 ||
                        i == 3 && j == 1 ||
                        i == 3 && j == 2 ||
                        i == 3 && j == 3 ||
                        i == this.xTiles - 2 && j == this.yTiles - 2 ||
                        i == this.xTiles - 2 && j == this.yTiles - 3 ||
                        i == this.xTiles - 2 && j == this.yTiles - 4 ||

                        i == this.xTiles - 3 && j == this.yTiles - 2 ||
                        i == this.xTiles - 3 && j == this.yTiles - 4 ||

                        i == this.xTiles - 4 && j == this.yTiles - 2 ||
                        i == this.xTiles - 4 && j == this.yTiles - 3 ||
                        i == this.xTiles - 4 && j == this.yTiles - 4 ||

                        i == 1 && j == this.yTiles - 2 ||
                        i == 1 && j == this.yTiles - 3 ||
                        i == 1 && j == this.yTiles - 4 ||

                        i == 2 && j == this.yTiles - 2 ||
                        i == 2 && j == this.yTiles - 4 ||

                        i == 3 && j == this.yTiles - 2 ||
                        i == 3 && j == this.yTiles - 3 ||
                        i == 3 && j == this.yTiles - 4 ||

                        i == this.xTiles - 2 && j == 1 ||
                        i == this.xTiles - 2 && j == 2 ||
                        i == this.xTiles - 2 && j == 3 ||

                        i == this.xTiles - 3 && j == 1 ||
                        i == this.xTiles - 3 && j == 3 ||

                        i == this.xTiles - 4 && j == 1 ||
                        i == this.xTiles - 4 && j == 2 ||
                        i == this.xTiles - 4 && j == 3


                    ) {

                    }
                    else if (j % 2 == 1 || i % 2 == 1) {
                        this.destroyableArea.push(new DestroyableArea(this.context, this.id++, this.gridSize.w * i, this.gridSize.h * j, this.gridSize))
                    }
                }
            }

        }

        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i] instanceof Bot) {
                this.players[i].botAI.init(this);
            }
        }

        this.gameRunning = true;
    }

    this.reset = function () {

    }
    this.stop = function () {
        clearInterval(this.interval);
    }
}