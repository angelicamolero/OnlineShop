import React, { Fragment,useContext } from 'react';
/////////////////////////////////////////////////////////
import Product from './Product';
import Spinner from './Spinner/Spinner';
/////////////////////////////////////////////////////////
import {ProductContext} from '../context/ProductContext';
/////////////////////////////////////////////////////////


const Products = () => {

    const productContext = useContext(ProductContext);
    const { loading } = productContext;

  return (
        <Fragment>
            <div className="rightbar columns u-full-width">
                { loading && <Spinner/>}
                { !loading && <Product/> }
            </div>
        </Fragment>
  );
}

export default Products;