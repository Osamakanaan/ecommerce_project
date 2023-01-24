import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useState } from 'react';
import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import SearchBar from './SearchBar';
import { Router } from 'next/router';
import LoginPage from './LoginPage';
import LoginButton from './LoginButton';

import { useRouter } from 'next/router';
import { withRouter } from 'next/router'

import Operationsdialog from './Operationsdialog'

const Navbar = (props) => {
  const router = useRouter();
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  console.log(props);
  const isLoggedIn = props.state
  const updateSearchTerm = event => {
    setSearchTerm(event.target.value);
  };
  

  function Button({ children }) {
    return <button>{children}</button>;
  }
  const handleClick = () => {
    router.push('/allproducts');
  };
  return (
    <div className="navbar-container">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        
        <Link href="/">
  <h3
    style={{
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'purple',
    }}
  >
    
    AK Phone Store
  </h3>
</Link>


        
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SearchBar
          className="search"
          searchTerm={searchTerm}
          updateSearchTerm={setSearchTerm}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>

        
        <Operationsdialog/>
        
        
        
        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>
      {showCart && <Cart user={props.user}/>}
    </div>
  );
};

export default Navbar;
