const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");



// REGISTER

exports.register = async(req,res)=>{

try{

const {name,email,password,role}=req.body;


const existUser = await User.findOne({email});


if(existUser){

return res.status(400).json({
message:"User already exists"
})

}


const hashPassword = await bcrypt.hash(password,10);



const user = await User.create({

name,

email,

password:hashPassword,

role: role || "user"

});


res.json({

message:"Register successful",

user

});


}
catch(err){

res.status(500).json({

message:err.message

})

}

}







// LOGIN


exports.login = async(req,res)=>{

try{


const {email,password}=req.body;



const user = await User.findOne({email});



if(!user){

return res.status(404).json({

message:"User not found"

})

}



const match = await bcrypt.compare(

password,

user.password

);



if(!match){

return res.status(400).json({

message:"Wrong password"

})

}





const token = jwt.sign(

{

id:user._id,

role:user.role

},

process.env.JWT_SECRET,

{

expiresIn:"1d"

}

);



res.json({

message:"Login successful",

token,

name:user.name,

email:user.email,

role:user.role

});


}


catch(err){

res.status(500).json({

message:err.message

})

}


}








// GET PROFILE


exports.getProfile = async(req,res)=>{

try{


const user = await User.findById(req.user.id)
.select("-password");


res.json(user);



}

catch(err){

res.status(500).json({

message:err.message

})

}


}







// UPDATE PROFILE SETTINGS


exports.updateSettings = async(req,res)=>{

try{


const {theme,vegMode}=req.body;



const user = await User.findByIdAndUpdate(

req.user.id,

{

theme,

vegMode

},

{

new:true

}

);



res.json({

message:"Settings updated",

user

});


}

catch(err){

res.status(500).json({

message:err.message

})

}

}
// DELETE ACCOUNT

exports.deleteAccount = async(req,res)=>{

try{


await User.findByIdAndDelete(req.user.id);


res.json({

message:"Account deleted successfully"

});


}

catch(err){

res.status(500).json({

message:err.message

})

}

}