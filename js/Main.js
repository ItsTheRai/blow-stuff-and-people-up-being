/**
 * Created by rai on 07/05/16.
 */
window.onload = function () {
    function startGame() {
        this.id =0
        console.log("starting game");
        var canvas = document.getElementById("mycanvas");
        var context = canvas.getContext("2d");
        var playerSize = {w:48,h:48}
        var player0 = new Player(context, this.id++, 50, 50, playerSize);
        var player1 = new Bot(context, this.id++, 18*32,8*32 , playerSize , 0);

        console.log(player0, player1)
        var players=[]
        players.push(player0, player1);
        var size = {xTiles: 20, yTiles: 10}
        var myGame = new Game(canvas, 1, size, players);


        player1.botAI.init(myGame);

        var logic = new Logic(myGame);
        var service = new Service(logic);
        var controller = new Controller(service);

        var gameView = new GameView(service);

        myGame.initGame();

        controller.bindListeners();

        function mainLoop(){
            window.requestAnimationFrame(mainLoop);
            controller.updateKeyPresses()
            service.updateGameStep()
            gameView.updateGameView(myGame);
        }
        mainLoop();
    }
    startGame();
};