const Like=require('../models/like');
const Post=require('../models/post');
const Comment=require('../models/comment');
const User=require('../models/user');

/* this will toggle the like, i.e. if the like already exists then it will be removed and if it dosen't exists then it will be added to the database */
module.exports.toggle_like=async (req, res)=>
{
    try
    {
        /* url structure-> likes/toggle/?id=abcdef&type=Post_or_Comment and it will be case sensitive */
        let likable;
        let deleted=false;

        if(req.query.type=='Post')
        {
            likable=await Post.findById(req.query.id).populate('likes');
        }
        else
        {
            likable=await Comment.findById(req.query.id).populate('likes');
        }
        /* check if the like already exists on the likable */
        let existing_like=await Like.findOne({likable:req.query.id, onModel:req.query.type, user:req.user._id});
        /* now if a like already exists, we should delete it */
        if(existing_like)
        {
            /* remove the like from the likable and then delete it from the like model */
            /* removing from the likable i.e. posts or comments */
            likable.likes.pull(existing_like._id);
            likable.save()
            /* 2. removing from the likes model */
            existing_like.remove()
            deleted=true;
        }
        /* make a new like */
        else
        {
            let new_like=await Like.create(
                {
                    user:req.user._id,
                    likable:req.query.id,
                    onModel:req.query.type
                }
            );
            likable.likes.push(new_like)
            likable.save();
        }
        return res.status(200).json(
            {
                message:'Request Successful',
                data:
                {
                    deleted:deleted
                }
            }
        )
    }
    catch(error)
    {
        if(error)
        {
            console.log(error);
            return res.status(500).json({message:'Internal Server Error'});
        }
    }
}
