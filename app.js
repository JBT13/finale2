const express = require("express")
const path = require("path")
const session = require("express-session")
require("colors")

const frontPage = require("./routes/index")

const app = express()

app.use(express.urlencoded({extended: false}))

//Setting up a static file server images,css 
//parentesis morados = the path to the static file server. 
//path join usa 2 strengi y los une para crear un puente
//_dirname finnur app.js í hvað tölvur sem er 
app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs") // set up ejs the better version of index 

app.use(session({
    secret: 'secret',
    resave: true,
    saveUnitinitialized:true,
}))

//the direction if a user writes /siggi it would send him to siggi
//req=request, request is everything from the user 
//res=response, response is what the web page responds to the user  
app.use("/",frontPage);

app.use((req, res, next ) => {
    const err = new Error("Page Not Found")
    err.status = 404;
    next(err)
})

app.use((err, req, res) => {
    res.status(err.status || 500)
    res.send(err.message)
})

app.listen(3000, () => {
    console.log("Server is running on port 3000.....".green)
})