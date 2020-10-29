const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const path=require('path')
//middleware
app.use(express.json());
app.use(cors());


//import routes
const authRoutes=require('./routes/auth');


require('dotenv').config();

//connect to db
mongoose.connect(process.env.DATABASE_URL,
{ useNewUrlParser: true ,
 useUnifiedTopology: true,
useCreateIndex:true },
()=>console.log("connected to db successifully"));




//routes middleware
app.use('/api/user',authRoutes);


if(process.env.NODE_ENV ==='production'){
    app.use(express.static('frontend/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'frontend','build','index.html'));
    });
}


const PORT=process.env.PORT || 3000;


app.listen(PORT,()=>console.log("the server is up and running on port 3000"));