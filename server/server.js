
var http = require("http");
var io = require('socket.io')(http);
var config = require('./config.json');
var Entity = require('./lib/entities.js');
var Logger = require('./lib/logger.js');
var compress = require('compression')();
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, {origins:'127.0.0.1:* http://127.0.0.1:* http://www.127.0.0.1:*'});



var players = {};

server.listen(config.port, '127.0.0.1', function(){
    Logger.log("Server up and running... ");
    Logger.log("Port: " + config.port);

    io.on('connect', function(data) {
        
        players[data.id] = new Entity.Player({
            id: data.id
        }).init();
        Logger.log("Player " + data.id + " joined!");
        

        // todo akcje do innej instancji, dodawanie też
        data.on('player.move', function (input) {
            Logger.log('Player move');
            Logger.log(input);

            players[data.id].fill({
                x: input.x,
                y: input.y
            });

        });        

        data.on('player', function (input) {
            Logger.log('Player');

            var player = players[data.id];
            data.emit('player', {
                id: player.id,
                hp: player.hp,
                x: player.x,
                y: player.y
            });
        }); 
    });
}); 