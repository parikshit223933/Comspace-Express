module.exports.home=function(req, res)
{
    var options=
    {
        title:"ComSpace Express"
    };
    return res.render('home', options);
};