import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '/components/Navbar.jsx';
import Footer from '/components/Footer.jsx';
import { Product, FooterBanner, HeroBanner, LoginPage, SignupPage } from '../components';

const Layoutv2 = (props) => {
  console.log(props);

  return (
    <div>
       
        <div className="products-heading">
          <h2>Best Seller Products</h2>
          <p>speaker There are many variations passages</p>
        </div>
  
        <div className="products-container">
          {props.products?.map((product) => <Product key={product._id} product={product} />)}
        </div>
  
        
      </div>
    );
  }
  
  

export default Layoutv2;
