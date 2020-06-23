class ChatEngine
{
    constructor(chatBoxId, userEmail)
    {
        this.chatbox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://54.88.219.38:5000');

        if (this.userEmail)
            this.connectionHandler();
    }
    connectionHandler()
    {
        let self=this;
        this.socket.on('connect', function ()
        {
            console.log('Connection Established using sockets!');
            self.socket.emit('join_room', 
            {
                user_email:self.userEmail,
                chatroom:'Comspace Express'
            });
            self.socket.on('user_joined', function(data)
            {
                console.log('A user has joined', data);
            });
        });

        $('#send-message').click(function(event)
        {
            event.preventDefault();
            let message=$('#message').val();
            if(message!='')
            {
                $('#message').val('')
                self.socket.emit('send_message', {
                    message:message,
                    user_email:self.userEmail,
                    chatroom:'Comspace Express'
                });
            }
        });

        self.socket.on('recieve_message', function(data)
        {
            console.log('Recieved some message!', data);
            let newMessage=$('<li>');
            let message_type='other-message';
            if(data.user_email==self.userEmail)
            {
                message_type='self-message';
            }
            newMessage.append($('<span>', {
                html:data.message
            }));
            /* break line */
            newMessage.append($('<br>'));

            newMessage.append($('<small>', {
                html:data.user_email
            }));
            newMessage.addClass(message_type);
            $('#message-list').append(newMessage);
        })
    }
}
/* this class is initialized in home.ejs */