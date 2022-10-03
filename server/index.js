let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

app.use(express.static('client'));

app.get('/hi', function(req, res){
    res.status(200).send("Hola mundo desde una ruta");
});

let messages = [{
    id:1,
    text: 'Bienvenido al chat',
    nickname: 'Bot'
}];

io.on('connection', function(socket) {
    console.log('el cliente con IP: '+socket.handshake.address+' se ha conectado...');

    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});


server.listen(6677, function(){
    console.log('Servidor está funcionando en http://localhost:6677');
});
