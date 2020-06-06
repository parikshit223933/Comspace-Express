const Post=require('../models/post');


module.exports.create=(req, res)=>
{
    Post.create(
        {
            content:req.body.content,
            user:req.user._id
        },
        function(error, post)
        {
            if(error)
            {
                console.log('Error in creating a post!');
                return;
            }
            return res.redirect('back');
        }
    )
}