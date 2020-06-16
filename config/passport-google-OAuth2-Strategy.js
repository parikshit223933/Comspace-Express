const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use new strategy for google login
passport.use(new googleStrategy(
    {
        clientID: '816112258827-7j79g70qrq67htg1n4hbnh0ha4ra0sgh.apps.googleusercontent.com',
        clientSecret: 'AqkyIXVuNRFmdV6xycS7DN7R',
        callbackURL: 'http://localhost:8000/users/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done)
    {
        // find a user
        User.findOne({ email: profile.emails[0].value }).exec(function (error, user)
        {
            if (error)
            {
                console.log('Error in google strategy passport', error);
                return;
            }
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);
            // if found, set this user as req.user
            if (user)
            {
                return done(null, user);
            }
            /* if the user is not found, then we will create the user! and set it as req.user */
            else
            {
                User.create(
                    {
                        name: profile.name,
                        email: profile.emails[0],
                        password: crypto.randomBytes(20).toString('hex')
                    },
                    function (error, user)
                    {
                        if (error)
                        {
                            console.log('Error in creating user passport-google-Strategy', error);
                            return;
                        }
                        return done(null, user);
                    }
                )
            }
        })
    }
));
module.exports=passport;