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
const mongoStore=require('connect-mongo')(session);

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

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressLayouts);
app.use('/', routes);
app.use(express.static('./assets'));

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