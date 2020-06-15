const nodemailer_config=require('../config/nodemailer');
//this is another way of exporting a method
exports.create_new_comment=(comment)=>
{
    let HTMLstring=nodemailer_config.renderTemplate({comment:comment}, '/comments/new_comment.ejs');
    nodemailer_config.transporter.sendMail(
        {
            from:'pk223933@gmail.com',
            to:comment.user.email,
            subject:'New comment published',
            html:HTMLstring
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