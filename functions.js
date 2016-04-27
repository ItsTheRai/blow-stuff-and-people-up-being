/**
 * Created by rai on 08/03/16.
 */
function validMove(x1, y1, x2, y2, height, width, totalHeight, totalWidth){
    return (x2 >= 0) && (x2 <= totalWidth-width) && (y2 >= 0) && (y2 <= totalHeight - height)
}

cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
    activateKonamicode()
    alert('Voilà!');
});

function activateKonamicode(){

}

function getGridCenter(x, y, width, height){

}