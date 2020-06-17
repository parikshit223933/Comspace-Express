const Post = require('../models/post');
const Comment = require('../models/comment')
const User=require('../models/user');
const Like=require('../models/like');
const posts_mailer=require('../mailers/posts_mailer');

module.exports.create = async (req, res) =>
{
    try
    {
        let new_post=await Post.create(
            {
                content: req.body.content,
                user: req.user._id
            });
        let post=await Post.findById(new_post._id).populate('user');
        /* if the req. is ajax request i.e. an xhr request *//////////////////
        posts_mailer.new_post(post);
        if(req.xhr)
        {
            return res.status(200).json(
                {
                    data:{
                        post_id:post._id,
                        user_name:post.user.name,
                        post_content:post.content,
                        updatedAt:post.updatedAt,

                    },
                    message:'Post Created!'
                }
            );
        }
        ////////////////////////////////////////////////////
        req.flash('success', 'New post Created!');
        return res.redirect('back');
    }
    catch (error)
    {
        req.flash('error', 'Error in creating a post');
        return res.redirect('back');
    }

}

module.exports.destroy = async (req, res) =>
{   
    try
    {
        /* first we need to find whether that post exists in the database or not. */
        let post = await Post.findById(req.params.id);

        // .id means converted the object id to string.
        // if the id of the post to be deleted is same as the id os the logged in user then only delete the post.
        if (post.user == req.user.id)
        {
            /* delete the associated likes of a post and all its comment's likes too */
            await Like.deleteMany({likable:post, onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.comments}});


            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            if(req.xhr)
            {
                return res.status(200).json(
                    {
                        data:
                        {
                            post_id:req.params.id
                        },
                        message:'Post Deleted!',
                    }
                )
            }

            req.flash('success', 'Post was Deleted Successfully!');
            return res.redirect('back');
        }
        // else do not delete the post.
        else
        {
            req.flash('error', 'You are Unauthorized to perform this action!');
            return res.redirect('back');
        }

    }
    catch(error)
    {
        req.flash('error', 'There was a problem in deleting the post!');
        return res.redirect('back');
    }
}