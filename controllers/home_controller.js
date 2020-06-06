const Post = require('../models/post');

module.exports.home = function (req, res)
{
    /*console.log(req.cookies);
    res.cookie('user_id', 25);
    res.cookie('hello', 36); */
    Post.find({}, function (err, posts)
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
    })

};