module.exports.setFlash=function(req, res, next)
{
    /* here we want to take the flash from the request and set it up in the locals of the response */
    res.locals.flash=
    {
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
    /* this next is very important */
}