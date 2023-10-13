module.exports = function (userModel) {
    return {
        index: (req, res, next) => { 
            res.render("index")
        },

        profile: async (req, res, next) => {
            try {
                const user = await userModel.findById({id: req.bag.userId})
                res.render("profile", user)
            } catch {
                res.status(500)
            }
        }
    }
}

