const express=require('express');
const router=express.Router();
const v1_api=require('./v1')
const v2_api=require('./v2');

router.use('/v1', v1_api);
router.use('/v2', v2_api);

module.exports=router;