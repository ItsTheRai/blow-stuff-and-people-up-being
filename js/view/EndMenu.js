///**
// * Created by rai on 11/05/16.
// */
//function EndMenu(service) {
//    this.service = service;
//    this.visible = true;
//    this.loading = true;
//    this.currentView = -1;
//
//    this.init = function (context, service) {
//        var elem = context.canvas,
//            elemLeft = elem.offsetLeft,
//            elemTop = elem.offsetTop,
//            context = elem.getContext('2d'),
//            elements = [];
//
////
//        var self = this;
//        elem.addEventListener('click', function screen1(event) {
//            var x = event.pageX - elemLeft,
//                y = event.pageY - elemTop;
//
//            // Collision detection between clicked offset and element.
//            for (var i = 0; i < elements.length; i++) {
//                if (y > elements[i].top && y < elements[i].top + elements[i].height
//                    && x > elements[i].left && x < elements[i].left + elements[i].width) {
//                    if (i == 0) {
//                        elem.removeEventListener("click", screen1, false);
//                        self.currentView = 0;
//                        //redirect
//                    }
//                }
//            }
//        }, false);
//
//// Add element.
//        elements.push({
//            colour: '#0000aa',
//            width: 200,
//            height: 25,
//            top: 50,
//            left: 200,
//            fillStyle: "white",
//            font: "20px Arial",
//            text: "Play again"
//        });
//
//        //render elements
//        context.fillStyle = "#000000";
//        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
//        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
//        elements.forEach(function (element) {
//            context.fillStyle = element.colour;
//            context.fillRect(element.left, element.top, element.width, element.height);
//            context.font = element.font;
//            context.fillStyle = element.fillStyle;
//            //context.textAlign = "none";
//            context.fillText(element.text, element.left + element.width / 2, element.top + element.height / 1.5);
//        });
//    }
//
//
//    this.hideLoader = function (context) {
//        this.visible = false;
//        this.loading = false;
//        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
//    }
//
//
//}