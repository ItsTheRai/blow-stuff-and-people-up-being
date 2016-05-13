/**
 * Created by rai on 07/05/16.
 */
function Controller(service) {
    this.service = service;
    this.keys = [];


    this.startGame = function(){

    }

    this.bindListeners = function () {
        var self = this;
        document.addEventListener('keydown',function(e){
            self.onKeyDown(e);
        })
        document.addEventListener('keyup', function(e){
            self.onKeyUp(e);
        })
    }

    this.onKeyDown = function (event) {
        this.keys[event.keyCode] = true;
        this.updateKeyPresses();
    }

    this.onKeyUp = function (event) {
        this.keys[event.keyCode] = false;
        if (event.keyCode == 32) {
            //var c = getGridPlayerPosition(myGameArea.players[0], myGameArea);
            //var bombCoords = getGridTilePoint(c, myGameArea.xTiles, myGameArea.yTiles, myGameArea.gridSize.w,
            //    myGameArea.gridSize.h);
            //myGameArea.players[0].plantBomb(bombCoords[0], bombCoords[1], myGameArea.gridSize);
        }
    }


    this.updateKeyPresses = function () {
        this.service.updateInput(this.keys)

    }
}