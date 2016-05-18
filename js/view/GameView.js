/**
 * Created by rai on 08/05/16.
 */
function GameView(service) {

    this.canvas = document.getElementById("mycanvas");
    this.canvas.width = 600;
    this.canvas.height = 300;
    this.context = this.canvas.getContext("2d");
    this.initGame = false;
    //this.context =
    this.views = [];
    this.service = service;
    this.secondMenu;

    //this.endMenu
    //this.playersChosen = false;
    this.currentView;

    this.start = function () {
        this.secondMenu = new SecondMenu();
        this.secondMenu.currentView = 1;
    }

    this.resetGame = function () {
        console.log("resetting game");
        this.service.logic.game = new Game(this.canvas);
    }

    //read inputs and update the game accordingly
    this.updateGameView = function () {
        if (this.secondMenu.currentView == 1) {
            if (this.secondMenu.view1visible) {
                return;
            }
            else {
                this.resetGame();
                this.secondMenu.init(this.context, this.service);
            }
            return;
        }
        else if (this.secondMenu.currentView == 2) {
            if (this.secondMenu.view2visible) {
                return;
            }
            else {
                this.secondMenu.changeView(this.context, this.service)
            }
            return;
        }

        else if (this.secondMenu.currentView == 4) {
            if (this.secondMenu.view4visible) {
                return
            }
            else {
                console.log("ending ti")
                this.secondMenu.showEndMenu(this.context, this.service)
            }
            return;
        }

        else if (this.secondMenu.currentView == 3) {
            if (this.secondMenu.initGame && !this.service.logic.game.gameRunning) {
                this.service.logic.game.init();
                this.secondMenu.initGame = false;
            }
            else if (!this.secondMenu.initGame && !this.service.logic.game.gameRunning) {
                this.secondMenu.showEndMenu(this.context, this.service);
            }
            else if (this.service.logic.game.gameRunning) {
                //TODO game loop here
                //clear canvas
                this.clear(this.context)
                //redraw all tiles
                for (var i = 0; i < this.service.logic.game.tiles.length; i++) {
                    this.updateObjectView(this.context, this.service.logic.game.tiles[i])
                }
                //redraw perks
                for (var i = 0; i < this.service.logic.game.perks.length; i++) {
                    this.updateObjectView(this.context, this.service.logic.game.perks[i])
                }
                //update bombs and fire
                for (var i = 0; i < this.service.logic.game.players.length; i++) {
                    for (var j = 0; j < this.service.logic.game.players[i].bombs.length; j++) {
                        var bomb = this.service.logic.game.players[i].bombs[j]
                        if (!bomb.exploding) {
                            this.updateObjectView(this.context, bomb)
                        }
                        for (var q = 0; q < bomb.fire.length; q++) {
                            if (bomb.fire[q] != null) {
                                this.updateObjectView(this.context, bomb.fire[q])
                            }
                        }
                    }
                }
                //redraw all solid objects
                for (var i = 0; i < this.service.logic.game.solidArea.length; i++) {
                    this.updateObjectView(this.context, this.service.logic.game.solidArea[i]);
                }
                //redraw boxes
                for (var i = 0; i < this.service.logic.game.destroyableArea.length; i++) {
                    this.updateObjectView(this.context, this.service.logic.game.destroyableArea[i]);
                }
                //redraw players
                for (var i = 0; i < this.service.logic.game.players.length; i++) {
                    this.updatePlayerView(this.context, this.service.logic.game.players[i]);
                }
            }
            else {
                this.secondMenu.currentView = 4;
            }
        }
    }


    this.updateTileView = function (context, tile) {
        context.beginPath();
        context.lineWidth = "6";
        context.rect(tile.x, tile.y, tile.size.w, tile.size.h);
        context.stroke();
    }

// draw the current frame
    this.drawSprite = function (context, x, y, sprite) {
        // get the row and col of the frame
        var row = Math.floor(sprite.animationSequence[sprite.currentFrame] / sprite.spritesheet.framesPerRow);
        var col = Math.floor(sprite.animationSequence[sprite.currentFrame] % sprite.spritesheet.framesPerRow);
        context.drawImage(
            sprite.spritesheet.image,
            col * sprite.spritesheet.frameWidth, row * sprite.spritesheet.frameHeight,
            sprite.spritesheet.frameWidth, sprite.spritesheet.frameHeight,
            x, y,
            sprite.spritesheet.frameWidth, sprite.spritesheet.frameHeight);
    };

    this.updatePlayerView = function (context, player) {
        //todo remove this in final release
        context.beginPath();
        context.lineWidth = "1";
        context.rect(player.x, player.y, player.size.w, player.size.h);
        context.stroke();
        this.drawSprite(context, player.x, player.y, player.animations[player.direction])
    }

    this.updateObjectView = function (context, object) {
        this.drawSprite(context, object.x, object.y, object.sprite);
    }

    this.clear = function (context) {
        context.fillStyle = "#0000ff";
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    }
}