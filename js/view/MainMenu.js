/**
 * Created by rai on 10/05/16.
 */
function MainMenu(){
    this.visible = true;
    this.loading = true;

    var mouseX;
    var mouseY;

    this.init = function(context){
        //this.showLoader(context);
        canvas.addEventListener("mousemove", checkPos);
    }

    function checkPos(mouseEvent){
        mouseX = mouseEvent.pageX - this.offsetLeft;
        mouseY = mouseEvent.pageY - this.offsetTop;
    }


    this.showLoader = function(context){
        this.visible = true;
        this.loading = true;
        //console.log(context);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        //console.log(context.canvas.width)
        context.font = "30px Arial";
        context.fillStyle="white";
        context.textAlign = "center";
        var text = "Loading";
        context.fillText(text,context.canvas.width/2// - context.measureText(text).width/2
            ,context.canvas.height/2);// - context.measureText(text).height/2);
    }

    this.hideLoader = function(context){
        this.visible = false;
        this.loading = false;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    }



}