const express =require("express");
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
const SeniorUnitRoutes = require('./routes/seniorunit');
const SmallUnitRoutes = require('./routes/smallunit');
const OfficersRoutes = require('./routes/officers')

const url = 'mongodb://localhost:27017';
const app =express();
const cors = require('cors');
app.use(cors());


const connect = async ()=>{
    try{
        await mongoose.connect(url,{useNewUrlParser:true});
        console.log("Connected to mongoDB")
    }catch(err){
        throw err;
    }
};

app.use(express.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));


//middelware
app.use(express.json());
app.use('/api',SeniorUnitRoutes),
app.use('/api',SmallUnitRoutes),
app.use('/api',OfficersRoutes),





app.listen(4000,()=>{
    connect();
    console.log("backend server is ready");
})