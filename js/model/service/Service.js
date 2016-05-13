/**
 * Created by rai on 09/05/16.
 */
function Service(game){

    this.logic = new Logic(game);

    this.init = function(){
        console.log("service init")
        //init game state
        //this.logic = new Logic(game);
        this.logic.init();
        //console.log(this.logic.game)
        //init keybord listeners
    }

    this.startGame = function(){
        this.logic.init();

    }

    this.stopGame = function(){
        this.logic.stopGame();
    }

    //this.resetGame = function(){
    //    this.logic.resetGame();
    //}

    this.updateGameStep = function(){
        //console.log(this.logic)
        if(this.logic!=null&&this.logic.game!=null) {
            //console.log("running brah")
            this.logic.updateGameStep();
        }
    }

    this.updateInput = function(input){
        //if(input.length!=0){
            this.logic.updateMovement(input);
        //}
    }
}