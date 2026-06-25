const mongoose=require("mongoose");


const foodSchema=new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  rating: Number,
  category: String,
  image: String
});

module.exports = mongoose.model("Food", foodSchema);