const passport=require('passport');/* importing passport */
const LocalStrategy=require('passport-local').Strategy;/* importing passport-local */
const User=require('../models/user'); /* imporated our user schema */

/* telling passport.js to use the local strategy */
passport.use(new LocalStrategy({usernameField:'email', passReqToCallback:true},(req, email, password, done)=>
{
    /* trying to find the given user */
    User.findOne({email:email}, (error, user)=>
    {
        if(error)/* if there is some problem in finding the user! */
        {
            req.flash('error', err);
            return done(error);
        }
        if(!user || user.password!=password)//user not found or the user is found but the password did not match
        {
            req.flash('error', 'Invalid username or password!');
            return done(null, false);/* false denotes that the user was not found! */
            /* this false means that the authentication is not done! */
        }
        return done(null, user);/* user found and password matched */
    });
}));

// serializing the user to decide which key is to be kept in the cookies.
passport.serializeUser((user, done)=>
{
    done(null, user.id);
})

// De-serializing the user from the key in the cookies.
passport.deserializeUser((id, done)=>
{
    User.findById(id, (error, user)=>
    {
        if(error)
        {
            console.log("error in finding the user!");
            return done(error);
        }
        return done(null, user);
    });
});

// check if the user is authenticated
passport.checkAuthentication=function(req, res, next)
{
    // if the user is signed in then pass him on to the next function, i.e. to the next controller action
    if(req.isAuthenticated())
    {
        return next();
    }
    // if the user is not signed in then return him to the sign-in page
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req, res, next)
{
    if(req.isAuthenticated())
    {
        // request.user contains the current signed in user from the session cookie, and we are just sending this to the locals for views.
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;