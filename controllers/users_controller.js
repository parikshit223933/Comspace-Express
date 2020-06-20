const User = require('../models/user');
const fs = require('fs');
const Friendship = require('../models/friendship');
const path = require('path');
/* USER PROFILE */
module.exports.profile = (req, res) =>
{
    User.findById(req.params.id, function (error, user)
    {
        if (error)
        {
            console.log('error in finding the user profile!');
            return;
        }

        let are_friends = false;

        Friendship.findOne({
            $or: [{ from_user: req.user._id, to_user: req.params.id },
            { from_user: req.params.id, to_user: req.user._id }]
        }, function (error, friendship)
        {
            if (error)
            {
                console.log('There was an error in finding the friendship', error);
                return;
            }
            if (friendship)
            {
                are_friends = true;
            }
            /* console.log(req.user);
            console.log(req.user._id, '********', req.params.id, '*******') */
            var options =
            {
                user_name: "parikshit singh",
                title: "ComSpace Express",
                profile_user: user,/* it is the user whose profile i am currently browsing */
                are_friends: are_friends
            }
            return res.render('users_profile', options);
        })


    });

}

/* USER SIGNUP */
module.exports.signUp = (req, res) =>
{
    if (req.isAuthenticated())
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
    if (req.isAuthenticated())
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
        req.flash('error', 'Passwords does not match!');
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, (error, user) =>
    {
        console.log(user);
        if (error)
        {
            req.flash('error', 'Error in finding the user from the database!');
            return res.redirect('back');
        }
        if (!user)
        {
            User.create(req.body, (error, user) =>
            {
                if (error)
                {
                    req.flash('error', 'An error occured while creating the account!');
                    return res.redirect('back');
                }
                req.flash('success', 'New account created successfully!');
                return res.redirect('/users/sign-in');
            });
        }
        else
        {
            req.flash('error', 'User already exists!');
            return res.redirect('back');
        }
    });
}

module.exports.create_session = (req, res) =>
{
    req.flash('success', 'Logged in Successfully!');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res)
{
    req.logout();
    req.flash('success', 'Logged out Successfully!');
    /* now i have added the flash message in the request. so now this message needs to be 
    transferred to the response, now either i can send it below as an object, but then
    what is the use? everytime i will be sending a separate context just for the flash
    message. so we dont need to do that. so lets create our own custom middleware. go to
    config and create a new file called middleware.js(this can be any name.) and proceed
    with it further. */
    return res.redirect('/');
}

module.exports.update = async function (req, res)
{
    /* if(req.user.id==req.params.id)
    {
        // only then update the credentials
        User.findByIdAndUpdate(req.params.id,req.body, function(error, user)
        {
            // instead of body, I could have also written {name:req.body.name, email:req.body.email}
            if(error)
            {
                console.log('unable to find the user by id and update!');
                return;
            }
            return res.redirect('back');
        });
    }
    else
    {
        return res.status(401).send('Unauthorized')
    } */

    if (req.user.id == req.params.id)
    {
        try
        {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (error)
            {
                if (error)
                {
                    console.log('****Multer Error', error);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file)
                {
                    if (user.avatar)
                    {
                        if (fs.existsSync(path.join(__dirname, '..', user.avatar)))
                        {
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }
                    }


                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatar_path + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch (error)
        {
            req.flash('error', err);
            return res.redirect('back');
        }
    }
    else
    {
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized!');
    }


}