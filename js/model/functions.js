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
    x = Math.floor(number % xTiles)
    y = Math.floor(number / xTiles)
    xC = width / 2 + x * width
    yC = height / 2 + y * height
    return [xC, yC]
}

function getGridTilePoint(number, xTiles, yTiles, width, height) {
    x = Math.floor(number % xTiles)
    y = Math.floor(number / xTiles)
    xC = x * width
    yC = y * height
    return [xC, yC]
}


function getGridPosition(object, myGameArea) {
    gridWidth = myGameArea.gridSize.w
    gridHeight = myGameArea.gridSize.h
    var centerX = object.x + object.size.w / 2
    var centerY = object.y + object.size.h / 2
    return Math.floor(centerX / gridWidth) + Math.floor((centerY / gridHeight)) * myGameArea.xTiles
}

//returns the objects grid location based on its center point ( of object's center point and the tile's center point don't
//match, not in that grid tile)
function getBotGridPosition(object, myGameArea) {
    //console.log("doing stuff");
    gridWidth = myGameArea.gridSize.w
    gridHeight = myGameArea.gridSize.h

    var centerX = object.x + object.size.w / 2
    var centerY = object.y + object.size.h / 2

    var tileCenterX = gridWidth / 2;
    var tileCenterY = gridHeight / 2;

    var result;
    //console.log("aaaaa", centerX % gridWidth, centerY % gridHeight, tileCenterX, tileCenterY);
    if (tileCenterX == (centerX) % gridWidth && tileCenterY == (centerY) % gridWidth) {
        result = Math.floor(centerX / gridWidth) + Math.floor((centerY / gridHeight)) * myGameArea.xTiles;
        //console.log("1")
    }
    else if (tileCenterX == (centerX) % gridWidth && tileCenterY < (centerY) % gridWidth) {
        //console.log("2")
        result = Math.floor(centerX / gridWidth) + Math.floor((centerY - gridHeight)/ gridHeight) * myGameArea.xTiles;
    }
    else if (tileCenterX == (centerX) % gridWidth && tileCenterY > (centerY) % gridWidth) {
        //console.log("3")
        result = Math.floor(centerX / gridWidth) + Math.floor((centerY - gridHeight)/ gridHeight) * myGameArea.xTiles;
    }
    else if (tileCenterX < (centerX) % gridWidth && tileCenterY == (centerY) % gridWidth) {
        //console.log("4")
        result = Math.floor((centerX + gridWidth) / gridWidth) + Math.floor((centerY / gridHeight)) * myGameArea.xTiles;
    }
    else if (tileCenterX > (centerX) % gridWidth && tileCenterY == (centerY) % gridWidth) {
        //console.log("5")
        result = Math.floor((centerX - gridWidth)/ gridWidth) + Math.floor((centerY / gridHeight)) * myGameArea.xTiles;
    }

    else if(tileCenterX < (centerX) % gridWidth && tileCenterY < (centerY) % gridWidth){
        //console.log("6")
        result = Math.floor((centerX + gridWidth)/ gridWidth) + Math.floor((centerY + gridHeight)/ gridHeight) * myGameArea.xTiles;
    }
    else if(tileCenterX < (centerX) % gridWidth && tileCenterY > (centerY) % gridWidth){
        //console.log("7")
        result = Math.floor((centerX + gridWidth)/ gridWidth) + Math.floor((centerY  - gridHeight)/ gridHeight) * myGameArea.xTiles;
    }

    else if(tileCenterX > (centerX) % gridWidth && tileCenterY < (centerY) % gridWidth){
        //console.log("8")
        result = Math.floor((centerX - gridWidth)/ gridWidth) + Math.floor((centerY + gridHeight)/ gridHeight) * myGameArea.xTiles;
    }
    else if(tileCenterX > centerX % gridWidth && tileCenterY > centerY % gridWidth){
        //console.log("9")
        //console.log(centerX , gridWidth, centerY  , gridHeight, myGameArea.xTiles)
        result = Math.floor((centerX - gridWidth)/ gridWidth) + Math.floor((centerY  - gridHeight)/ gridHeight) * myGameArea.xTiles;
        //console.log(result);
    }

    else (console.log("busted"))
    return result;
}

function getGridPlayerPosition(object, myGameArea) {
    gridWidth = myGameArea.gridSize.w
    gridHeight = myGameArea.gridSize.h
    var centerX = object.x + object.size.w / 2
    var centerY = object.y + object.size.h / 2
    return Math.floor(centerX / gridWidth) + Math.floor((centerY / gridHeight)) * myGameArea.xTiles
}


function getRowNumber(xTiles, position) {
    return position / xTiles;
}

function getXfromPosition(position, xTiles) {
    return Math.floor(position % xTiles);
}

function getYfromPosition(position, yTiles) {
    return Math.floor(position / yTiles);
}


function getShuffle(array) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
        arr.push(array[i]);
    }
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }

    return arr;
}