require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");


const app = express();


connectDB();


app.use(cors());

app.use(express.json());


app.use("/api/auth", authRoutes);

app.use("/api/foods", foodRoutes);

app.use("/api/orders", orderRoutes);



app.get("/",(req,res)=>{

res.send("Food Order API Running");

});


const PORT = process.env.PORT || 5007;


app.listen(PORT,()=>{

console.log(`Server Running On Port ${PORT}`);

});