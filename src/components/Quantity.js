import React, {useContext} from 'react';
import { CartContext } from '../context/CartContext';


const Quantity = ({prod}) => {
    const cartContext = useContext(CartContext);

    const {addMore, lessMore} = cartContext

    return ( 
        <div className="quantity">
        <p className="qty">Qty</p>
        <button type='button' className="qty-span" onClick={() => lessMore(prod)}>-</button>
        <h3 className="qty-number">{prod.quantity}</h3>
        <button type='button' className="qty-span" onClick={() => addMore(prod)}>+</button>
        </div>
     );
}

export default Quantity;