import React, {useContext} from 'react';
import { CartContext } from '../context/CartContext';



const Order = () => {
    const cartContext = useContext(CartContext);

    let {cart, orderSummary, sumItems, sumTotal, createOrder} = cartContext

    const { name, phone, mail } = orderSummary;

    return(
    <div className="container order-summary">
    <div className="row headline">
      <div className="eleven columns">
        <h3>Order Summary</h3>
      </div>
    </div>
    
    <div className="row">
      <div className="u-full-width eleven column order-info">
       <p><strong>Status:</strong> Pending</p>
       <p><strong>Fecha:</strong> {new Date().toDateString()}</p>
       <p><strong>Name:</strong> {name}</p>
       <div className="order-emailphone">
         <p><strong>Email:</strong> {mail}</p>
         <p className="phone"><strong>Phone:</strong>{phone}</p>
       </div>
      </div>
    </div>
    
    <div className="row">
      <div className="eleven columns u-full-width ">
        <table id="checkout-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>
                 <img className="order-img" src={require(`../img/${item.img}`)} alt={item.name}/>
              </td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{sumItems(item)}</td>
            </tr>
          ))}

          </tbody>
        </table>
      </div>
    </div>
    
     <div className="row">
       <div className="eleven columns total">
         <h4><strong>Total:</strong> {sumTotal(cart)}</h4>
       </div>
     </div>
    <button onClick={() => createOrder()}>Complete Order</button>
  </div>
    );
}

export default Order;
