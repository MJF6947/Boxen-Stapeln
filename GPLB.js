
let W = 87;
let A = 65;
let S = 83;
let D = 68;
/**********
 * Player *
 **********/
var Player = {
    Top:300,
    Left:300,
}
Player.Move =function() {
    if (event.keyCode === W) { Player.Top -=50; P1.style.transition = "top 0.5s ease";}
    if (event.keyCode === A) { Player.Left -=50;P1.style.transition = "left 0.5s ease"}
    if (event.keyCode === S) { Player.Top +=50; P1.style.transition = "top 0.5s ease";}
    if (event.keyCode === D) { Player.Left +=50;P1.style.transition = "left 0.5s ease"}
}
Player.JsZuCss =function() {
    //alert(event.keyCode);
    P1.style.top = Player.Top +"px";
    P1.style.left = Player.Left +"px"; 
}
/**********
 * Gegner *
 **********/
var Gegner ={
    Top:50,
    Left:50,
    Horrizontal:true,
}
Gegner.AI =function() {
    if (Gegner.Horrizontal) {
        G1.style.transition = "left 0.5s ease"
        Gegner.Horrizontal = false;
        if(Gegner.Left === Player.Left) {Gegner.AI();}
        if(Gegner.Left < Player.Left) {Gegner.Left += 50;}
        if(Gegner.Left > Player.Left) {Gegner.Left -= 50;}
    } else {
        Gegner.Horrizontal =true;
        G1.style.transition = "top 0.5s ease"
        if(Gegner.Top === Player.Top) {Gegner.AI();}
        if(Gegner.Top < Player.Top) {Gegner.Top += 50;}
        if(Gegner.Top > Player.Top) {Gegner.Top -= 50;}
    }   
}
Gegner.JsZuCss =function() {
    G1.style.top = Gegner.Top+"px";
    G1.style.left = Gegner.Left+"px";
}
/*******
 * Box *
 *******/
//Box erstelen
var BOX=function(L,T,ID) {
    this.ID = ID;
    this.Top =T;
    this.Left =L;
}
//Box bewegen
BOX.prototype.Push=function() {
    if (this.Top == Player.Top && this.Left == Player.Left) {
        switch (event.keyCode) {
            case W: this.Top -=50; this.ID.style.transition = "top 0.5s ease"; break;
            case A: this.Left -=50;this.ID.style.transition = "left 0.5s ease"; break;
            case S: this.Top +=50; this.ID.style.transition = "top 0.5s ease";break;
            case D: this.Left +=50;this.ID.style.transition = "left 0.5s ease"; break;
        }
    }
}
//java script für Box zu Css
BOX.prototype.JsZuCss=function() {
    this.ID.style.top  = this.Top+"px";
    this.ID.style.left = this.Left+"px";
}
//Start Game
var Box1 = new BOX(300,50,B1);
var Box2 = new BOX(200,200,B2);
Player.JsZuCss();
Gegner.JsZuCss();
Box1.JsZuCss();
Box2.JsZuCss();
//Lopp
let CannTurn =function() {
    //W87 A65 S83 D68
    if      (event.keyCode == W && Player.Top <= 0) {}
    else if (event.keyCode == A && Player.Left <= 0) {}
    else if (event.keyCode == S && Player.Top >= 350) {}
    else if (event.keyCode == D && Player.Left >= 350) {}
    else if (event.keyCode == W||event.keyCode ==A||event.keyCode ==S||event.keyCode ==D) {return true;}
}
/**************
 * Win / Lose *
 **************/
let Game ={}
Game.Test=function(){
    if(Gegner.Left === Player.Left && Gegner.Top === Player.Top) {Game.over();}
    if(Box1.Left == 50 && Box1.Top == 300 &&Box2.Left == 50 && Box2.Top == 300 ) {Game.Wine();}
}
Game.Rheset=function(){
    Gegner.Left =50;
    Gegner.Top =50;
    Player.Left =300;
    Player.Top =300;
    Box1.Left = 300;
    Box1.Top = 50;
    Box2.Left =200;
    Box2.Top =200;
    Gegner.JsZuCss();
    Player.JsZuCss();
    Box1.JsZuCss();
    Box2.JsZuCss();
}
Game.over=function(){
    alert("Game Over")
    Game.Rheset();
}
Game.Wine=function(){
    alert("Game Wine")
    Game.Rheset();
}
function Knopff_Gedrücht() {
    if (!CannTurn()) {return;}
    Player.Move();
    Gegner.AI();
    Box1.Push();
    Box2.Push();
    Player.JsZuCss();
    Gegner.JsZuCss();
    Box1.JsZuCss();
    Box2.JsZuCss();
    Game.Test();
}