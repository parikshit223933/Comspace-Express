module.exports.chatSockets=function(chatServer)
{
    let io=require('socket.io')(chatServer);
    io.sockets.on('connection', function(socket)
    {
        console.log('New Connection Recieved!', socket.id);
        socket.on('disconnect', function()
        {
            console.log('Socket Disconnected!');
        })
    })
}