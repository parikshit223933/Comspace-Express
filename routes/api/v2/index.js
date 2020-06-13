const express=require('express');
const router=express.Router();
const posts_api=require('./posts');

router.use('/posts', posts_api);

module.exports=router;