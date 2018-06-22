'use strict'
const User = use('App/Models/User')
const Statistic = use('App/Models/Statistic')
const GameController = use('App/Controllers/Http/GameController')
var Array2d = require('array-2d');
 
class PartidaController {
  //mat = [7][6];
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    this.mat = new Array2d(6,7,0);
  }

  onOpen(){
    //console.log("Start: ",data);
  }

  onJoin(data){
    /*if(!GameController.addUser(data.user)){
      //this.socket.close();
    }*/
  }

  onConfirm(){
    
  }

  onSelected(data){
    console.log("ENTROO!!");
    /*
     *Aqui viaja la data de cada movimiento del jugador
     *La informacion se enviara de jugador a jugador con la sigueinte
     *estructura:
     {
       from:int -> usuario que emite,
       to:int -> usuario que recibira,
       x:int -> coordenada x,
       y:int -> coordenada y
     }
     */
    //if(!GameController.isGameReady()){
      //return;
    //}

    if(GameController.get(data.x,data.y) == 0){
      GameController.set(data.x,data.y,data.user);
      this.socket.broadcast("new-selection",data);

      if(this.checkWinner(data.user)){ 
          this.saveStatistics(data.user,null);
          this.socket.broadcastToAll("winner",data);
          console.log("GANO?: ",true);
      }else{
        console.log("GANO?: ",false);
      }
     
    }else{
      console.log("El lugar esta ocupado");
    }
    console.log(GameController.getArray().toString()); 
    //Broadcast a los usuarios!!
    

  }

  async saveStatistics(winner,loser){
    console.log("WINNER",winner);
    try{
      const win = await Statistic.findOrCreate(
        { fk_user: winner }
      );
      console.log("WIN:",win);
      const lose = await Statistic.findOrCreate(
        { fk_user: loser }
      );
  
      win.victorias = win.victorias+1;
      lose.derrotas = lose.derrotas+1;
      win.save();
      lose.save();
    }catch(e){
      console.log(e);
    }
    
    

    //console.log(u);
  }

  checkWinner(user){
    return (this.check(user,"x") || this.check(user,"y") ||  this.ckeckCross(user,"r1") ||
    this.ckeckCross(user,"r2") || this.checkCross2(user,null))
  }

  check(user,axis){
    var count = 0,itmp,jtmp;
    if(axis == "x"){itmp = 6, jtmp = 7}
    else if (axis == "y") {itmp = 7, jtmp = 6}
    else throw new Error("Error, debes elegir entre una de las absisas: (x) (y)");
    for (let x = 0; x < itmp; x++){
      for (let y = 0; y < jtmp; y++) {
        if(axis == "x")
          count = (user == GameController.get(x,y))?count+1:0;
        else
          count = (user == GameController.get(y,x))?count+1:0;
        if (count > 3)
          return true
      }
    }
    return false;
  }

  ckeckCross(user,cross){
    //cross derecha 1
    var count = 0;
    let pointerEq = (cross=="r1")?3:1, pointerEv =  (cross=="r1")?6:7;
    for(let pointer = pointerEq; pointer < pointerEv; pointer++){
      count = 0;
      for (let x = ((cross=="r1")?pointer:6); x > 0; x--){
        for (let y = ((cross=="r1")?0:pointer); y < ((cross=="r1")?pointer:7); y++) {
          count = (user==GameController.get(x-y,y))?count+1:0; 
          if(count > 3)
            return true;        
        }
      } 
    }
    return false;
  }

  //CROSS 2
  checkCross2(user,cross){
    var count = 0;
    for(let pointer = 2; pointer > -1; pointer --){
      count = 0;
      for (let x = pointer; x < 6; x++){
        for (let y = 0; y < 6; y++) {
          count = (user==GameController.get(x+y,y))?count+1:0; 
          if(count > 3)
            return true;        
        }
      } 
    }
    var x = 0;
    console.log("Segunda etapa!");
    for (let pointer = 1; pointer < 7; pointer++) {
      count = 0;
      x = 0;
      for (let y = pointer; y < 7; y++) {
          count = (user==GameController.get(x,y))?count+1:0;
          x++; 
          if(count > 3)
            return true;   
      }
    }

    return false;

  }

}

module.exports = PartidaController
