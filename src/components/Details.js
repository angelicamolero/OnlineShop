import React, { useContext } from 'react';
import {CartContext} from '../context/CartContext';
import {ProductContext} from '../context/ProductContext';
import {Link, useParams} from 'react-router-dom';

const Details = () => {

    const cartContext = useContext(CartContext);
    const productContext = useContext(ProductContext);

    const { cart, selectProduct, addMore } = cartContext;
    const { dataJson } = productContext;

    const { id } = useParams();

    const details = dataJson.filter(item => item.id === id);

   return (
       <React.Fragment>
            {details && details.map(d => {
                const images = require(`../img/${d.img}`);
                return (
                    <div className="container" key={d.id}>
                        <div className="row">
                            <div className="img-container">
                                <img src={images} alt=""/>
                            </div>
                            <div className="details-container">
                                <div className="line"></div>
                                <h4 className="product-price">{d.price}</h4>
                                <h5 className="card-title">{d.name}</h5>
                                <p className="description">{d.description}</p>
                                <button className="checkout-btn" 
                                    type="button" 
                                    onClick={() => {cart.find(item => item.id === d.id) ? addMore(d) : selectProduct(d.id)}}
                                >{cart.find(item => item.id === d.id) ? 'ADD MORE' : 'ADD TO CART'}</button>
                                {cart.find(item => item.id === d.id && item.quantity > 0) && <span>You have {cart.find(item => item.id === d.id).quantity} plants in your cart!</span>}
                            </div>
                            <Link to={'/'} className='goBack'><i className="fas fa-arrow-left"></i></Link>
                        </div>
                    </div>
                )
            })}

       </React.Fragment>


   )
}

export default Details;