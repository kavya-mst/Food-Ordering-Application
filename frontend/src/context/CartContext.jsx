import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback
} from 'react';

import { useAuth } from './AuthContext';

import {
    saveOrderInDB,
    getOrdersByUser,
    updateOrderInDB,
    getAllOrdersFromDB
} from '../data/db';


const CartContext = createContext(null);



export const CartProvider = ({ children }) => {

    const { currentUser } = useAuth();

    const [cartItems, setCartItems] = useState([]);

    const [orders, setOrders] = useState([]);

    const [toasts, setToasts] = useState([]);

    const resolveItemId = (item) =>
        item?.id ?? item?._id ?? `${item?.name}-${item?.price}`;






    // Toast

    const addToast = useCallback(
        (message, type = "success") => {


            const id = Date.now();



            setToasts(prev => [

                ...prev,

                { id, message, type }

            ]);



            setTimeout(() => {


                setToasts(prev =>

                    prev.filter(t => t.id !== id)

                );


            }, 3000);



        }, []);






    const removeToast = useCallback((id) => {


        setToasts(prev =>

            prev.filter(t => t.id !== id)

        );


    }, []);








    // Load Cart


    useEffect(() => {


        const savedCart =

            localStorage.getItem("cart");



        if (savedCart) {


            setCartItems(

                JSON.parse(savedCart)

            );


        }



    }, []);








    const saveCart = (items) => {


        setCartItems(items);



        localStorage.setItem(

            "cart",

            JSON.stringify(items)

        );



    };









    // Add Cart


    const addToCart = (item) => {
        if (!currentUser) {
            addToast(
                'Please sign in before adding items to your cart.',
                'error'
            );
            return;
        }

        const itemId = resolveItemId(item);

        const index =

            cartItems.findIndex(

                ci => ci.id === itemId

            );



        let updated;



        if (index > -1) {


            updated = [...cartItems];


            updated[index].quantity += 1;



        }

        else {

            updated = [

                ...cartItems,

                {

                    ...item,

                    id: itemId,

                    quantity: 1

                }

            ];


        }




        saveCart(updated);



        addToast(

            `${item.name} added to cart!`

        );



    };









    // Remove Cart


    const removeFromCart = (itemId) => {


        const item =

            cartItems.find(

                i => i.id === itemId

            );



        const updated =

            cartItems.filter(

                ci => ci.id !== itemId

            );



        saveCart(updated);




        if (item) {


            addToast(

                `${item.name} removed.`,

                "info"

            );


        }



    };









    // Update Quantity


    const updateQuantity = (itemId, quantity) => {



        if (quantity <= 0) {


            removeFromCart(itemId);

            return;


        }



        const updated =

            cartItems.map(ci => {



                if (ci.id === itemId) {


                    return {

                        ...ci,

                        quantity: Number(quantity)

                    };


                }



                return ci;



            });




        saveCart(updated);



    };








    // Clear


    const clearCart = () => {


        saveCart([]);


    };





    const clearCartOnLogout = () => {


        setCartItems([]);


        localStorage.removeItem("cart");


    };









    // Calculations


    const cartCount =

        cartItems.reduce(

            (acc, i) => acc + i.quantity,

            0

        );



    const cartSubtotal =

        cartItems.reduce(

            (acc, i) =>

                acc + i.price * i.quantity,

            0

        );



    const deliveryFee =

        cartSubtotal > 0 ? 40 : 0;



    const tax =

        Math.round(cartSubtotal * 0.05);



    const cartTotal =

        cartSubtotal + deliveryFee + tax;









    // Orders



    const getUserOrders = (email) => {


        return orders.filter(

            (order) =>

                order.userEmail === email

        );


    };







    const loadOrders = useCallback(async () => {


        try {


            const currentUser =

                JSON.parse(

                    localStorage.getItem("currentUser")

                );



            if (currentUser) {


                const dbOrders =

                    await getOrdersByUser(

                        currentUser.email

                    );




                dbOrders.sort(

                    (a, b) =>

                        b.placedAt - a.placedAt

                );



                setOrders(dbOrders);


            }



        }

        catch (err) {


            console.error(err);


        }



    }, []);







    useEffect(() => {


        loadOrders();



    }, [loadOrders]);









    // Place Order


    const placeOrder = async (

        items,

        totalAmount,

        shippingDetails

    ) => {



        const orderId =

            `BITE-${Math.floor(

                100000 +

                Math.random() * 900000

            )}`;



        const newOrder = {



            id: orderId,


            items,


            totalAmount,


            shippingDetails,



            userEmail:

                JSON.parse(localStorage.getItem("currentUser"))?.email || shippingDetails?.email || "",



            status: "Order Received",



            placedAt: Date.now(),



            timestamp:

                new Date().toLocaleString(),




            statusTimeline: [


                {

                    status: "Order Received",

                    time:

                        new Date().toLocaleTimeString()

                }


            ]



        };





        try {



            await saveOrderInDB(newOrder);



            await loadOrders();




            addToast(

                `Order placed! ID:${orderId}`,

                "success"

            );



            return orderId;



        }

        catch (err) {



            addToast(

                "Order placement failed.",

                "error"

            );



            throw err;



        }




    };










    return (



        <CartContext.Provider


            value={{


                cartItems,


                addToCart,


                removeFromCart,


                updateQuantity,


                clearCart,


                clearCartOnLogout,



                cartCount,


                cartSubtotal,


                deliveryFee,


                tax,


                cartTotal,



                orders,


                placeOrder,


                getUserOrders,


                loadOrders,



                addToast,


                toasts,


                removeToast


            }}


        >


            {children}




            <div className="toast-container">


                {

                    toasts.map(t => (


                        <div

                            key={t.id}

                            className={`toast toast-${t.type}`}

                        >


                            <span>

                                {t.message}

                            </span>




                            <button

                                className="toast-close-btn"

                                onClick={() => removeToast(t.id)}

                            >

                                ×

                            </button>



                        </div>



                    ))


                }




            </div>




        </CartContext.Provider>


    );



};








export const useCart = () => {


    const context =

        useContext(CartContext);



    if (!context) {


        throw new Error(

            "useCart must be used within CartProvider"

        );


    }



    return context;



};