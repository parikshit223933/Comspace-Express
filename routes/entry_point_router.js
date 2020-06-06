const express=require('express');
const router=express.Router();
const users_router=require('./users');
const home_controller=require('../controllers/home_controller');
const posts_router=require('./posts');
const comments_router=require('./comments');

router.get('/', home_controller.home);
router.use('/users', users_router);
router.use('/posts', posts_router);
router.use('/comments', comments_router);

module.exports=router;