import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import OrderHistory from "./pages/OrderHistory";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Menu from './pages/Menu';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';

import NotFound from './pages/NotFound';
import Profile from "./pages/profile";


function AppContent(){

const {toasts}=useCart();


return(

<div className="app-container">


<div className="toast-container">

{
toasts.map((toast,index)=>(

<div 
key={index}
className={`toast ${toast.type}`}
>

{toast.message}

</div>

))
}

</div>



<Navbar />


<main className="main-content">


<Routes>


<Route path="/" element={<Home />} />


<Route path="/menu" element={<Menu />} />


<Route path="/signin" element={<SignIn />} />


<Route path="/signup" element={<SignUp />} />


<Route path="/cart" element={<Cart />} />



<Route
path="/orders"
element={<OrderHistory />}
/>

<Route 
path="/order-confirmation/:orderId" 
element={<OrderConfirmation />} 
/>



<Route 
path="/profile" 
element={<Profile/>}
/>



<Route path="*" element={<NotFound />} />


</Routes>


</main>


<Footer />


</div>

)

}



function App(){

return(

<AuthProvider>

<CartProvider>

<Router>

<AppContent />

</Router>

</CartProvider>

</AuthProvider>

)

}


export default App;