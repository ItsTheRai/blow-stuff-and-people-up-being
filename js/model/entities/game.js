/**
 * Created by rai on 07/03/16.
 */
//init variables
//init game canvas object
function Game(canvas, difficulty, mapsize, players) {
    this.mapsize = mapsize;
    this.xTiles = this.mapsize.xTiles;
    this.yTiles = this.mapsize.yTiles;
    this.gridSize = {
        w: 32,
        h: 32,
    };
    this.playerSize = {
        w: 38,
        h: 38,
    };
    this.players = players;
    this.destroyableArea = [];
    this.solidArea = [];
    this.tiles = [];
    this.perks = [];
    //set up initial configuration
    this.moveSize = 2;   //number of pixels an object is moved by by a single press of a button
    this.id = 0;
    //get canvas
    this.canvas = canvas;
    this.bombSound = null;
    this.powerupSound = null;
    this.gameloopSound = null;
    this.gameRunning = false;

    this.initGame = function () {
        //set flag
        this.gameRunning = true;
        //load sounds
        this.bombSound = new Sound("/pureBomberman/sound/bombExplosion.wav");
        this.powerupSound = new Sound("/pureBomberman/sound/powerUp.wav");
        this.gameloopSound = new Sound("/pureBomberman/sound/gameloop_normal.mp3");
        this.gameloopSound.setRepeat(true);
        this.gameloopSound.play();
        this.canvas.width = this.gridSize.w * this.xTiles;
        this.canvas.height = this.gridSize.h * this.yTiles;
        this.context = this.canvas.getContext("2d");

        //this.players.push(player2)
        //create grid border
        //paint in grid
        for (var i = 0; i < this.xTiles; i++) {
            for (var j = 0; j < this.yTiles; j++) {
                this.tiles.push(new Tile(this.context, this.id++, i * this.gridSize.w, j * this.gridSize.w, this.gridSize));
            }
        }
        //great border
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


        //if(this.gameMode==0){
        //maze grid
        for (var i = 7; i < this.xTiles; i++) {
            for (var j = 7; j < this.yTiles; j++) {
                if (j % 2 == 0 && i % 2 == 0) {
                    this.solidArea.push(new SolidArea(this.context, this.id++, i * this.gridSize.w, j * this.gridSize.h, this.gridSize));
                }
            }
            if (i % 2 === 1) {
                //this.solidArea.push(new SolidArea(this.context, this.id++, i * this.gridWidth, j * this.gridHeight, this.gridWidth, this.gridHeight))
            }
        }

        //destroyable area
        this.destroyableArea.push(new DestroyableArea(this.context, this.id++, this.gridSize.w * 5, this.gridSize.h * 5, this.gridSize));
        this.destroyableArea.push(new DestroyableArea(this.context, this.id++, this.gridSize.w * 5, this.gridSize.h * 7, this.gridSize));
        this.destroyableArea.push(new DestroyableArea(this.context, this.id++, this.gridSize.w * 5, this.gridSize.h * 9, this.gridSize));
    }

        this.stop = function () {
            clearInterval(this.interval);
        }
}