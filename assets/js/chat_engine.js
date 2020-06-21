class ChatEngine
{
    constructor(chatBoxId, userId)
    {
        this.chatbox = $(`#${chatBoxId}`);
        this.userId = userId;

        this.socket = io.connect('http://localhost:5000');

        if (this.userId)
            this.connectionHandler();
    }
    connectionHandler()
    {
        this.socket.on('connect', function ()
        {
            console.log('Connection Established using sockets!');
        });
    }
}
/* this class is initialized in home.ejs */