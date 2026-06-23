import React,{useEffect,useState} from "react";
import axios from "axios";
import {useAuth} from "../context/AuthContext";
import {useCart} from "../context/CartContext";
import {useNavigate} from "react-router-dom";


function Profile(){

const [user,setUser]=useState({});
const [dark,setDark]=useState(false);

const {logoutUser}=useAuth();

const {
getUserOrders
}=useCart();


const navigate=useNavigate();



useEffect(()=>{

getProfile();

},[]);





const getProfile=async()=>{

try{


const token =
localStorage.getItem("token");



const res =
await axios.get(
"http://localhost:5001/api/auth/profile",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);



setUser(res.data);


setDark(
res.data.theme==="dark"
);



}
catch(err){

console.log(err);

}

};







const changeTheme=()=>{


const value =
!dark;


setDark(value);



document.body.className =
value ? "dark" : "";



updateSettings(
value ? "dark":"light"
);



};








const updateSettings=async(theme)=>{


try{


const token =
localStorage.getItem("token");



await axios.put(

"http://localhost:5001/api/auth/settings",

{
theme
},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);



}
catch(err){

console.log(err);

}


};








const deleteAccount=async()=>{


try{


const token =
localStorage.getItem("token");



await axios.delete(

"http://localhost:5001/api/auth/delete-account",

{

headers:{
Authorization:`Bearer ${token}`
}

}

);



localStorage.removeItem("token");


logoutUser();


navigate("/");



}
catch(err){

console.log(err);

}


};








const userOrders =
getUserOrders(user.email);








return(

<div className="profile-page">


<div className="profile-card">



<div className="profile-header">

<div className="profile-avatar">
{
user.name?.charAt(0)
}
</div>


<h2>
My Profile
</h2>

</div>






<div className="profile-info">


<h3>
{user.name}
</h3>


<p>
{user.email}
</p>


</div>







<div className="profile-actions">



<button
className="btn btn-secondary"
onClick={changeTheme}
>

🌙 
{
dark?
"Light Mode":
"Dark Mode"
}


</button>





<div className="profile-orders">


<h3>
📦 Your Orders
</h3>



{
userOrders.length===0?

<p className="no-orders">
No orders yet
</p>


:

userOrders.map(order=>(


<div 
className="order-card"
key={order.id}
>


<p>
Order ID:
<b>
{order.id}
</b>
</p>


<p>
Amount:
₹{order.totalAmount}
</p>


<p>
Status:
<span>
{order.status}
</span>
</p>



</div>


))

}




</div>








<button

className="btn btn-danger"

onClick={deleteAccount}

>

🗑 Delete Account

</button>







<button

className="btn btn-primary"

onClick={()=>{

logoutUser();

navigate("/");

}}

>

🚪 Logout

</button>





</div>





</div>


</div>


)


}


export default Profile;