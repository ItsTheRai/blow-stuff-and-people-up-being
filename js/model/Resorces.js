/**
 * Created by rai on 09/05/16.
 */
function Resorces(){
    this.load = function(){
        this.bombSound = ("/pureBomberman/sound/bombExplosion.wav");
        this.powerupSound =("/pureBomberman/sound/powerUp.wav");
        this.gameloopSound =("/pureBomberman/sound/gameloop_normal.mp3");
    }


    this.getBombSound = function(){
        return new Sound(bombSound)
    }
    this.getPowerUpSound = function(){
        return new Sound(powerupSound)
    }
    this.getGameLoopSound = function(){
        return new Sound(gameloopSound)
    }

    this.getPlayer1Sprite = function(){

    }

}