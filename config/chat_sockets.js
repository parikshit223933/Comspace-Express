module.exports.chatSockets=function(chatServer)
{
    let io=require('socket.io')(chatServer);
    io.sockets.on('connection', function(socket)
    {
        console.log('New Connection Recieved!', socket.id);


        socket.on('disconnect', function()
        {
            console.log('Socket Disconnected!');
        });


        socket.on('join_room', function(data)
        {
            console.log('joining request recieved!', data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send_message', function(data)
        {
            io.in(data.chatroom).emit('recieve_message', data);
        })
    })
}