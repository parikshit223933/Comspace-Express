const passport=require('passport');/* importing passport */
const LocalStrategy=require('passport-local').Strategy;/* importing passport-local */
const User=require('../models/user'); /* imporated our user schema */

/* telling passport.js to use the local strategy */
passport.use(new LocalStrategy({usernameField:'email'},(email, password, done)=>
{
    /* trying to find the given user */
    User.findOne({email:email}, (error, user)=>
    {
        if(error)/* if there is some problem in finding the user! */
        {
            console.log('Error in finding user --> Passport');
            return done(error);
        }
        if(!user || user.password!=password)//user not found or the user is found but the password did not match
        {
            console.log('Invalid Username or Password');
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

module.exports=passport;