module.exports = function (dbpool) {
    return {
        findByEmail: async (options) => {
            const { email } = options

            const sql = await dbpool.getConnection()
            
            const users = await sql.execute(`
                SELECT * FROM users
                WHERE email = ?
            `, [email])

            return users[0][0]
        },

        findUserId: async (userId) => {
            const sql = await dbpool.getConnection()
            
            sql.execute("SELECT * FROM users ")
        }
    }
}
