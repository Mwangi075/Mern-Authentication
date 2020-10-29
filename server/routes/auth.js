const router=require('express').Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const auth=require('../middleware/authmid');
const User=require('../model/user');
const user = require('../model/user');


router.post('/register',async(req,res)=>{
    try{
    let{email,username,password,passwordcheck}=req.body;
    //validation
    
    if(!email  || !password || !passwordcheck)
        return res.status(400).json({msg:"please fill all the fields"});
    
    if(password.length < 8){
       return res.status(400).json({msg:"password should be atleast 8 character long"});
    }
    if(password !== passwordcheck)
       return res.status(400).json({msg:"please enter the same password"});

       const exsistingEmail= await User.findOne({email:email});
       if(exsistingEmail)
       return res.status(400).json({msg:"This email has an account already"});

       if(!username)
       username=email;

       const salt=await bcrypt.genSalt();
       const passwordhash=await bcrypt.hash(password,salt);
       
       const newUser=new User({
           email,
           password:passwordhash,
           username
           
       });
       const savedUser=await newUser.save();
       console.log 
       res.json(savedUser);
}catch(err){
 res.status(500).json({error:err.message});
}
});
//creating a login router
try{
router.post('/login',async(req,res)=>{
const{email,password}=req.body
//validate
if(!email || !password)
return res.status(400).json({msg:"please fill all the fields"});
const user=await User.findOne({email:email});
if(!user)
return res.status(400).json({msg:"The account does not exsist"});
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch)
return res.status(400).json({msg:"You entered the wrong password"});
const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
res.json({
    token,
    user:{
        id:user._id,
        username:user.username,
        
    }
})
});
}catch(err){
    res.status(500).json({error:err.message});
}

//deleting account route
router.delete('/delete', auth,async(req,res)=>{
try{
const deletedUser=await user.findByIdAndDelete(req.user);
res.json(deletedUser);
}catch(err){
    res.status(500).json({error:err.message});
}

});
router.post('/tokenisvalid',auth,async(req,res)=>{
    try{
        const token=req.header("x-auth-token");
        if(!token)
          return res.status(401).json(false);

        const verified=jwt.verify(token,process.env.JWT_SECRET);
        if(!verified)
        return res.status(401).json(false);
        const user=await User.findById(verified.id);
        if(!user) return res.json(false);
        
        return res.json(true);
    }catch(err){
    res.status(500).json({error:err.message});
}
});
router.get('/',auth,async(req,res)=>{
    const user=await User.findById(req.user);
    res.json({
        username:user.username,
        id:user._id
    });
});





module.exports=router;