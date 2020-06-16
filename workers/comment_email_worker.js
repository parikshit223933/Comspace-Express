const queue=require('../config/kue');
const comments_mailer=require('../mailers/comments_mailer');

queue.process('emails', function(job, done)
{
    console.log('Emails worker is processing a job!', job.data);
    comments_mailer.create_new_comment(job.data);
    done();
})

