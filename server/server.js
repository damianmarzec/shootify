
var http = require("http");
var config = require('./config.json');
var Entity = require('./lib/entities.js');
var Logger = require('./lib/logger.js');
var compress = require('compression')();
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, {origins:'127.0.0.1:* http://127.0.0.1:* http://www.127.0.0.1:* localhost:* shootify.local:*', 'transports': ['websocket', 'polling']});



var players = [];

server.listen(config.port, '127.0.0.1', function(){
    Logger.log("Server up and running... ");
    Logger.log("Port: " + config.port);

    io.on('connect', function(data) {
        
		var response = {players: {}};
			
		for(var id in players){
			response.players[id] = players[id].get();
		}
			
		data.emit('World.currentState', response);
		
        players[data.id] = new Entity.Player({
            id: data.id
        }).init();
        
		Logger.log("Player " + data.id + " joined!");
		io.sockets.emit('Broadcast.Player.connected', players[data.id].get());
        
		data.on('Player.getAll', function(input) {
			Logger.log(data.id + ' requested list of players');
			
			var response = {};
			
			for(var id in players){
				response[id] = players[id].get();
			}

			data.emit('Player.getAll', response);
		});
		
        data.on('Player.updatePosition', function (input) {
            Logger.log(data.id + ' sent an position update');
			
			players[data.id].fill({
                x: input.x,
                y: input.y
            });
			
			io.sockets.emit('Broadcast.Player.updatePosition',players[data.id].get());
        }); 
    });
}); 