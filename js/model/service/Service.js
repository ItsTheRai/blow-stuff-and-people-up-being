/**
 * Created by rai on 09/05/16.
 */
function Service(logic){
    this.logic = logic;
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