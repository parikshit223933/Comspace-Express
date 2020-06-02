module.exports.profile=(req, res)=>
{
    var options=
    {
        user_name:"parikshit singh",
        title:"ComSpace Express",
    }
    return res.render('users_profile', options);
}