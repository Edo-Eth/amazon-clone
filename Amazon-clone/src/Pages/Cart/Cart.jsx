import LayOut from '../../components/LayOut/LayOut'
import ProductCard from '../../components/Product/ProductCard';
import { useContext } from 'react';
import { DataContext } from '../../components/DataProvider/DataProvider';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import classes from "./Cart.module.css"
import { Type } from "../../Utility/action.type";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  console.log(basket)
  const total = basket.reduce((amount, item) => {
  return  item.price * item.amount + amount

  }, 0)

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
  })
}
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    })
  }
    
  console.log(basket);
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping basket</h3>
          <hr />

          {basket?.length == 0 ? (
            <p>Opps ! No item in your cart</p>
          ) : (
  
            basket?.map((item) => (
              <section className={classes.cart_product}>
                <ProductCard
                  key={item.id}
                  Product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className={classes.btn_container}>
                  <button
                    className={classes.btn}
                    onClick={() => increment(item)}
                  >
                    <IoMdArrowDropup size={25} />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <IoMdArrowDropdown size={25} />
                  </button>
                </div>
                </section>
              
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal({basket?.length} items) </p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This Order contains a gift</small>
            </span>
            <Link to="/payments"> Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart

