module.exports.home=function(req, res)
{
    console.log(req.cookies);
    res.cookie('user_id', 25);
    res.cookie('hello', 36);
    var options=
    {
        title:"ComSpace Express"
    };
    return res.render('home', options);
};