const express=require('express');
const router=express.Router();
const post_api=require('../../../controllers/api/v1/posts_api');

router.get('/', post_api.index);
router.delete('/:id', post_api.destroy);


module.exports=router;