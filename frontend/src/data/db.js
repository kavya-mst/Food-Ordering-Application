const DB_NAME = "BiteSpeedDB";
const DB_VERSION = 1;


// Initialize DB
export const initDB = () => {

  return new Promise((resolve, reject)=>{

    const request = indexedDB.open(
      DB_NAME,
      DB_VERSION
    );


    request.onerror = (e)=>{
      reject(e.target.error);
    };


    request.onsuccess = (e)=>{
      resolve(e.target.result);
    };


    request.onupgradeneeded = (e)=>{

      const db = e.target.result;


      if(!db.objectStoreNames.contains("users")){

        db.createObjectStore(
          "users",
          {
            keyPath:"email"
          }
        );

      }



      if(!db.objectStoreNames.contains("orders")){

        db.createObjectStore(
          "orders",
          {
            keyPath:"id"
          }
        );

      }

    };


  });

};






// SAVE ORDER

export const saveOrderInDB = async(order)=>{


const db = await initDB();


return new Promise((resolve,reject)=>{


const tx =
db.transaction(
"orders",
"readwrite"
);



const store =
tx.objectStore("orders");



const request =
store.add(order);



request.onsuccess = ()=>{

resolve(true);

};



request.onerror=(e)=>{

reject(e.target.error);

};



});


};








// GET ALL ORDERS

export const getAllOrdersFromDB = async()=>{


const db = await initDB();


return new Promise((resolve,reject)=>{


const tx =
db.transaction(
"orders",
"readonly"
);



const store =
tx.objectStore("orders");



const request =
store.getAll();



request.onsuccess = ()=>{


resolve(
request.result || []
);


};



request.onerror=(e)=>{

reject(e.target.error);

};


});


};








// GET USER ORDERS

export const getOrdersByUser = async(email)=>{


const orders =
await getAllOrdersFromDB();



return orders.filter(
(order)=>
order.userEmail === email
);


};









// UPDATE ORDER


export const updateOrderInDB = async(order)=>{


const db = await initDB();


return new Promise((resolve,reject)=>{


const tx =
db.transaction(
"orders",
"readwrite"
);



const store =
tx.objectStore("orders");



const request =
store.put(order);



request.onsuccess=()=>{

resolve(true);

};



request.onerror=(e)=>{

reject(e.target.error);

};


});


};