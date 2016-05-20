/**
 * Created by rai on 07/05/16.
 */
window.onload = function () {
    function startGame() {
        this.canvas = document.getElementById("mycanvas");
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");

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