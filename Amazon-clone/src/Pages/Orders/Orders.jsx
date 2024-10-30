import React, { useContext, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
 import { collection,query,orderBy,onSnapshot } from "firebase/firestore";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [Orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
     
      const ordersRef = collection(db, "user", user.uid, "orders");
      const ordersQuery = query(ordersRef, orderBy("created", "desc"));
      const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
        // console.log(snapshot);
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      setOrders([]);
    }
    console.log(Orders);
   
  }, []);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.Orders__container}>
          <h2>Your Orders</h2>
          {Orders?.length == 0 && <div>You don't have orders yet.</div>}
          <div>
            {Orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID:{eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((Order) => (
                    <ProductCard flex={true} Product={Order} key={Order.id} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
