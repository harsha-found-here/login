const express=require('express');
const path=require('path');
const bcrypt=require('bcrypt');
const exp = require('constants');
const collection= require("./config");
const { name } = require('ejs');

const app=express();
 
//conveting data into json format
app.use(express.json());

app.use(express.urlencoded( {extended:false}))
app.set('view engine','ejs');

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async(req, res)=>{
   const data= {
    name: req.body.username,
    password:req.body.password
   }

   const existinguser= await collection.findOne({name: data.name});
   if(existinguser){
      res.send("user already exists. Please choose a different username.")
      res.render("home")
    }
   else{
   const slatRounds =10;
   const hashedpassword = await bcrypt.hash(data.password, slatRounds);
   res.render("home")

   data.password= hashedpassword;
   const userdata=await collection.insertMany(data);
   console.log(userdata);
}
});

app.post("/login", async (req,res)=>{
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user doesn't exist");
        }
        const ispasswordmatch=await bcrypt.compare(req.body.password, check.password);
       if(!ispasswordmatch){
        res.render("home")
       }else {
        req.send("Wrong Password");
       }
    }
    catch{
       res.send("Incorrect password or username :)")
    }
})

const port=4002;
app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
});