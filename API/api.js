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
            siteName:req.body.siteName,
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

router.put('/UpdatePassword/:id', async function(req, res) {
    const id = req.params.id;
    try {
      const password = await Password.findById(id);
      if (!password) {
        return res.status(404).json({message: 'Password not found'});
      }
      password.siteName = req.body.siteName;
      password.siteURL = req.body.siteURL;
      password.siteImgURL = req.body.siteImgURL;
      const updatedPassword = await password.save();
      res.status(200).json(updatedPassword);
    } catch (error) {
      res.status(400).json({message:error.message});
    }
})

router.delete('/DeletePasswords/:id', async function(req, res) {
    const id = req.params.id;
    try {
      const password = await Password.findById(id);
      if (!password) {
        return res.status(404).json({message: 'Password not found'});
      }
      const deletedPassword = await password.remove();
      res.status(200).json({message: 'Password deleted', data: deletedPassword});
    } catch (error) {
      res.status(400).json({message:error.message});
    }
  })
module.exports=router;


// http://localhost:4000/api/DeletePasswords/