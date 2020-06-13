const express=require('express');
const router=express.Router();
const post_api=require('../../../controllers/api/v1/posts_api');
const passport=require('passport');

router.get('/', post_api.index);
router.delete('/:id', passport.authenticate('jwt', {session:false}), post_api.destroy);
/* to prevent session cookies from being generated, we use {session:false} */

module.exports=router;