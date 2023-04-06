const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors')
const app=express();
const api=require('./API/api')

app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

const PORT=3000;

app.get('/',function(req,res){
    res.send("hello this is server");
})

app.listen(PORT,function(req,res){
    console.log("server is running on port no :" + PORT);
})

app.use('/api',api)