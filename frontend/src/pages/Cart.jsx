import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';


const Cart = () => {


  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryFee,
    tax,
    cartTotal,
    placeOrder,
    addToast
  } = useCart();



  const { currentUser } = useAuth();

  const navigate = useNavigate();



  const [address,setAddress] = useState("");
  const [phone,setPhone] = useState("");
  const [paymentMethod,setPaymentMethod] =
  useState("Cash on Delivery");

  const [formErrors,setFormErrors] =
  useState({});





  const validateForm = ()=>{


    let errors={};


    if(!address.trim()){
      errors.address="Address required";
    }


    if(!phone.trim()){
      errors.phone="Phone required";
    }
    else if(!/^\d{10}$/.test(phone)){
      errors.phone="Enter valid 10 digit number";
    }


    setFormErrors(errors);


    return Object.keys(errors).length===0;

  };







  const handleCheckoutSubmit = async(e)=>{


    e.preventDefault();



    if(!currentUser){


      addToast(
        "Please login first",
        "error"
      );


      navigate("/signin");

      return;

    }





    if(!validateForm()){


      addToast(
        "Fill delivery details",
        "error"
      );


      return;

    }







    const shippingDetails={


      name:currentUser.name,

      email:currentUser.email,

      address,

      phone,

      paymentMethod


    };





    try{


      const orderId =
      await placeOrder(
        cartItems,
        cartTotal,
        shippingDetails
      );



      clearCart();



      navigate(
        `/order-confirmation/${orderId}`
      );



    }
    catch(err){

      console.log(err);

    }


  };







  if(cartItems.length===0){


    return(


      <div className="container">


        <div className="empty-state">


          <h3>
          Your Cart is Empty 🛒
          </h3>


          <Link 
          to="/menu"
          className="btn btn-primary"
          >
            Go To Menu
          </Link>


        </div>


      </div>


    );


  }









  return(


<div className="container cart-page">


<h2 className="section-title">
Your Cart
</h2>




<div className="cart-layout">





<div className="cart-items-panel">


<h3>
Items ({cartItems.length})
</h3>




{
cartItems.map(item=>(



<div 
className="cart-item"
key={item.id}
>


<img
src={item.image}
alt={item.name}
className="cart-item-image"
/>



<div className="cart-item-info">

<h4>
{item.name}
</h4>


<p>
₹{item.price}
</p>


</div>





<div className="quantity-controller">


<button
className="quantity-btn"
onClick={()=>
updateQuantity(
item.id,
item.quantity-1
)
}
>
-
</button>



<span className="quantity-value">
{item.quantity}
</span>



<button
className="quantity-btn"
onClick={()=>
updateQuantity(
item.id,
item.quantity+1
)
}
>
+
</button>



</div>





<button

className="btn-remove"

onClick={()=>
removeFromCart(item.id)
}

>

×


</button>



</div>



))

}





<button

className="btn btn-danger btn-sm"

onClick={clearCart}

>

Clear Cart

</button>



</div>









<form

onSubmit={handleCheckoutSubmit}

className="summary-panel"

>



<h3>
Order Summary
</h3>




<p>
Subtotal : ₹{cartSubtotal}
</p>


<p>
Delivery : ₹{deliveryFee}
</p>


<p>
Tax : ₹{tax}
</p>


<h3>
Total : ₹{cartTotal}
</h3>







<h4>
Delivery Details
</h4>





<input

placeholder="Address"

value={address}

onChange={
e=>setAddress(e.target.value)
}

/>


{
formErrors.address &&
<p>
{formErrors.address}
</p>
}







<input

placeholder="Phone"

value={phone}

onChange={
e=>setPhone(
e.target.value.replace(/\D/g,"")
)
}

/>



{
formErrors.phone &&
<p>
{formErrors.phone}
</p>
}






<select

value={paymentMethod}

onChange={
e=>setPaymentMethod(e.target.value)
}

>


<option>
Cash on Delivery
</option>


<option>
UPI
</option>


<option>
Card
</option>


</select>







<button

className="btn btn-primary btn-block"

type="submit"

>

Place Order ₹{cartTotal}

</button>





</form>





</div>





</div>



  );

};



export default Cart;