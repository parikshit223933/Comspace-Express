const mongoose=require('mongoose');
const post_schema=new mongoose.Schema(
    {
        content:
        {
            type:String,
            required:true,
        },
        user:
        {
            type:mongoose.Schema.Types.ObjectId,
            /* refer to which model? */
            ref:'User'
        }
    },
    {
        timestamps:true
    }
);

const post=mongoose.model('Post', post_schema);
module.exports=post;