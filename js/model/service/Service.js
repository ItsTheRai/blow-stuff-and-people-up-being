/**
 * Created by rai on 09/05/16.
 */
function Service(game) {

    this.logic = new Logic(game);

    this.init = function () {
        //init game state
        this.logic.init();
        //init keybord listeners
    };

    this.startGame = function () {
        this.logic.init();

    };

    this.stopGame = function () {
        this.logic.stopGame();
    };


    this.updateGameStep = function () {
        if (this.logic != null && this.logic.game != null) {
            this.logic.updateGameStep();
        }
    };

    this.updateInput = function (input) {
        this.logic.updateMovement(input);

    };
}