const nodemailer_config=require('../config/nodemailer');

module.exports.new_post=(post)=>
{
    let HTMLstring=nodemailer_config.renderTemplate({post:post}, '/posts/new_post.ejs')
    nodemailer_config.transporter.sendMail(
        {
            from:'pk223933@gmail.com',
            to:post.user.email,
            subject:'Comspace Express Post published',
            html:HTMLstring,
        },
        (error, info)=>
        {
            if(error)
            {
                console.log('Error in sending mail', error);
                return;
            }
            console.log('Mail delivered!', info);
            return;
        }
    )
}