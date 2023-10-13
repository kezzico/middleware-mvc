module.exports = function (dbpool) {
    return {
        findByEmail: async (options) => {
            const { email } = options

            const sql = await dbpool.getConnection()
            
            try {
                console.log('find user with email', email)
                const users = await sql.execute(`
                    SELECT * FROM users
                    WHERE email = ?
                `, [email])
                console.log('found', users[0][0])

                return users[0][0]
            } catch {
                console.log('💩')

            } finally {
                // if sql.release is not called then sql will hang 
                sql.release()
            }
        },

        findById: async (options) => {
            const { id } = options

            const sql = await dbpool.getConnection()
            
            try {
                console.log('find user with user_id', id)
                const users = await sql.execute(`
                    SELECT * FROM users
                    WHERE user_id = ?
                `, [id])
                console.log('found', users[0][0])
                
                return users[0][0]
            } catch {
                console.log('💩')

            } finally {
                // if sql.release is not called then sql will hang 
                sql.release()
            }
        }
    }
}
