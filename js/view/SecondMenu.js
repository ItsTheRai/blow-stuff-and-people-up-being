/**
 * Created by rai on 10/05/16.
 */
function SecondMenu() {
    //this.service = service;
    this.visible = true;
    this.loading = true;
    //this.currentView = 1;
    this.view1visible = false;
    this.view2visible = false;
    this.view3visible = false;
    this.view4visible = false;

    this.initGame = false;

    this.init = function (context, service) {
        this.view1visible = true;
        var elem = context.canvas,
            elemLeft = elem.offsetLeft,
            elemTop = elem.offsetTop,
            context = elem.getContext('2d'),
            elements = [];
        var self = this;

        elem.addEventListener('click', function screen1(event) {
            var x = event.pageX - elemLeft,
                y = event.pageY - elemTop;

            // Collision detection between clicked offset and element.
            for (var i = 0; i < elements.length; i++) {
                if (y > elements[i].top && y < elements[i].top + elements[i].height
                    && x > elements[i].left && x < elements[i].left + elements[i].width) {
                    if (i == 0) {
                        self.view1visible = false;
                        elem.removeEventListener("click", screen1, false);
                        service.logic.game.setPlayerCount(1)
                        //self.changeView(context, service);
                        self.currentView = 2;
                        //redirect
                    }
                    else if (i == 1) {
                        self.view1visible = false;
                        elem.removeEventListener("click", screen1, false);
                        service.logic.game.setPlayerCount(2);
                        //self.changeView(context, service);
                        self.currentView = 2;
                    }
                    else if (i == 2) {
                        self.view1visible = false;
                        elem.removeEventListener("click", screen1, false);
                        self.currentView = 5;
                        //self.changeView(context, service);
                    }
                }
            }
        }, false);

        elements.push({
            colour: '#0000aa',
            width: 200,
            height: 25,
            top: 50,
            left: 200,
            fillStyle: "white",
            font: "20px Arial",
            text: "Single Player"
        });
        elements.push({
            colour: '#0000aa',
            width: 200,
            height: 25,
            top: 150,
            left: 200,
            fillStyle: "white",
            font: "20px Arial",
            text: "Multiplayer"
        });
        elements.push({
            colour: '#0000aa',
            width: 200,
            height: 25,
            top: 250,
            left: 200,
            fillStyle: "white",
            font: "20px Arial",
            text: "How to play"
        });

        //render elements
        context.fillStyle = "#000000";
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        elements.forEach(function (element) {
            context.fillStyle = element.colour;
            context.fillRect(element.left, element.top, element.width, element.height);
            context.font = element.font;
            context.fillStyle = element.fillStyle;
            //context.textAlign = "none";
            context.fillText(element.text, element.left + element.width / 2, element.top + element.height / 1.5);
        });
    }


    this.changeView = function (context, service) {
        this.view2visible = true;

        var elem = context.canvas,
            elemLeft = elem.offsetLeft,
            elemTop = elem.offsetTop,
            context = elem.getContext('2d'),
            elements = [];

        var self = this;
        elem.addEventListener('click', function screen2(event) {
            var x = event.pageX - elemLeft,
                y = event.pageY - elemTop;


            // Collision detection between clicked offset and element.
            for (var i = 0; i < elements.length; i++) {
                if (y > elements[i].top && y < elements[i].top + elements[i].height
                    && x > elements[i].left && x < elements[i].left + elements[i].width) {
                    if (i == 0) {

                        self.view2visible = false;
                        elem.removeEventListener("click", screen2, false);
                        self.currentView = 3;
                        self.initGame = true;
                        service.logic.game.setGameSize(2);

                        //redirect
                    }
                    else if (i == 1) {
                        self.view2visible = false;
                        self.initGame = true;
                        elem.removeEventListener("click", screen2, false);
                        self.currentView = 3;
                        service.logic.game.setGameSize(4)
                        //redirect
                        //alert('2');
                        //self.startGame();
                    }
                    else if (i == 2) {
                        self.view2visible = false;
                        self.initGame = true;
                        elem.removeEventListener("click", screen2, false);
                        self.currentView = 3;
                        service.logic.game.setGameSize(20)
                        //alert('3');
                        //self.startGame();
                    }
                }
            }
        }, false);

        // Add element.
        elements.push({
            colour: '#0000aa',
            width: 200,
            height: 25,
            top: 50,
            left: 200,
            fillStyle: "white",
            font: "20px Arial",
            text: "VS"
        });
        elements.push({
            colour: '#0000aa',
            width: 200,
            height: 25,
            top: 150,
            left: 200,
            fillStyle: "white",
            font: "20px Arial",
            text: "Battle"
        });
        elements.push({
            colour: '#0000aa',
            width: 200,
            height: 25,
            top: 250,
            left: 200,
            fillStyle: "white",
            font: "20px Arial",
            text: "Battle Royale"
        });

        //render elements
        context.fillStyle = "#000000";
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        elements.forEach(function (element) {
            context.fillStyle = element.colour;
            context.fillRect(element.left, element.top, element.width, element.height);
            context.font = element.font;
            context.fillStyle = element.fillStyle;
            //context.textAlign = "none";
            context.fillText(element.text, element.left + element.width / 2, element.top + element.height / 1.5);
        });
    }

    this.showEndMenu = function (context, service) {
        this.view4visible = true;
        var elem = context.canvas,
            elemLeft = elem.offsetLeft,
            elemTop = elem.offsetTop,
            context = elem.getContext('2d'),
            elements = [];

        var self = this;
        elem.addEventListener('click', function screen3(event) {
            var x = event.pageX - elemLeft,
                y = event.pageY - elemTop;
            // Collision detection between clicked offset and element.
            for (var i = 0; i < elements.length; i++) {
                if (y > elements[i].top && y < elements[i].top + elements[i].height
                    && x > elements[i].left && x < elements[i].left + elements[i].width) {
                    if (i == 0) {
                        self.view4visible = false;
                        elem.removeEventListener("click", screen3, false);
                        self.currentView = 1;
                    }
                }
            }
        }, false);

        var winner;
        for (var i = 0; i < service.logic.game.players.length; i++) {
            if (service.logic.game.players[i].alive) {
                winner = service.logic.game.players[i].id;
                //console.log(winner);
            }
        }
        //winner++;
        //console.log(winner);

        console.log()
        elements.push({
            colour: '#0000aa',
            width: 200,
            height: 25,
            top: 50,
            left: 100,
            fillStyle: "white",
            font: "20px Arial",
            text: "Play again",
            winner: winner,
        });

        //render elements
        context.fillStyle = "#000000";
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        elements.forEach(function (element) {
            context.fillStyle = element.colour;
            context.fillRect(element.left, element.top, element.width, element.height);
            context.font = element.font;
            context.fillStyle = element.fillStyle;
            context.fillText("player " + element.winner + " wins", element.left, element.top + 150);
            context.fillText(element.text, element.left, element.top + 30);
        });
    }

    //this.resetGame = function(context){
    //    this.service.logic.game = new Game(context.canvas);
    //}
    this.startGame = function () {
        this.service.startGame();
    }

    this.stopGame = function () {
        this.service.stopGame();
    }

    this.hideLoader = function (context) {
        this.visible = false;
        this.loading = false;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    }
}