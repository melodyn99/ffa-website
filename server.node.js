var app = require('express')(); 
var http = require('http').Server(app); 
var io = require('socket.io')(http); 

app.get('/', function(req, res){
    res.sendFile('/var/www/html/index.html');
});

io.on('connection', function(socket){
    //console.log('a user connected');
    console.log("Socket connected: " + socket.id);
    socket.on('action', (action) => {
        //if(action.type === 'invitee/ADD_INVITEE'){
            // console.log('Got data!', action);
            socket.emit('action', {type:'self', content:action.message});
            socket.broadcast.emit('action', {type:'others', content:action.message});
        //}
    });
});

http.listen(4000, function(){
    console.log('listening on *:4000');
});
