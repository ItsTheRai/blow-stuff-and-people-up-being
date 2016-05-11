/**
 * Created by rai on 07/03/16.
 */
//init variables
//init game canvas object
function Game(canvas, difficulty) {
    this.mapsize;// = mapsize;
    this.xTiles;// = this.mapsize.xTiles;
    this.yTiles;// = this.mapsize.yTiles;
    this.gridSize = {
        w: 32,
        h: 32,
    };
    this.playerSize = {
        w: 38,
        h: 38,
    };
    this.players = [];// = players;
    this.destroyableArea = [];
    this.solidArea = [];
    this.tiles = [];
    this.perks = [];
    //set up initial configuration
    this.moveSize = 1;   //number of pixels an object is moved by by a single press of a button
    this.id = 0;
    //get canvas
    this.canvas = canvas;
    this.bombSound = null;
    this.powerupSound = null;
    this.gameloopSound = null;
    this.gameRunning = false;
    this.playerCount;
    this.gameSize;

    this.context = this.canvas.getContext("2d");

    console.log("aa", this.canvas.width)
    this.setPlayerCount = function(count){
        this.playerCount=count;
    }
    this.setGameSize = function(size){
        console.log("size is ",size)
        this.gameSize=size;
        if(size==2||size==4){
            this.xTiles=20;
            this.yTiles=15;
        }
        if(size==20){
            this.xTiles=38;
            this.yTiles=20;
        }
    }

    this.init = function () {
        //set flag
        this.gameRunning = true;
        //load sounds
        this.bombSound = new Sound("/pureBomberman/sound/bombExplosion.wav");
        this.powerupSound = new Sound("/pureBomberman/sound/powerUp.wav");
        this.gameloopSound = new Sound("/pureBomberman/sound/gameloop_normal.mp3");
        this.gameloopSound.setRepeat(true);
        //this.gameloopSound.play();
        this.canvas.width = this.gridSize.w * this.xTiles;
        this.canvas.height = this.gridSize.h * this.yTiles;
        console.log("grid dims", this.gridSize.w, this.xTiles)


        //init map



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
        //this.destroyableArea.push(new DestroyableArea(this.context, this.id++, this.gridSize.w * 5, this.gridSize.h * 5, this.gridSize));
        //this.destroyableArea.push(new DestroyableArea(this.context, this.id++, this.gridSize.w * 5, this.gridSize.h * 7, this.gridSize));
        //this.destroyableArea.push(new DestroyableArea(this.context, this.id++, this.gridSize.w * 5, this.gridSize.h * 9, this.gridSize));

        this.destroyableArea.push(new DestroyableArea(this.context, this.id++, this.gridSize.w * (this.xTiles-5), this.gridSize.h * (this.yTiles-5), this.gridSize));
        this.destroyableArea.push(new DestroyableArea(this.context, this.id++, this.gridSize.w * (this.xTiles-5), this.gridSize.h * (this.yTiles-4), this.gridSize));
        this.destroyableArea.push(new DestroyableArea(this.context, this.id++, this.gridSize.w * (this.xTiles-5), this.gridSize.h * (this.yTiles-3), this.gridSize));
        this.destroyableArea.push(new DestroyableArea(this.context, this.id++, this.gridSize.w * (this.xTiles-5), this.gridSize.h * (this.yTiles-2), this.gridSize));
        this.destroyableArea.push(new DestroyableArea(this.context, this.id++, this.gridSize.w * (this.xTiles-4), this.gridSize.h * (this.yTiles-5), this.gridSize));
        this.destroyableArea.push(new DestroyableArea(this.context, this.id++, this.gridSize.w * (this.xTiles-3), this.gridSize.h * (this.yTiles-5), this.gridSize));
        this.destroyableArea.push(new DestroyableArea(this.context, this.id++, this.gridSize.w * (this.xTiles-2), this.gridSize.h * (this.yTiles-5), this.gridSize));


        //init players
        var player0 = new Player(this.context, this.id++, this.gridSize.w, this.gridSize.h, this.playerSize);
        this.players.push(player0)

        console.log(this.playerCount, this.gameSize)
        console.log("size", this.canvas.width)
        if(this.playerCount==1){
            var player1 = new Bot(this.context, this.id++, (this.xTiles-1)*this.gridSize.w-
                this.playerSize.w,(this.yTiles-1)*this.gridSize.h-this.playerSize.h , this.playerSize, 0);
            player1.botAI.init(this);
            this.players.push(player1)
        }
        else if(this.playerCount==2){
            var player1 = new Player(this.context, this.id++, (this.xTiles-1)*this.gridSize.w-
                this.playerSize.w,(this.yTiles-1)*this.gridSize.h-this.playerSize.h , this.playerSize);
            this.players.push(player1)
        }

        //add bots if necassary

        if (this.gameSize==4){
            var player3 = new Bot(this.context, this.id++, this.gridSize.w,(this.yTiles-1)*this.gridSize.h-this.playerSize.h , this.playerSize, 0);
            player3.botAI.init(this);
            this.players.push(player3);
            var player4 = new Bot(this.context, this.id++, (this.xTiles-1)*this.gridSize.w- this.playerSize.w,this.gridSize.h,
                this.playerSize, 0);
            player4.botAI.init(this);
            this.players.push(player4)
        }

        else if(this.gameSize==20){
            //TODO add bare people
        }
    }

        this.stop = function () {
            clearInterval(this.interval);
        }
}