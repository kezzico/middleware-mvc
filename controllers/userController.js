module.exports = function (userModel) {

    const crypto = require('crypto');

    return {
        login: async (req, res, next) => {
            // refactor to controller
            const { username, password } = req.body

            const user = await userModel.findByEmail({ email: "user1@example.com" })

            const password_hash = crypto.createHash('md5').update(password).digest('hex')
    
            console.log(user.password_md5 == password_hash, user.password_md5, password_hash)
        },

        profile: (req, res, next) => {

        }
    }
}
