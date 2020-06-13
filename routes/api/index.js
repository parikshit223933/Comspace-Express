const express=require('express');
const router=express.Router();
const v1_api=require('./v1')

router.use('/v1', v1_api);

module.exports=router;