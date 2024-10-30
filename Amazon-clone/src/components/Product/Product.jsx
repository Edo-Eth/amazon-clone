import React,{ useEffect, useState } from 'react'
import axios from "axios"
import ProductCard from '../Product/ProductCard'
import classes from "./Product.module.css"
import Loader from '../Loader/Loader'


function Product() {
  const [Products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading to true

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false); // Set isLoading to false on successful data fetch
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Set isLoading to false on error
      });
  }, []);

  return (
    <>
      
        {isLoading ? (
          <Loader /> // Show the loader while fetching data
        ) : (
          <section className={classes.Products_container}>
            {Products?.map((singleProduct) => (
              <ProductCard
                renderAdd={true}
                Product={singleProduct}
                key={singleProduct.id} 
                
              />
            ))}
          </section>
        )}
      
    </>
  );
}

export default Product;