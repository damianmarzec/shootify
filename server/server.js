
var http = require("http");
var io = require('socket.io')(http);
var config = require('./config.json');
var Entity = require('./lib/entities.js');
var compress = require('compression')();
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, {origins:'127.0.0.1:* http://127.0.0.1:* http://www.127.0.0.1:*'});



var playersList = [];

server.listen(config.port, '127.0.0.1', function(){
    console.log("Server up and running...");

    io.on('connection', function (socket) {
        console.log('A user connected!!', socket.handshake.query);
        // socket.emit('pongg');


         var player = new Entity.Player({
            id: socket.handshake.query.t
        }).init();



        // var player = $.grep(playersList, function(e){ return e.id == socket.handshake.query.t; });
        // console.log(player);





        socket.on('write', function (socket, data) {
            console.log('!!!WRITE!!!');
            // console.log(data);
            // socket.emit('pongg');

            




        });


    });



    
}); 