const Comments = require('../models/comment');
const Post = require('../models/post');
const User=require('../models/user');

module.exports.create = async function (req, res)
{
    try
    {
        let post = await Post.findById(req.body.post);

        if (post)
        {
            let new_comment = await Comments.create(
                {
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                }
            );
            // updating
            post.comments.push(new_comment);
            post.save();
            let comment=await Comments.findById(new_comment._id)
            .populate('user')
            .populate('post');
            if(req.xhr)
            {
                console.log(comment);
                return res.status(200).json(
                    {
                        data:
                        {   
                            comment_id:comment._id,
                            user_name:comment.user.name,
                            comment_content:comment.content,
                            post_id:comment.post._id,
                        },
                        message:'Comment Created!',
                    }
                )
            }

            req.flash('success', 'New comment posted!');

            res.redirect('back')
        }
    }
    catch (error)
    {
        req.flash('error', 'There was an error in creating a comment!');
        return res.redirect('back');
    }



}

module.exports.destroy = async function (req, res)
{
    try
    {
        let comment = await Comments.findById(req.params.id);

        if (comment.user == req.user.id)
        {
            let post_id = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(post_id, { $pull: { comments: req.params.id } });
            req.flash('success', 'Comment deleted Successfully!');
            return res.redirect('back');
        }
        else
        {
            req.flash('error', 'You are unauthorized to perform this action!');
            return res.redirect('back');
        }
    }
    catch (error)
    {
        req.flash('error', 'There was an error in deleting the comment!');
        return res.redirect('back');
    }


}