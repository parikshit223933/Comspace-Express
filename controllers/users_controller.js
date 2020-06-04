const User = require('../models/user');

/* USER PROFILE */
module.exports.profile = (req, res) =>
{
    var options =
    {
        user_name: "parikshit singh",
        title: "ComSpace Express",
    }
    return res.render('users_profile', options);
}

/* USER SIGNUP */
module.exports.signUp = (req, res) =>
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    var options = {
        title: "ComSpace Express | Sign Up"
    }
    return res.render('user_sign_up', options);
}

/* USER SIGNIN */
module.exports.signIn = (req, res) =>
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    var options = {
        title: "ComSpace Express | Sign In"
    }
    return res.render('user_sign_in', options);
}

/* when we are calling this create function, we are supposing that currently we are on the sign up page. on which we actually are */
module.exports.create = (req, res) =>
{
    if (req.body.password != req.body.confirm_password)/* if the passwords do not match */
    {
        console.log('password does not match from the confirm password field.');
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, (error, user) =>
    {
        console.log(user);
        if (error)
        {
            console.log('error in finding the user from the database!');
            return;
        }
        if (!user)
        {
            User.create(req.body, (error, user) =>
            {
                if (error)
                {
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else
        {
            return res.redirect('back');
        }
    });
}

module.exports.create_session = (req, res) =>
{
    return res.redirect('/');
}

module.exports.destroySession=function(req, res)
{
    req.logout();
    return res.redirect('/');
}