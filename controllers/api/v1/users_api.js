const User = require('../../../models/user');
const jwt = require('jsonwebtoken');




module.exports.create_session = async (req, res) =>
{
    try
    {
        let user = await User.findOne({ email: req.body.email });
        if(!user||user.password!=req.body.password)
        {
            return res.status(422).json(
                {
                    message:'Invalid username or password'
                }
            )
        }
        /* now if the user is found */
        return res.status(200).json(
            {
                message:'Sign-in Successful, Here is your token, please keep it safe!',
                data:
                {
                    token:jwt.sign(user.toJSON(), 'Comspace_Express', {expiresIn:100000})
                }
            }
        )
    }
    catch (error)
    {
        if(error)
        {
            console.log('******', error);
            return res.status(500).json(
                {
                    message:'Internal server error!'
                }
            )
        }
    }

}
