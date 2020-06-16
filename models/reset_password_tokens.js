const mongoose=require('mongoose');
const reset_password_token_schema=new mongoose.Schema(
    {
        user:
        {
            ref:'User',
            type:mongoose.Schema.Types.ObjectId
        },
        access_token:
        {
            type:String,
        },
        is_valid:
        {
            type:Boolean,
        }
    },
    {
        timestamps:true,
    }
);
const token_details=mongoose.model('Token', reset_password_token_schema);
module.exports=token_details;