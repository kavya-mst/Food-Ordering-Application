import React,{useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {useCart} from '../context/CartContext';


const SignUp=()=>{


const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");

const [errors,setErrors]=useState({});


const {registerUser}=useAuth();

const {addToast}=useCart();

const navigate=useNavigate();




const validate=()=>{


const tempErrors={};



if(!name.trim()){

tempErrors.name="Full Name is required";

}



if(!email.trim()){

tempErrors.email="Email is required";

}
else if(!/\S+@\S+\.\S+/.test(email.trim())){

tempErrors.email="Email is invalid";

}




if(!password){

tempErrors.password="Password is required";

}
else if(password.length<6){

tempErrors.password="Password must be at least 6 characters";

}




if(password!==confirmPassword){

tempErrors.confirmPassword="Passwords do not match";

}



setErrors(tempErrors);


return Object.keys(tempErrors).length===0;


}





const handleSubmit=async(e)=>{


e.preventDefault();



if(validate()){


const res=await registerUser(

name.trim(),

email.trim(),

password

);



console.log(res);



if(res.success){


addToast(

"User registered successfully",

"success"

);


navigate("/signin");


}
else{


addToast(

res.message,

"error"

);


}


}
else{


addToast(

"Please resolve validation errors",

"error"

);


}



}





return(

<div className="auth-page">


<div className="auth-card">


<div className="auth-header">


<h2>Create Account</h2>


<p>Register to start ordering food today</p>


</div>





<form onSubmit={handleSubmit}>


<div className="form-group">


<label>Full Name</label>


<input

type="text"

value={name}

placeholder="Enter name"

onChange={(e)=>setName(e.target.value)}

/>


<p>{errors.name}</p>


</div>







<div className="form-group">


<label>Email</label>


<input

type="email"

value={email}

placeholder="Enter email"

onChange={(e)=>setEmail(e.target.value)}

/>


<p>{errors.email}</p>


</div>







<div className="form-group">


<label>Password</label>


<input

type="password"

value={password}

placeholder="Enter password"

onChange={(e)=>setPassword(e.target.value)}

/>


<p>{errors.password}</p>


</div>







<div className="form-group">


<label>Confirm Password</label>


<input

type="password"

value={confirmPassword}

placeholder="Confirm password"

onChange={(e)=>setConfirmPassword(e.target.value)}

/>


<p>{errors.confirmPassword}</p>


</div>







<button

type="submit"

className="btn btn-primary btn-block"

>

Register Now

</button>




</form>







<div className="auth-footer">


Already have account?


<Link to="/signin">

Login here

</Link>


</div>



</div>


</div>

)

}



export default SignUp;