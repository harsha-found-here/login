const { name } = require("ejs");
const mongoose=require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/AforApple");

// checking if the database is connected or not .

connect.then(()=>{
    console.log("Database is connected");
})

.catch(()=>{
    console.log("Database cannot be connectd");
})

const Loginschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
});

const collection= new mongoose.model("users",Loginschema);
module.exports=collection;