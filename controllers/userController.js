module.exports = function (userModel) {

    const crypto = require('crypto');
    const jwt = require('jsonwebtoken');

    return {
        checkpassword: async (req, res, next) => {
            // refactor to controller
            const { email, password } = req.body
            console.log(req.body)
            try {
                const user = await userModel.findByEmail({ email: email })
                const password_hash = crypto.createHash('md5').update(password).digest('hex')
                const password_match = user.password_md5 == password_hash

                console.log(`found user with email ${email} id: ${user}`)
                if (password_match) {
                    console.log('passwords match for user')
                    req.bag.userId = user.user_id
                    next()
                } else {
                    console.log('password does not match for user')
                    res.sendStatus(401)
                }
            }   catch {
                console.log(`no user found with email ${email}`)
                res.sendStatus(401)
            }
        },

        bakecookie: async (req, res, next) => {
            const { userId } = req.bag
            console.log(`🍪 baking cookie for ${userId}`)

            const token = jwt.sign(userId, process.env.JWT_SECRET); // Change the secret key

            // Store the token in a cookie
            res.cookie('token', token, { httpOnly: true });
            
            next()
        },

        bagcookie: (req, res, next) => {
            const { token } = req.cookies

            console.log("bagging cookie", token)
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.error('Cookie JWT decode failed:', err);
                    res.status(500)
                } else {
                    console.log('JWT Cookie decoded:', decoded);
                    req.bag.userId = decoded
                    next()
                }
    
            })
        }
    }
}
