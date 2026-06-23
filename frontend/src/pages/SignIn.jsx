import React,{useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {useCart} from '../context/CartContext';

const SignIn=()=>{

const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [rememberMe,setRememberMe]=useState(false);
const [errors,setErrors]=useState({});

const {loginUser}=useAuth();
const {addToast}=useCart();
const navigate=useNavigate();


const validate=()=>{

const tempErrors={};

if(!email.trim()){
tempErrors.email='Email is required';
}
else if(!/\S+@\S+\.\S+/.test(email.trim())){
tempErrors.email='Email is invalid';
}

if(!password){
tempErrors.password='Password is required';
}
else if(password.length<6){
tempErrors.password='Password must be at least 6 characters';
}

setErrors(tempErrors);

return Object.keys(tempErrors).length===0;

};


const handleSubmit=async(e)=>{

e.preventDefault();

if(validate()){

const res=await loginUser(
email.trim(),
password
);

if(res.success){

addToast(res.message,'success');
navigate('/');

}
else{

addToast(res.message,'error');

}

}
else{

addToast(
'Please fix the errors in the form.',
'error'
);

}

};


return(

<div className="auth-page">

<div className="auth-card">

<div className="auth-header">

<h2>Welcome Back</h2>

<p>Sign in to order your favorite hot food</p>

</div>


<form onSubmit={handleSubmit}>


<div className="form-group">

<label>Email Address</label>

<input
type="email"
placeholder="e.g. college@student.edu"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<p>{errors.email}</p>

</div>


<div className="form-group">

<label>Password</label>

<input
type="password"
placeholder="••••••••"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<p>{errors.password}</p>

</div>


<div className="form-group form-checkbox">

<input
type="checkbox"
checked={rememberMe}
onChange={(e)=>setRememberMe(e.target.checked)}
/>

<label>Remember me on this browser</label>

</div>


<button
type="submit"
className="btn btn-primary btn-block"
>

Sign In

</button>


</form>


<div className="auth-footer">

Don't have an account?

<Link to="/signup">
Register here
</Link>

</div>


</div>

</div>

)

}

export default SignIn;