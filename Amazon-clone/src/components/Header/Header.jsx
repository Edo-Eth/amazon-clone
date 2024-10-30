import React, { useContext } from 'react'
import classes from "../Header/Header.module.css"
import LowerHeader from './LowerHeader';
import { PiShoppingCartLight } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { FaSearch } from "react-icons/fa";
import flag from "../../assets/image/4fe6968b-f727-4a14-b0b6-1d1315a24559.png"
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';

function Header() {

  const [{user, basket }, dispatch ]=useContext(DataContext)
  const totalItem = basket?.reduce((amount, item) => {
   return item.amount + amount
 },0)
  return (
    <section className={classes.fixed_header}>
      <section>
        <div className={classes.header_container}>
          {/* logo section */}
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon log"
              />
            </Link>
            {/* delivery section */}
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>USA</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            {/* search secthion */}
            <select name="" id="">
              <option value="">All</option>
               <option value="">Electronics</option>
              <option value="">Men</option>
              <option value="">women</option>
              <option value="">Jewelery</option> 
            </select>
            <input type="text" />
            {/* icon */}
            <FaSearch size={38} />
          </div>

          {/* Right side link */}
          <div className={classes.order_container}>
            <Link to="/" className={classes.language}>
              <img src={flag} alt="" />
              <select>
                <option value="">EN</option>
              </select>
            </Link>
            {/* three components */}
            <Link to={!user && "/Auth"}>
              <div>
                {user ? (
                  <>
                    <p> Hello{user?.email?.split("@")[0]}</p>
                    <span  onClick={()=>auth.signOut()}>signOut</span>
                  </>
                ) : (
                  <>
                    <p> Hello,Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>

            {/* Orders */}
            <Link to="/Orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            {/* Cart */}
            <Link to="/Cart" className={classes.cart}>
              <PiShoppingCartLight size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
        <LowerHeader />
      </section>
    </section>
  );
}

export default Header

  