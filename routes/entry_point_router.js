const express=require('express');
const router=express.Router();
const users_router=require('./users');
const home_controller=require('../controllers/home_controller');

router.get('/', home_controller.home);
router.use('/users', users_router);


module.exports=router;