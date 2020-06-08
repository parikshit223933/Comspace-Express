const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function (req, res)
{
    /*console.log(req.cookies);
    res.cookie('user_id', 25);
    res.cookie('hello', 36); */

    /* Post.find({}, function (err, posts)
    {
        if(err)
        {
            console.log('Unable to fetch posts!');
            return;
        }
        var options =
        {
            title: "ComSpace Express",
            posts: posts
        };
        return res.render('home', options);
    }); */


    Post.find({})
        .populate('user')
        .populate(
            {
                path: 'comments',
                populate:
                {
                    path: 'user'
                }
            }
        )
        .exec(function (err, posts)
        {
            if (err)
            {
                console.log('Unable to fetch posts!');
                return;
            }

            User.find({}, function (error, users)
            {
                if(error)
                {
                    console.log('error in finding all the users!');
                    return;
                }
                var options =
                {
                    title: "ComSpace Express",
                    posts: posts,
                    all_users:users
                };
                return res.render('home', options);
            })

            /* var options =
            {
                title: "ComSpace Express",
                posts: posts
            };
            return res.render('home', options); */
        });
};