const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({

user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},


items:[{

food:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Food"
},

quantity:Number

}],


totalPrice:Number,


status:{
    type:String,
    default:"Pending"
}


});


module.exports = mongoose.model("Order",orderSchema);