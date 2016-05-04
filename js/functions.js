/**
 * Created by rai on 08/03/16.
 */
function validMove(x1, y1, x2, y2, height, width, totalHeight, totalWidth) {
    return (x2 >= 0) && (x2 <= totalWidth - width) && (y2 >= 0) && (y2 <= totalHeight - height)
}

cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
    activateKonamicode()
    alert('Voilà!');
});

function activateKonamicode() {

}

function getGridTileCenterPoint(number, xTiles, yTiles, width, height) {
    //console.log(number)
    //console.log("xtiles "+xTiles)
    //console.log("ytiles "+yTiles)

    x = Math.floor(number % xTiles)
    //console.log("tile number x "+x)
    y = Math.floor(number / xTiles)
    //console.log("tile number y " + y)
    xC = width/2 + x*width
    yC = height/2 + y*height
    return [xC,yC]
}

function getGridTilePoint(number, xTiles, yTiles, width, height) {
    x = Math.floor(number % xTiles)
    y = Math.floor(number / xTiles)
    xC = x*width
    yC = y*height
    return [xC,yC]
}

function getGridPosition(object, myGameArea) {
    gridWidth = 50
    gridHeight = 50
    myGameArea.gridWidth
    var centerX = object.x + object.width/2
    var centerY = object.y + object.height/2
    return Math.floor(centerX / myGameArea.gridWidth) + Math.floor((centerY / myGameArea.gridHeight)) * myGameArea.xTiles
}