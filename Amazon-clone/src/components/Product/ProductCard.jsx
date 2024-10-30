
import Rating from "@mui/material/Rating"
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import classes from "./Product.module.css"
 import { DataContext } from '../DataProvider/DataProvider'
 import { Type } from '../../Utility/action.type'
 import { useContext } from 'react'
import { Link } from "react-router-dom"

function ProductCard({ Product, flex, renderDesc, renderAdd }) {
  console.log(Product)
  const { image, title, id, rating, price, description } = Product;

  const [state, dispatch] = useContext(DataContext);

  const addTocart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <div
      className={`${classes.card_container}${
        flex ? classes.Product_flexed : ""
      }`}
    >
      <Link to={`/Products/${id}`}>
        <img src={image} alt=""/>
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750" }}>{description}</div>}
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* count */}
          <small>{rating?.count}</small>
        </div>

        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addTocart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard
