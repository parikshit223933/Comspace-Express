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

module.exports.destroy = function (req, res)
{
    Comments.findById(req.params.id, function (error, comment)
    {
        if (error)
        {
            console.log('there was an error in finding the comment to delete.');
            return;
        }
        if (comment.user == req.user.id)
        {
            let post_id = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(post_id, { $pull: { comments: req.params.id } }, function (error, post)
            {
                if (error)
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