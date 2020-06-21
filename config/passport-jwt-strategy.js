const passport = require('passport');
const jwt_strategy = require('passport-jwt').Strategy;
const extract_jwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const env=require('./environment');
let options =
{
    jwtFromRequest: extract_jwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret_or_key,
}
passport.use(new jwt_strategy(options, function (data_from_jwt_payload, done)
{
    /* done is just a callback function, you can name it whatever you want */
    User.findById(data_from_jwt_payload._id, function(error, user)
    {
        if(error)
        {
            console.log('Error in finding user from JWT!');
            return;
        }
        if(user)
        {
            return done(null, user);
        }
        else
        {
            return done (null, false);
        }
    });
}));
module.exports=passport;