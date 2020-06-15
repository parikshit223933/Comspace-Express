const nodemailer_config=require('../config/nodemailer');
//this is another way of exporting a method
exports.new_comment=(comment)=>
{
    console.log('Inside new comment mailer', comment);
    nodemailer_config.transporter.sendMail(
        {
            from:'pk223933@gmail.com',
            to:comment.user.email,
            subject:'New comment published',
            html:`<h1>your comment is published!</h1>`
        },
        (error, info)=>
        {
            if(error)
            {
                console.log('Error in sending mail', error);
                return;
            }
            console.log('mail delivered!', info);
            return;
        }
    )
}