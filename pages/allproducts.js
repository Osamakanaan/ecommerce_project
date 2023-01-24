import React from 'react';
import { useState } from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner, LoginPage, SignupPage } from '../components';
import Layout from '../components';

import { withRouter } from 'next/router'
import { useRouter } from 'next/router';
//{ products, bannerData }
function Home  (props) {
  //const [count, setCount] = React.useState(0);
  //console.log(props.router);
  console.log(props);
  props.setlogged(props.router.query.logged)
  props.setuser(props.router.query.Username)
  //console.log(props.router.query.logged);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const handleShowAll = () => {
    router.push('/allproducts')
  };
  return (
  <div>
      <div className="products-container">
        {props.products?.map((product) => <Product key={product._id} product={product} state={props.router.query.logged}/>)}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  

  return {
    props: {products}
  }
}

export default withRouter(Home);
