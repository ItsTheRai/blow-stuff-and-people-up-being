/**
 * Created by rai on 07/05/16.
 */
function Controller(service) {
    this.service = service;
    this.keys = [];
    this.bindListeners = function () {
        var self = this;
        document.addEventListener('keydown',function(e){
            self.onKeyDown(e);
        })
            //, this.onKeyDown(event))


        document.addEventListener('keyup', function(e){
            self.onKeyUp(e);
        })
        //    , function (e) {
        //    //console.log(myGameArea)
        //    this.keys[e.keyCode] = false;
        //    //key listener for bombs
        //    if (e.keyCode == 32) {
        //        var dx = true;
        //        var dy = true;
        //        //check if bomb can be planted there
        //        for (var i; i < myGameArea.players.length; i++) {
        //            //dx = (Math.abs(myGameArea.players[0].centerX - myGameArea.bombs[i].centerX) >= myGameArea.players[0].radius + myGameArea.bombs[i].radius)
        //            //dy = (Math.abs(myGameArea.players[0].centerY - myGameArea.bombs[i].centerY) >= myGameArea.players[0].radius + myGameArea.bombs[i].radius)
        //            //if (!dx || !dy) {
        //            //    continue
        //        }//TODO uncomment dis
        //
        //        if (dx && dy) {
        //            //players position is measured from their feet location
        //            var c = getGridPlayerPosition(myGameArea.players[0], myGameArea);
        //            var bombCoords = getGridTilePoint(c, myGameArea.xTiles, myGameArea.yTiles, myGameArea.gridSize.w,
        //                myGameArea.gridSize.h);
        //            myGameArea.players[0].plantBomb(bombCoords[0], bombCoords[1], myGameArea.gridSize);
        //        }
        //    }
        //    if (e.keyCode == 96) {
        //        var dx = true;
        //        var dy = true;
        //        //check if bomb can be planted there
        //        for (var i; i < myGameArea.players.length; i++) {
        //            for (var j; j < myGameArea.players[i].bombs.length; j++) {
        //
        //                //dx = (Math.abs(myGameArea.players[0].centerX - myGameArea.bombs[i].centerX) >= myGameArea.players[0].radius + myGameArea.bombs[i].radius)
        //                //dy = (Math.abs(myGameArea.players[0].centerY - myGameArea.bombs[i].centerY) >= myGameArea.players[0].radius + myGameArea.bombs[i].radius)
        //                //if (!dx || !dy) {
        //                //    continue
        //            }
        //        }//TODO uncomment dis
        //
        //
        //        if (dx && dy) {
        //            myGameArea.players[1].plantBomb();
        //        }
        //    }
        //})
    }

    this.onKeyDown = function (event) {
        //console.log(event)
        //this.keys = (this.keys || []);
        this.keys[event.keyCode] = true;
        this.updateKeyPresses()
        //console.log(this.keys)
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
        //console.log("mygameare", myGameArea)
        //window.requestAnimationFrame(updateGame);
        //if (!myGameArea.gameRunning) {
        //    myGameArea.gameloopSound.stop();
        //}

        //listen for key presses
        //left

    }
}