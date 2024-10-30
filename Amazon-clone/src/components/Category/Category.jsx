import React from 'react'
import { CategoryImg } from "./CategoryBox"
import CategoryCard from "./CategoryCard"
import classes from "./category.module.css";
console.log(CategoryImg);
function Category() {
  return (
    <div>
      <section className={classes.Category_container}>
        
        {CategoryImg.map((infos) =>(
          <CategoryCard key={infos.id} data={infos}/>
        ))}
      </section>
    </div>
  );
}

export default Category;
