const express=require('express');
const router=express.Router();
const home_controller=require('../controllers/home_controller');
const users_controller=require('../controllers/users_controller');

router.get('/', home_controller.home);
router.get('/users', users_controller.users)


module.exports=router;