const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');

const user_schema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    friendships:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Friendship'
        }
    ]
}, {
    timestamps:true,
});

let storage=multer.diskStorage(
    {
        destination:function(req, file, cb)
        {
            cb(null, path.join(__dirname, '..', AVATAR_PATH));
        },
        filename(req, file, callback)
        {
            callback(null, file.fieldname+'-'+Date.now());
        }
    }
);

//static functions - these are the functions which are applied over all the objects of a particular class.
user_schema.statics.uploadedAvatar=multer(
    {
        storage:storage,
    }
).single('avatar');
//This single denotes that only one file will be uploaded for our use case.
user_schema.statics.avatar_path=AVATAR_PATH;


const user=mongoose.model('User', user_schema);

module.exports=user;