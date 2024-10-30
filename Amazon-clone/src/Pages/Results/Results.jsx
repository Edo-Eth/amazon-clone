import React, { useEffect, useState } from 'react'
import classes from "./Results.module.css"
import LayOut from '../../components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/Endpoint'
import ProductCard from '../../components/Product/ProductCard'
axios
function Results() {
    const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  console.log(categoryName)
    useEffect(() => {
     axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res)=>{
    setResults(res.data)
    }).catch((err) => {
        console.log(err)
    })
        
    }, [])
   console.log(results)
    return (
      <LayOut>
            <section>
                <h1 style={{ padding: "30px" }}>Results</h1>
                <p style={{ padding: "30px" }}>category{categoryName} </p>
                <hr />
                <div className={classes.Products_container}>
                    {results?.map((product) => (
                     <ProductCard key={product.id} Product={product}renderDesc={false}renderAdd={true} />

                    ))}
          </div>
        </section>
      </LayOut>
    );
}

export default Results

