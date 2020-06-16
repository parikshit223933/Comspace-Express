const User=require('../models/user');
const Token=require('../models/reset_password_tokens');
const crypto=require('crypto');
const queue=require('../config/kue');
const reset_pass_worker=require('../workers/reset_password_worker');
const reset_pass_mailer=require('../mailers/reset_password_mailer');

/* before going to this function i should be on the sign in page */
module.exports.render_email_page=async (req, res)=>
{
    return res.render('forgot_password_enter_mail', {title:'Comspace Express'});
}
/* send the mail to email id
store the token to change the password,
 */
module.exports.generate_token_and_send_mail=async (req, res)=>
{
    let token_string=crypto.randomBytes(40).toString('hex');
    let user=await User.findOne({email:req.body.email});
    
    let token=await Token.create(
        {
            is_valid:true,
            access_token:token_string,
            user:user,
        }
    );
    
    let job=queue.create('send_reset_pass_mail', token).save(function(error)
    {
        if(error)
        {
            console.log('error in adding items to the queue', error);
            return;
        }
        console.log('job enqueued', job.id);
        req.flash('success', 'A message is sent to the provided Email-id');
        return res.redirect('back');
    });
}
module.exports.redirect_to_change_password_page=function(req, res)
{
    let token_in_link=req.query.access_token;
    console.log(token_in_link);
    return res.render('change_pass', {title:'Comspace Express | Change Password', access_token:token_in_link});
}
module.exports.change_password=function(req, res)
{
    console.log(req.body);
    let token_in_link=req.body.access_token;
    let pass1=req.body.pass1;
    let pass2=req.body.pass2;
    if(pass1!=pass2)
    {
        req.flash('error', 'Please enter same password in both the fields!');
        return res.redirect('back');
    }
}