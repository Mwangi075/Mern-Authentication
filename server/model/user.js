const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    email:{
        type: String,
        unique:true,
        required: true,
        min: 10,
        max: 100
    },
    username:{type:String, unique:true},
    password:{
        type: String,
        required: true,
        min: 8,
        max: 100

    },
});

module.exports=mongoose.model('user',userSchema);