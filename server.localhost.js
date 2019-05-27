var http = require('http');
var server = http.createServer();
var socket_io = require('socket.io');

server.listen(4000);

var io = socket_io();

io.attach(server);

io.on('connection', function(socket){
    console.log("Socket connected: " + socket.id);
    socket.on('action', (action) => {
        // if(action.type === 'findParkingSpace/TOGGLE_AVAILABLEDAYS'){
            // console.log('Got data!', action);
            socket.emit('action', {type:'self', content:action.message});
            socket.broadcast.emit('action', {type:'others', content:action.message});
        // }
    });
});
