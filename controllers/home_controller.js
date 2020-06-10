const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function (req, res)
{
    try
    {
        // step 1=populating all the posts in the home page
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')//populate user in the post model
            .populate(//we need to populate comments in the post model, and inside the comments we need to populate the user too.
                {
                    path: 'comments',
                    populate:
                    {
                        path: 'user'
                    }
                }
            );

        //step 2= finding all the users which will then be passed to the rendering function.
        let users = await User.find({});

        //step 3= rendering the page with all the posts and passing all the users to it.
        var options =
        {
            title: "ComSpace Express",
            posts: posts,
            all_users: users
        };
        return res.render('home', options);
    }
    catch (error)
    {
        console.log('Error', error);
        return;
    }
}

/* module.exports.home = function (req, res)
{
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    // res.cookie('hello', 36);

    // Post.find({}, function (err, posts)
    // {
        // if(err)
        // {
            // console.log('Unable to fetch posts!');
            // return;
        // }
        // var options =
        // {
            // title: "ComSpace Express",
            // posts: posts
        // };
        // return res.render('home', options);
    // });


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

            // var options =
            // {
                // title: "ComSpace Express",
                // posts: posts
            // };
            // return res.render('home', options);
        });
}; */



/* using then */
// Post.find({}).populate('comments').then(function());

/* let posts=Post.find({}).populate('comments').exec();
posts.then(); */


/* async await */


