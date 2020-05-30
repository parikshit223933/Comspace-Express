const express=require('express');
const router=express.Router();
const users_controller=require('../controllers/users_controller');
const posts_controller=require('../controllers/posts_controller');

router.get('/profile', users_controller.profile);
router.get('/posts', posts_controller.posts);
module.exports=router;