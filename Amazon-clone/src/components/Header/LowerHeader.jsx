import React from 'react'
import classes from "../Header/Header.module.css";
import { AiOutlineMenu } from "react-icons/ai";
function LowerHeader() {
  return (

    <div className={classes.lower_container}>
      <ul>
        <li>
        <AiOutlineMenu />
        <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Costumer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader
