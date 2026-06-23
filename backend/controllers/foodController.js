const Food = require("../models/Food");


// CREATE

exports.createFood = async(req,res)=>{

try{

const food = await Food.create(req.body);

res.json(food);

}
catch(err){

res.status(500).json({
message:err.message
});

}

}



// GET ALL

exports.getFoods = async(req,res)=>{

const foods = await Food.find();

res.json(foods);

}



// GET ONE

exports.getFoodById = async(req,res)=>{

const food = await Food.findById(req.params.id);

res.json(food);

}



// UPDATE PUT

exports.updateFood = async(req,res)=>{

const food = await Food.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);

res.json(food);

}



// PATCH

exports.patchFood = async(req,res)=>{

const food = await Food.findByIdAndUpdate(

req.params.id,

{
$set:req.body
},

{
new:true
}

);

res.json(food);

}



// DELETE

exports.deleteFood = async(req,res)=>{

await Food.findByIdAndDelete(req.params.id);


res.json({

message:"Food deleted"

});

}