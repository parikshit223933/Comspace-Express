const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res)
{
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate(
            {
                path: 'comments',
                populate:
                {
                    path: 'user'
                }
            }
        );


    return res.status(200).json(
        {
            message: 'List of Posts',
            api_version: 'v1',
            posts: posts
        }
    )
}





module.exports.destroy = async (req, res) =>
{
    try
    {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id)
        {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            return res.status(200).json(
                {
                    message: 'Post and associated comments deleted successfully!'
                }
            )
        }
        else
        {
            return res.status(401).json(
                {
                    message:'You cannot delete this post!'
                }
            )
        }

    }
    catch (error)
    {
        return res.status(200).json(
            {
                message: 'Internal Server Error',
            }
        )
    }
}