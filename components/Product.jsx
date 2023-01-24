import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = (props) => {
  var product = props.product
  console.log(props.state);
  return (
    <div>
      <Link href={{
            pathname: `/product/${product.slug.current}`,
            query: { logged: props.state },
          }, `/product/${product.slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(product.image && product.image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
