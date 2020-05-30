module.exports.profile=(req, res)=>
{
    var options=
    {
        user_name:"parikshit singh"
    }
    return res.render('users_profile', options);
}