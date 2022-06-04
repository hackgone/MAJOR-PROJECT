const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app=express();
const cookieParser = require('cookie-parser');
const { Navigator } = require("node-navigator");
const navigator = new Navigator();
var md5 = require('md5');

const mongoose = require('mongoose');
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

mongoose.connect("mongodb+srv://hackgone:<password>@cluster0.htpkr.mongodb.net/DAM?retryWrites=true&w=majority",{
   useNewUrlParser: true,
   useUnifiedTopology: true
 });

 const all=new mongoose.Schema({
   email:String,
   password:String,
   phone: Number,
   name:String
 });

const newSchema= new mongoose.Schema({
  long: Number,
  lat: Number,
  img: String
});


 const Loc=new mongoose.model("Loc",newSchema);
 const User=new mongoose.model("User",all);
 app.get("/",function (req,res) {
   res.render("home1");

 })

app.get("/reg",function (req,res) {
  res.render("register",{val:"no"});
});

app.post("/signup",function (req,res) {
  const newUser =new User({
      name:req.body.name,
      email:req.body.email,
      password:md5(req.body.password),
      phone:req.body.number
    });
    var data={
     name:req.body.name,
     email:req.body.email,
     phone:req.body.number
    }
    res.cookie("userData",data);
    newUser.save();

  res.render("main");
})


app.post("/login",function (req,res) {
  const username=req.body.email;
  const password=md5(req.body.password);
  User.findOne({email:username},function (err,foundUser) {
   if(err){
     console.log(err);
   }else{
     if(foundUser){
       if(foundUser.password===password){
         var data={
          name:foundUser.name,
          email:foundUser.email,
          phone:foundUser.phone
         }
         res.cookie("userData",data);// added data to cookie
         res.render("main");
       }else{
         res.render("register",{val:"no1"});
       }
     }else{
       res.render("register",{val:"not2"});
     }
   }
 })
});

app.post("/aux",function (req,res) {
  res.redirect("/contibute")
});
app.get("/contibute",function (req,res) {
var arr=[];

  arr.push(req.cookies.userData.name);
  arr.push(req.cookies.userData.email);
  arr.push(req.cookies.userData.phone);
  console.log(arr);
  res.render("contribution",{Arr:arr});

});

app.post("/contri",function (req,res) {
  console.log("hello");
  const myArray = req.body.Message.split(" ");
  const pol=new Loc({
    long :myArray[1],
    lat: myArray[myArray.length-1],
    img : req.body.typeDefect
  });
  console.log(typeof(req.body.typeDefect));
  pol.save();
  res.redirect("/maps");
});

app.get("/demo",function (req,res) {
  res.render("demolocation");

})
app.post("/add",function (req,res) {
  const pol=new Loc({
    long :req.body.longitude,
    lat: req.body.latitude
  });
  pol.save();
  res.redirect("/maps")
})
app.get("/maps",function (req,res) {
  Loc.find({},function (err,foundItems) {
    var items=[];
    for(let i=0;i<foundItems.length;i++){
      items[i]=[foundItems[i].long,foundItems[i].lat,foundItems[i].img];
    }
    console.log(items);
    res.render("maps",{item:items});
  });

})

app.post("/maps",function (req,res) {

  Loc.find({},function (err,foundItems) {
    var items=[];
    for(let i=0;i<foundItems.length;i++){
      items[i]=[foundItems[i].long,foundItems[i].lat,foundItems[i].img];
    }
    res.render("maps",{item:items});
  });
});


app.post("/user",function (req,res) {
  var arr=[];
  arr.push(req.cookies.userData.name);
  arr.push(req.cookies.userData.email);
  arr.push(req.cookies.userData.phone);
  console.log(arr);
  res.render("profile",{Arr:arr});
});

app.post("/logout",function (req,res) {
  res.clearCookie("userData");
  res.redirect("/")
})

app.listen(3000,function () {
  console.log("running");
})
