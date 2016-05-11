/**
 * Created by rai on 09/05/16.
 */
function Service(logic){

    this.logic = logic;

    this.init = function(){
        //init game state
        this.logic.init();
        //init keybord listeners

    }


    this.startGame = function(){


    }

    this.updateGameStep = function(){
        this.logic.updateGameStep()
    }

    this.updateInput = function(input){
        if(input.length!=0){
            this.logic.updateMovement(input)
            //this.logic.updateGameStep();
        }

    }
}