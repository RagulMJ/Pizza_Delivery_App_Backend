const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://SaviSanjay1310:Noodles1310@cluster0.ucor7.mongodb.net/pizza-app'

mongoose.connect(mongoURL , {useUnifiedTopology:true , useNewUrlParser:true})

var db = mongoose.connection

db.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull');
})

db.on('error' , ()=>{
    console.log(`Mongo DB Connection failed`);
})

module.exports =mongoose