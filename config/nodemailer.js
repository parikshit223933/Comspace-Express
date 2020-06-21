const nodemailer=require('nodemailer');
const path=require('path');
const ejs=require('ejs');
const env=require('./environment');
let transporter=nodemailer.createTransport(env.smtp);


let render_template=(data, relative_path)=>
{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relative_path),
        data,
        function(error, template)
        {
            if(error)
            {
                console.log('Error in rendering Template!', error);
                return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}
module.exports={
    transporter:transporter,
    renderTemplate:render_template
}