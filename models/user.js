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
    }
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
            cb(null, file.fieldname+'-'+Date.now());
        }
    }
)


const user=mongoose.model('User', user_schema);

module.exports=user;