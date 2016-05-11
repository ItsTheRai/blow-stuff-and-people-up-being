/**
 * Created by rai on 07/05/16.
 */
window.onload = function () {
    function startGame() {
        this.id =0
        //console.log("starting game");
        var canvas = document.getElementById("mycanvas");
        canvas.width = 600;
        canvas.height = 300;
        var context = canvas.getContext("2d");

        var playerSize = {w:48,h:48}
        var player0 = new Player(context, this.id++, 50, 50, playerSize);
        var player1 = new Bot(context, this.id++, 18*32,8*32 , playerSize , 0);

        //console.log(player0, player1)
        var players=[]
        players.push(player0, player1);
        var size = {xTiles: 20, yTiles: 10}
        var myGame = new Game(context.canvas, 1);


        console.log(myGame.context.canvas.width, myGame.context.canvas.height)


        player1.botAI.init(myGame);

        var logic = new Logic(myGame);
        var service = new Service(logic);
        var controller = new Controller(service);

        var gameView = new GameView(service);

        //var mainView = new MainMenu();
        //mainView.init(context);

        //myGame.initGame();

        controller.bindListeners();



        gameView.init();

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