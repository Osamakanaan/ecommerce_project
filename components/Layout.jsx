import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';


const Layout = (props) => {
  console.log(props);
  const [user, setUser] = useState('');
  const [state, setState] = useState({});
  return (
    <div className="layout">

      <Head>
        <title>AK Phone</title>
      </Head>
      <header>
        <Navbar  state={props.state} user={props.user}/>
      </header>
      <main className="main-container">
         {props.children}

      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
