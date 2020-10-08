import React, { Fragment, useContext } from 'react';
import {Link} from 'react-router-dom';
////////////////////////////////////////////////////
import {CartContext} from '../context/CartContext';
//import {ProductContext} from '../context/ProductContext';
///////////////////////////////////////////////////
import logo from '../img/logo.jpg';
///////////////////////////////////////////////////


const LeftBar = () => {

    const cartContext = useContext(CartContext);
    //const productContext = useContext(ProductContext);

    const { qty } = cartContext;
    //const { searching, search } = productContext

    return (
        <Fragment>
            <div className="leftbar four columns u-full-width">
                <div className="logo">
                <Link to={'/'}><img src={logo} alt=""/></Link>
                <span>SUNFLOWER</span>
                </div>
                <nav className="navbar">
                    <ul>
                        <li className="nav-item"><Link to={'/'}>Home</Link></li>
                        <li className="nav-item"><Link to={'/contact'}>Contact</Link></li>
                    </ul>
                </nav>

                <div className="">
                    <form 
                        className="" 
                        id="formSearch"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="search-container">
                            <input 
                                className="" 
                                id="search-box" 
                                //value={searching}
                                type="text" 
                                placeholder="Search" 
                                aria-label="Search"
                                //onChange={search}    
                            />
                            <i className="fas fa-search text-grey search-icon"></i>
                        </div>
                    </form>
                    <div className="cart-and-wish">
                        <Link to={'/cart'} className='cart-nav'><span className="cart-nav"><i className="fas fa-shopping-cart"></i> Cart {qty}</span></Link>
                    </div>
                </div>
            </div> 
        </Fragment>
    );
}

export default LeftBar;