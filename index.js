const express = require("express")
const path = require("path")
const multer = require("multer");

// const upload = multer({dest: "uploads/"}); //"upload" is now a Middleware.
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({storage}); //"upload" is now a Middleware.

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

//Middleware
app.use(express.urlencoded({extended:true})); //Kyuki FORM data ko PARSE krna h to this is cumpulsory

app.get("/", (req,res)=>{
    res.render("home");
});

app.post("/upload", upload.single("profileImage"), (req, res)=>{
    console.log(req.body)
    console.log(req.file)
    res.redirect("/")
})

app.listen(1000, ()=>{console.log("Server Started:",1000)})