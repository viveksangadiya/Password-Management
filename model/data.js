const mongoose=require('mongoose');

const Schema=mongoose.Schema

const dataSchema=new Schema({
    name:String,
    siteURL:String,
    siteImgURL:String
})

module.exports=mongoose.model('password',dataSchema,'password')