const Post = require('../models/post');
const Comment = require('../models/comment')

module.exports.create = async (req, res) =>
{
    try
    {
        await Post.create(
            {
                content: req.body.content,
                user: req.user._id
            });
        return res.redirect('back');
    }
    catch (error)
    {
        console.log('error in creating a post!', error);
        return;
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
            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            return res.redirect('back');
        }
        // else do not delete the post.
        else
        {
            return res.redirect('back');
        }
    }
    catch(error)
    {
        console.log('Error in destroying a post!', error);
        return;
    }



    
}