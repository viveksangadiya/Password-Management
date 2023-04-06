const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const Password=require('../model/data');

const db = "mongodb://0.0.0.0:27017/PasswordManagement";

mongoose.connect(db, err => {
    if (err) throw console.log(err);
    else console.log("successful...")
});

router.get('/', function(req, res) {
    res.send("this is api");
})

router.post('/AddPassword', function(req,res){
    const data=new Password(
        {
            name:req.body.name,
            siteURL:req.body.siteURL,
            siteImgURL:req.body.siteImgURL
        }
    );
    try {
        const dataToSave= data.save();
        res.status(200).send(dataToSave);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})

router.get('/getPassword', async function(req,res){
    try {
        const data=await Password.find();
        res.json(data)
    } catch (error) {
        res.status(500).json('Something went wrong...')
    }
})

module.exports=router;