require("dotenv").config()
console.log("ENVIRONMENT CONFIGURATION ---")
console.log(process.env)


const dburlparse = require("pg-connection-string")
const dburl = dburlparse(process.env.DATABASE_URL)

console.log("DATABAE CONFIGURATION ---")
console.log("HOST:", dburl.host)
console.log("PORT:",dburl.port)
console.log("USER:",dburl.user)
console.log("PASSWORD:",dburl.password)
console.log("DATABASE:",dburl.database)

const mysql2 = require('mysql2/promise');
const dbpool = mysql2.createPool({
    host: dburl.host,
    user: dburl.user,
    password: dburl.password,
    database: dburl.database,
    connectionLimit: 2,
  });

console.log("EXPRESS HTTP SERVER INITIALIZING ---")
const express = require("express")()
const jsonware = require("express").json()
const userModel = require("./models/userModel")(dbpool)

const userController = require("./controllers/userController")(userModel)

express.listen(process.env.PORT, () => { 
    console.log(`EXPRESS LISTENING ON PORT ${process.env.PORT} ---`)

    console.log("adding JSON middleware")
    express.use(jsonware);

    console.log("adding logging middleware")
    express.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
        next();
    });
      
    console.log("adding route '/'")
    express.get("/", (req, res) => { res.send("✅")})

    console.log("adding route '/user/login'")
    express.post("/user/login", userController.login)
})
