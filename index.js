const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const routes=require('./routes/entry_point_router');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
/* used for session cookie */
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportjwt=require('./config/passport-jwt-strategy');
const flash=require('connect-flash');
const mongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
const custom_middleware=require('./config/middleware');
/* google-passport authentication */
const passport_google=require('./config/passport-google-OAuth2-Strategy');
/* socket.io for messaging. Setting up the chat server to be used with socket.io */
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat Server is listening on port 5000')

app.use(sassMiddleware(
    {
        src:"./assets/scss",
        dest:'./assets/css',
        debug:true,
        outputStyle:"expanded",
        prefix:'/css',
    }
))
/* for creating and initializing a session */
/* mongostore is used to store the session cookie in the db */
app.use(session(
    {
        name:'comspace_express',
        /* ToDo: Change the secret before deployment in production mode. */
        /* whenever encryption happens, there is a key to encode and decode it that key is secret. */
        secret:'somethingsomething',
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge:(1000*60*100)
        },
        store: new mongoStore(
            {
                mongooseConnection:db,
                autoRemove:'disabled'
            },
            function(error)
            {
                console.log(err||'connect-mongo setup is working fine');
            }
        ),
    }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

/* it uses the express session and cookie parser so it needs to be set up after that.*/
app.use(flash());
app.use(custom_middleware.setFlash);

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressLayouts);
app.use('/', routes);
app.use(express.static('./assets'));
/* make the uploads path available to the browser */
app.use('/uploads', express.static(__dirname+'/uploads'));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('case sensitive routing', false);
app.set('views', './views');
app.set('view engine', 'ejs');



app.listen(port, (error)=>
{
    if(error)
    {
        console.log(`Error in running the server: ${port}`);
        return;
    }
    console.log(`Server is running on the port ${port}`);
})