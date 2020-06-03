/* USER PROFILE */
module.exports.profile=(req, res)=>
{
    var options=
    {
        user_name:"parikshit singh",
        title:"ComSpace Express",
    }
    return res.render('users_profile', options);
}

/* USER SIGNUP */
module.exports.signUp=(req, res)=>
{
    var options={
        title:"ComSpace Express | Sign Up"
    }
    return res.render('user_sign_up', options);
}

/* USER SIGNIN */
module.exports.signIn=(req, res)=>
{
    var options={
        title:"ComSpace Express | Sign In"
    }
    return res.render('user_sign_in', options);
}