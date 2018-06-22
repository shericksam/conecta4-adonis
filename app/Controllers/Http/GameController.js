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
    }

    static getOpponent(user){
        
    }

    static currentTurn(){
        if(turn == 0){
            return Math.floor(Math.random() * 2) + 1;
        }
        if(turn == players[0]){
            return players[0]
        }
        return players[1];
    }

    static get(row,col){
        return mat.get(row,col);
    }

    // Agregar a los jugadores
    static addPlayer(user){
        //players.push(user);
        if(players.indexOf(user) < 0 && players.length < 2){
            players.push(user);
            return true;
        }
        return false;
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
