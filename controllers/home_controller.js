const Post = require('../models/post');
const User = require('../models/user');
const Friendship = require('../models/friendship');

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
                    },
                    populate:
                    {
                        path: 'likes'
                    }
                }
            )
            .populate('likes');

        //step 2= finding all the users which will then be passed to the rendering function.
        let users = await User.find({});

        /* new step 4: finding the friends of the logged in user */
        let friends = new Array();
        if (req.user)/* friends list will only be loaded if thhe user is signed in */
        {
            let all_friendships = await Friendship.find({ $or: [{ from_user: req.user._id }, { to_user: req.user._id }] })
                .populate('from_user')
                .populate('to_user');/* checking the friendship model in the fields "from user" and "to_user". the current logged in user has to be in one of them. and at the same time we are also populating it to see the user ids*/

            for (let fs of all_friendships)/* storing all the friendships in an array so that it is easy to load them in the front end quickly */
            {
                if (fs.from_user._id.toString() == req.user._id.toString())
                {
                    friends.push({
                        friend_name: fs.to_user.name,
                        friend_id: fs.to_user._id,
                        friend_avatar:fs.to_user.avatar
                    });
                }
                else if (fs.to_user._id.toString() == req.user._id.toString())
                {
                    friends.push({
                        friend_name: fs.from_user.name,
                        friend_id: fs.from_user._id,
                        friend_avatar:fs.from_user.avatar
                    });
                }
            }
        }


        //step 3= rendering the page with all the posts and passing all the users to it.
        var options =
        {
            title: "ComSpace Express",
            posts: posts,
            all_users: users,
            friends: friends
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


