import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


const OrderHistory = () => {


  const { orders } = useCart();



  if(orders.length === 0){


    return (

      <div className="container">

        <div className="empty-state">


          <span className="empty-icon">
            📦
          </span>


          <h3>
            No Orders Found
          </h3>


          <p>
            You haven't placed any orders yet.
          </p>



          <Link
            to="/menu"
            className="btn btn-primary"
          >
            Order Now
          </Link>


        </div>


      </div>

    );


  }





  return (


    <div className="container"
    style={{marginTop:"1rem"}}>


      <h2 className="section-title">
        My Orders
      </h2>




      {
        orders.map(order=>(


          <div
          key={order.id}
          className="summary-panel"
          style={{marginBottom:"15px"}}
          >



            <h3>
              #{order.id}
            </h3>



            <p>
              Date: {order.timestamp}
            </p>



            <p>
              Status:
              <b> {order.status}</b>
            </p>



            <p>
              Total:
              <b> ₹{order.totalAmount}</b>
            </p>





            <h4>
              Items
            </h4>




            {
              order.items.map(item=>(


                <p key={item.id}>

                  {item.name} × {item.quantity}

                </p>


              ))
            }



          </div>


        ))
      }



    </div>


  );

};



export default OrderHistory;