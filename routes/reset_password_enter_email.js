const express=require('express');
const router=express.Router();
const reset_pass=require('../controllers/reset_password');

router.get('/enter_email', reset_pass.render_email_page);
router.post('/send_mail', reset_pass.generate_token_and_send_mail);
router.get('/reset', reset_pass.redirect_to_change_password_page);
router.post('/password_changed', reset_pass.change_password);

module.exports=router;