/**
 * Created by rai on 10/05/16.
 */
function SecondMenu(service) {
    this.service = service;
    this.visible = true;
    this.loading = true;
    this.currentView = 0;

    this.init = function (context, service) {
        var elem = context.canvas,
            elemLeft = elem.offsetLeft,
            elemTop = elem.offsetTop,
            context = elem.getContext('2d'),
            elements = [];

//
        var self = this;
        elem.addEventListener('click', function screen1(event) {
            var x = event.pageX - elemLeft,
                y = event.pageY - elemTop;

            // Collision detection between clicked offset and element.
            for (var i=0;i < elements.length; i++){
                if (y > elements[i].top && y < elements[i].top + elements[i].height
                    && x > elements[i].left && x < elements[i].left + elements[i].width) {
                    if(i==0){
                        elem.removeEventListener("click", screen1,false);
                        console.log("1")
                        service.logic.game.setPlayerCount(1)
                        self.changeView(context, service);
                        self.currentView=1;
                        //redirect
                    }
                    else if(i==1){
                        elem.removeEventListener("click", screen1,false);
                        console.log("2 players")
                        service.logic.game.setPlayerCount(2);
                        console.log(service.logic.game.playerCount)
                        self.changeView(context, service);
                        self.currentView=1;
                    }
                    else if(i==2){
                        elem.removeEventListener("click", screen1,false);
                        console.log("instructions")
                        self.currentView=4;
                        self.changeView(context, service);
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
            fillStyle : "white",
            font : "20px Arial",
            text: "Single Player"
        });
        elements.push({
            colour: '#0000aa',
            width: 200,
            height: 25,
            top: 150,
            left: 200,
            fillStyle : "white",
            font : "20px Arial",
            text: "Multiplayer"
        });
        elements.push({
            colour: '#0000aa',
            width: 200,
            height: 25,
            top: 250,
            left: 200,
            fillStyle : "white",
            font : "20px Arial",
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
            context.fillText(element.text, element.left+element.width/2, element.top+element.height/1.5);
        });
    }


    this.changeView = function (context, service) {
        console.log(service.logic.game.playerCount)

        var elem = context.canvas,
            elemLeft = elem.offsetLeft,
            elemTop = elem.offsetTop,
            context = elem.getContext('2d'),
            elements = [];

//
        var self = this;
        elem.addEventListener('click', function (event) {
            var x = event.pageX - elemLeft,
                y = event.pageY - elemTop;

            console.log(service.logic.game.playerCount)

            // Collision detection between clicked offset and element.
            for (var i=0;i < elements.length; i++){
                if (y > elements[i].top && y < elements[i].top + elements[i].height
                    && x > elements[i].left && x < elements[i].left + elements[i].width) {
                    if(i==0){
                        console.log(0);
                        //alert('1');
                        console.log()
                        self.currentView=2;
                        service.logic.game.setGameSize(2)
                        self.startGame();
                        //redirect
                    }
                    else if(i==1){
                        console.log("1")
                        self.currentView=2;
                        service.logic.game.setGameSize(4)
                        //redirect
                        //alert('2');
                        self.startGame();
                    }
                    else if(i==2){
                        console.log("2")
                        self.currentView=2;
                        service.logic.game.setGameSize(20)
                        //alert('3');
                        self.startGame();
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
            fillStyle : "white",
            font : "20px Arial",
            text: "VS"
        });
        elements.push({
            colour: '#0000aa',
            width: 200,
            height: 25,
            top: 150,
            left: 200,
            fillStyle : "white",
            font : "20px Arial",
            text: "Battle"
        });
        elements.push({
            colour: '#0000aa',
            width: 200,
            height: 25,
            top: 250,
            left: 200,
            fillStyle : "white",
            font : "20px Arial",
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
            context.fillText(element.text, element.left+element.width/2, element.top+element.height/1.5);
        });
    }

    this.showEndMenu = function (context, service) {
        var elem = context.canvas,
            elemLeft = elem.offsetLeft,
            elemTop = elem.offsetTop,
            context = elem.getContext('2d'),
            elements = [];

//
        var self = this;
        elem.addEventListener('click', function screen1(event) {
            var x = event.pageX - elemLeft,
                y = event.pageY - elemTop;

            // Collision detection between clicked offset and element.
            for (var i = 0; i < elements.length; i++) {
                if (y > elements[i].top && y < elements[i].top + elements[i].height
                    && x > elements[i].left && x < elements[i].left + elements[i].width) {
                    if (i == 0) {
                        elem.removeEventListener("click", screen1, false);
                        self.currentView = 0;
                        //redirect
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
            text: "Play again"
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

    this.startGame = function(){
        this.service.startGame();
    }

    this.hideLoader = function (context) {
        this.visible = false;
        this.loading = false;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    }


}