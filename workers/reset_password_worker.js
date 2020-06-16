const queue=require('../config/kue');
const reset_pass_mailer=require('../mailers/reset_password_mailer');


queue.process('send_reset_pass_mail', function(job, done)
{
    reset_pass_mailer.reset_pass(job.data);
    done();
})
