import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';

import '../styles/globals.css';
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  const [logged, setlogged] = React.useState();
  const [user, setuser] = React.useState();
  //console.log(pageProps);
  const setlogged2 = (callback) => {
    setlogged(callback);
  };
  const setuser2 = (callback2) => {
    setuser(callback2);
  };
  return (
    <StateContext>
      <Layout state={logged} user={user}>
        <Toaster />
        <Component {...pageProps} setlogged={setlogged2} setuser={setuser2}/>
      </Layout>
    </StateContext>
  )
}

export default MyApp
