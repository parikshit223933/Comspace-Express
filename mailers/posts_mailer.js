const nodemailer_config=require('../config/nodemailer');

module.exports.new_post=(post)=>
{
    console.log('Inside new post mailer!', post);
    nodemailer_config.transporter.sendMail(
        {
            from:'pk223933@gmail.com',
            to:post.user.email,
            subject:'Comspace Express Post published',
            html:`<h1>Congratulations, You new post is live on the website</h1>`,
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