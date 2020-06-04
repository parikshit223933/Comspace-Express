const express=require('express');
const router=express.Router();
const users_controller=require('../controllers/users_controller');
const passport=require('passport');

router.get('/profile', users_controller.profile);
router.get('/sign-up', users_controller.signUp);
router.get('/sign-in', users_controller.signIn);
router.post('/create', users_controller.create);
router.post('/create-session', passport.authenticate('local', {failureRedirect:'/users/sign-in'}), users_controller.create_session);/* used passport as middleware to authenticate */

module.exports=router;