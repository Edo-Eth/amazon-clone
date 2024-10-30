import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from './Pages/Landing/Landing';
import Cart from "./Pages/Cart/Cart" 
import Orders from './Pages/Orders/Orders';
import Payment from './Pages/Payment/Payment';
import Results from './Pages/Results/Results';
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Auth from './Pages/Auth/Auth';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from './components/PotectedRoute/ProtectedRoute';

const stripePromise = loadStripe("pk_test_51Q2fFZHccRrlx29ps5IZDY61lzj77IPjtQrVSqfwwHBcj6xWlV8wl9uLtIddqI32tZaYppAkEoSHT6s0cpKMbSg500yZ58NRGy");
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"you must log in to pay "}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/Orders" element={
          <ProtectedRoute
            msg={"you must log in to  access your orders "}
            redirect={"/orders"}
          >
            <Orders />
          </ProtectedRoute>
        }/>
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing