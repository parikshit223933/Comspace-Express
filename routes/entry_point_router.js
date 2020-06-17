const express=require('express');
const router=express.Router();
const users_router=require('./users');
const home_controller=require('../controllers/home_controller');
const posts_router=require('./posts');
const comments_router=require('./comments');
const api=require('./api');
const reset_password_enter_email_router=require('./reset_password_enter_email');
const likes=require('./likes');

router.get('/', home_controller.home);
router.use('/users', users_router);
router.use('/posts', posts_router);
router.use('/comments', comments_router);
router.use('/reset_password', reset_password_enter_email_router);
router.use('/likes', likes)

router.use('/api', api);

module.exports=router;