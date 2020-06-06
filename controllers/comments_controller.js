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