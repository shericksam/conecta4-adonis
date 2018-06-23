'use strict'
var Array2d = require('array-2d');
var mat = new Array2d(6,7,0);
var players = [];
var turn = 0;
class GameController {

    constructor(){
        this.mat = new Array2d(6,7,0);
    }

    static isGameReady(){
        return (players.length > 1)?true:false;
    }

    static cleanGame(){
        mat = new Array2d(6,7,0);
        players = [];
        turn = 0;
    }

    static cleanArray(){
        mat = new Array2d(6,7,0);
    }

    static getPlayer(userid){
        for (let i = 0; i < players.length; i++) {
            if(players[i].user == userid)
                return players[i];
        }
    }

    static currentTurn(){
        if(turn == 0){
            turn = players[Math.floor(Math.random() * 2)].user;
            return players[Math.floor(Math.random() * 2)];
        }
        if(turn == players[0].user){
            turn = players[1]
            return players[1];
        }
        turn = players[0].user;
        return players[0];
    }

    static turnBasedInCurrent(userInTurn){
        if(userInTurn == players[0].user){
            turn = players[1].user
            return players[1];
        }
        turn = players[0].user;
        return  players[0];
    }

    static get(row,col){
        return mat.get(row,col);
    }

    // Agregar a los jugadores
    static addPlayer(user){
        var exist = false;
        var uex;
        players.forEach(element => {
            if(element.user == user){
                exist = true;
                uex = element;
            }
        });
        if(!exist && players.length < 2){
            var u = {user:user,player:(players.length == 0)?1:2}
            players.push(u);
            return u;
        }else{
            return uex;
        }
        return null;
    }
    static getUsers(){
        return players;
    }

    static set(row,col,val){
        mat.set(row,col,val);
    }

    static getArray(){
        return mat;
    }   
    static setArray(){

    }

}

module.exports = GameController
