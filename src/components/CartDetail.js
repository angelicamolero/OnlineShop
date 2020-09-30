import React, { useContext } from 'react';
import {v4 as uuidv4} from 'uuid';
import {Link} from 'react-router-dom';
import Quantity from './Quantity';
/////////////////////////////////////////////////////
import { CartContext } from '../context/CartContext';
/////////////////////////////////////////////////////

const CartDetail = () => {
    const cartContext = useContext(CartContext);

    const {cart, sumItems, sumTotal, deleteProduct, cleanCart} = cartContext

    return (
        <React.Fragment>
     
            {cart.length === 0 && (<h2>Cart is empty</h2>)}
            {cart.length !== 0 && 
                (<div className='row'>
                    <div className='col cartdiv'>
                    <h3 className="cart-title">Shopping Cart</h3>
                    <table id="table-responsive" key={`${uuidv4()}`}>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                    {cart.map(item => {
                        const images = require(`../img/${item.img}`);
                        return (
                                <tbody key={item.id}>
                                    <tr>
                                        <td className="cart-image">
                                            <figure>
                                                <img src={images} alt={item.name}/>
                                            </figure>
                                        </td>
                                        <td className="product-name"> <h4>{item.name}</h4></td>
                                        <td className="product-price">{sumItems(item)}</td>
                                        <td className="cart-quantity"><Quantity prod={item}/></td>
                                        <td className="cart-trash" onClick={() => deleteProduct(item.id)}><i className="fas fa-trash"></i></td>
                                    </tr>
                                </tbody>
                        )
                        
                    })}
                    <div className="row">
                    <div className="eleven columns total">
                        <h4><strong>Total:</strong> {sumTotal(cart)}</h4>
                    </div>
                    </div>
                    </table>
                        {cart.length === 0 ? null : <Link to='/formcheckout'><button className='u-full-width button-primary'>Continue</button></Link>}
                        <button className="clean-button" onClick={() => cleanCart()}>Clean cart</button>
                    </div>
                </div>)}
        </React.Fragment>

        );
}
 
export default CartDetail;