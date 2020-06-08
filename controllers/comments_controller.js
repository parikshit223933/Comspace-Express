const Comments=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req, res)
{
    Post.findById(req.body.post, function(error, post)
    {
        if(error)
        {
            console.log('unable to find the post on which the coment is done!');
            return;
        }
        if(post)
        {
            Comments.create(
                {
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                },
                function(error, comment)
                {
                    if(error)
                    {
                        console.log('Error while creating a new comment!');
                        return;
                    }
                    // updating
                    post.comments.push(comment);
                    post.save();
                    res.redirect('back')
                }
            )
        }
    })
}

module.exports.destroy=function(req, res)
{
    Comments.findById(req.params.id, function(error, comment)
    {
        if(error)
        {
            console.log('there was an error in finding the comment to delete.');
            return;
        }
        if(comment.user==req.user.id)
        {
            let post_id=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(post_id, {$pull:{comments:req.params.id}}, function(error, post)
            {
                if(error)
                {
                    console.log('Error in updating the post while trying to delete the comment!');
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