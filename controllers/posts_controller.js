const Post=require('../models/post');
const Comment=require('../models/comment')

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

module.exports.destroy=(req, res)=>
{
    /* first we need to find whether that post exists in the database or not. */
    Post.findById(req.params.id, function(error, post)
    {
        if(error)
        {
            console.log('error in finding the post which needs to be deleted.');
            return;
        }
        // .id means converted the object id to string.
        if(post.user==req.user.id)
        {
            post.remove();
            Comment.deleteMany({post:req.params.id}, function(err)
            {
                if(err)
                {
                    console.log('Unable to delete all the comments of the post.');
                    return;
                }
                return res.redirect('back');
            })
        }
        else
        {
            return res.redirect('back');
        }
    })
}