import React, { useContext } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { db } from "../../Utility/firebase";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { setDoc,collection,doc } from "firebase/firestore";
import { Type } from "../../Utility/action.type";

// import{}
function Payment() {
  const [{ user, basket } ,dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigator =useNavigate()
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      // 1,
      //  backend || functions-- > contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);
      const clintSecret = response.data?.clientSecret;
      // 2,
      // client side (react side confirmation)
      console.log(clintSecret);
      const { paymentIntent } = await stripe.confirmCardPayment(clintSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(paymentIntent);
      // 3,
      // after the confirmation-- > order firestore database save clear basket
      
      await setDoc(
        doc(collection(db, "user"), user.uid, "orders", paymentIntent.id),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigator("/Orders", { state: { meg: "you have placed new Order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={classes.Payment_header}>Checkout ({totalItem}) items</div>
      {/* payment method */}
      <section className={classes.Payment}>
        {/* address */}
        <div className={classes._Flex}>
          <h3>Delivery Address</h3>
          <div>{user?.email}</div>
          <div>123 React Lane</div>
          <div>springfield,va</div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.Flex}>
          <h3>Review items and delivery</h3>
          <div className={classes.image}>
            {basket?.map((item) => (
              <ProductCard Product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.Flex}>
          <h3>Payment methods</h3>
          <div className={classes.Payment_card_container}>
            <div className={classes.Payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ colors: "red" }}>{cardError}</small>
                )}
                {/* card elment */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.Payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader colors="gray" size={12} />
                        <p>please Wait...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
