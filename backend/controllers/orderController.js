const Order = require("../models/Order");



// CREATE ORDER

exports.createOrder = async(req,res)=>{

try{


const order = await Order.create({

user:req.user.id,

items:req.body.items,

totalPrice:req.body.totalPrice


});


res.json(order);


}
catch(err){

res.status(500).json({

message:err.message

})

}

}





// GET ALL ORDERS

exports.getOrders = async(req,res)=>{


try{


const orders = await Order.find({

user:req.user.id

}).populate("items.food");


res.json(orders);


}
catch(err){

res.status(500).json({

message:err.message

})

}


}





// GET SINGLE ORDER

exports.getOrderById = async(req,res)=>{


try{


const order = await Order.findById(req.params.id)
.populate("items.food");


if(!order){

return res.status(404).json({

message:"Order not found"

})

}


res.json(order);


}
catch(err){

res.status(500).json({

message:err.message

})

}


}





// UPDATE STATUS (PUT)

exports.updateStatus = async(req,res)=>{


try{


const order = await Order.findByIdAndUpdate(

req.params.id,

{
status:req.body.status
},

{
new:true
}

);



if(!order){

return res.status(404).json({

message:"Order not found"

})

}


res.json(order);


}
catch(err){

res.status(500).json({

message:err.message

})

}


}






// PATCH ORDER

exports.patchOrder = async(req,res)=>{


try{


const order = await Order.findByIdAndUpdate(

req.params.id,

{
$set:req.body
},

{
new:true
}

);


res.json(order);


}
catch(err){

res.status(500).json({

message:err.message

})

}


}







// CANCEL ORDER

exports.cancelOrder = async(req,res)=>{


try{


const order = await Order.findByIdAndUpdate(

req.params.id,

{
status:"Cancelled"
},

{
new:true
}

);


res.json(order);


}
catch(err){

res.status(500).json({

message:err.message

})

}


}








// DELETE ORDER

exports.deleteOrder = async(req,res)=>{


try{


await Order.findByIdAndDelete(req.params.id);



res.json({

message:"Order Deleted"

});


}
catch(err){

res.status(500).json({

message:err.message

})

}


}