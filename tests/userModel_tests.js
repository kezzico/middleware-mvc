require("dotenv").config()
const dburlparse = require("pg-connection-string")
const dburl = dburlparse(process.env.DATABASE_URL)
const mysql2 = require('mysql2/promise');
const dbpool = mysql2.createPool({
    host: dburl.host,
    user: dburl.user,
    password: dburl.password,
    database: dburl.database,
    connectionLimit: 2,
  });

const crypto = require('crypto');
const userModel = require("../models/userModel")(dbpool)

userModel.findByEmail({ email: "user1@example.com" }).then((user) => {
    const password = "password1"

    const password_hash = crypto.createHash('md5').update(password).digest('hex');
    
    console.log(user.password_md5 == password_hash, user.password_md5, password_hash)
})
