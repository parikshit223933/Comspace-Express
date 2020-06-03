const User = require('../models/user');

/* USER PROFILE */
module.exports.profile = (req, res) =>
{
    if (req.cookies.user_id)
    {
        User.findById(req.cookies.user_id, (error, user) =>
        {
            if (error)
            {
                console.log('Cannot find the user with id provided by the cookie!')
            }
            if (user)
            {
                var options =
                {
                    user: user,
                    title: "ComSpace Express",
                }
                return res.render('users_profile', options);
            }
            return res.redirect('users/sign-in');
        })
    }
    else
    {
        return res.redirect('/users/sign-in');
    }


}

/* USER SIGNUP */
module.exports.signUp = (req, res) =>
{
    var options = {
        title: "ComSpace Express | Sign Up"
    }
    return res.render('user_sign_up', options);
}

/* USER SIGNIN */
module.exports.signIn = (req, res) =>
{
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
    //find the user
    //handle user-found
    //handle passwords which dont match
    //handle session creation
    //handle user-not-found


    User.findOne({ email: req.body.email }, (error, user) =>
    {
        if (error)
        {
            console.log('Error in finding the user in signing in!');
            return;
        }
        if (user)
        {
            //if user is found and password does not match
            if (user.password != req.body.password)
            {
                return Response.redirect('back');
            }
            // if the user is found and the password matches
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else
        {
            // user is not found
            return res.redirect('back');
        }
    })

}