/**
 * Created by rai on 07/05/16.
 */
window.onload = function () {
    function startGame() {
        this.canvas = document.getElementById("mycanvas");
        this.canvas.width = 600;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");

        //console.log(player0, player1)
        //var myGame = new Game(context.canvas);

        //var logic = new Logic(myGame);

        var service = new Service(new Game(this.canvas));
        var controller = new Controller(service);
        var gameView = new GameView(service);

        gameView.start();

        controller.bindListeners();
        function mainLoop(){
            window.requestAnimationFrame(mainLoop);
            controller.updateKeyPresses();
            service.updateGameStep();
            gameView.updateGameView();
        }
        mainLoop();
    }
    startGame();
};