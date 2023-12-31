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
const express = require("express")
const app = express()

const encodingware = express.urlencoded({ extended: true })
const cookieParser = require("cookie-parser")

const userModel = require("./models/userModel")(dbpool)
const userController = require("./controllers/userController")(userModel)
const viewsController = require("./controllers/viewsController")(userModel)

app.listen(process.env.PORT, () => { 
    console.log(`EXPRESS LISTENING ON PORT ${process.env.PORT} ---`)

    console.log("adding 'encoding' middleware")
    app.use(encodingware);

    console.log("adding 'cookie-parser' middleware")
    app.use(cookieParser())

    console.log("adding 'bag' middleware")
    app.use((req, res, next) => {
        console.log('empty bag created')
        req.bag = { /* create an empty bag for holding things */ }
        next()
    })

    app.set('view engine', 'ejs');

    console.log("adding logging middleware")
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
        next();
    });
      
    console.log("adding route '/'")
    app.get("/", viewsController.index)

    console.log("adding route '/user/profile'")
    app.get("/user/profile", userController.bagcookie, viewsController.profile)

    console.log("adding route '/user/login'")
    app.post("/user/login", 
        userController.checkpassword, 
        userController.bakecookie, (req, res) => {
            res.redirect("/user/profile")
        })
})
