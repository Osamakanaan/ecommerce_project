import React from 'react';
import { useState } from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner, LoginPage, SignupPage } from '../components';
import Layout from '../components';
import Layoutv2 from '../components';
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
      <HeroBanner heroBanner={props.bannerData.length && props.bannerData[0]}  />
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>speaker There are many variations passages</p>
      </div>

      <div className="products-container">
      {props.products?.slice(0, showAll ? props.products.length : 10).map((product) => (
        <Product key={product._id} product={product} state={props.router.query.logged} />
      ))}
      {props.products.length > 10 && (
        <button className="show-all-button" onClick={handleShowAll}>
          Show all products
        </button>
      )}
    </div>

      <FooterBanner footerBanner={props.bannerData && props.bannerData[0]} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default withRouter(Home);

// Home.getLayout = function getLayout(Home) {

//   return (
//     <Layout>
//       <Layoutv2>{Home}</Layoutv2>
//     </Layout>
//   )
// }
