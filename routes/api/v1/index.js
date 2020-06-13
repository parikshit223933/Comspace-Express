const express=require('express');
const router=express.Router();
const posts_api=require('./posts');
const users_api=require('./users');

router.use('/posts', posts_api);
router.use('/users', users_api);

module.exports=router;