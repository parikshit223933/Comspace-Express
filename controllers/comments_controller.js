const Comments = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res)
{
    try
    {
        let post = await Post.findById(req.body.post);

        if (post)
        {
            let comment = await Comments.create(
                {
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                });
            // updating
            post.comments.push(comment);
            post.save();
            res.redirect('back')
        }
    }
    catch (error)
    {
        console.log('There was an error in creating a comment!', error);
        return;
    }



}

module.exports.destroy = async function (req, res)
{
    let comment = await Comments.findById(req.params.id);

    if (comment.user == req.user.id)
    {
        let post_id = comment.post;
        comment.remove();
        let post= await Post.findByIdAndUpdate(post_id, { $pull: { comments: req.params.id } });
        
        return res.redirect('back');
    }
    else
    {
        return res.redirect('back');
    }
}