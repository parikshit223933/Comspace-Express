const express=require('express');
const router=express.Router();
const users_controller=require('../controllers/users_controller');

router.get('/profile', users_controller.profile);
router.get('/sign-up', users_controller.signUp);
router.get('/sign-in', users_controller.signIn);
router.post('/create', users_controller.create);

module.exports=router;