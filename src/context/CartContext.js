import React, {createContext, useState, useEffect, useRef} from 'react';
import { getFirestore } from '../firebase/index';
import * as firebase from 'firebase/app';
import 'firebase/firestore'

export const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart, addToCart] = useState([]);
    const [dataJson, setDataJson] = useState([]);
    const [count, setCount] = useState(1);
    const [error, setError] = useState(false);
    const [btn, setBtn] = useState(true);
    const [orderSummary, setOrderSummary] = useState({
        name: '',
        phone: '',
        mail: '',
        repeatedMail: ''
    });

    const nameInput = useRef('');
    const phoneInput = useRef('');
    const mailInput = useRef('');
    const repeatedMailInput = useRef('');
    const { name, phone, mail, repeatedMail } = orderSummary;

    const selectProduct = (prodID) => {
        const product = dataJson.filter(p => p.id === prodID)[0];
        product.quantity = 1
        if(!cart.find(item => item.id === product.id)){
            addToCart([
                ...cart,
                product //tambien puede ser ...product y borrar el [0]
            ]);
        }
    }

    const addMore = (prod) =>{
        if(cart[cart.findIndex(item => item.id === prod.id)].quantity >= cart[cart.findIndex(item => item.id === prod.id)].stock){
            alert(`You can't add more, there's only ${prod.stock} in stock`)
            cart[cart.findIndex(item => item.id === prod.id)].quantity = cart[cart.findIndex(item => item.id === prod.id)].stock
            return;
        }
        setCount(count + 1);
        if(cart[cart.findIndex(item => item.id === prod.id)].quantity === 0){
            prod.quantity = 1;
        } else{
            cart[cart.findIndex(item => item.id === prod.id)].quantity++
        }

        addToCart(cart);
    }

    const lessMore = (prod) =>{
        setCount(count - 1)
        if(cart[cart.findIndex(item => item.id === prod.id)].quantity === 1){
            alert('No menos de 1');
            setCount(1);
        } else {
            cart[cart.findIndex(item => item.id === prod.id)].quantity--
            addToCart(cart);
        }
    }

    const sumItems = item => {
        let total = [item].reduce((t, product) => t + product.price * product.quantity, 0).toFixed(2);
        return total
    }

    const sumTotal = cart => {
        let total = cart.reduce((t, product) => t += (product.price * product.quantity), 0).toFixed(2);
        return total
    }

    const deleteProduct = (prodId) => {
        const product = cart.filter(p => p.id !== prodId)
        addToCart(product);
    }

    const cleanCart = () => addToCart([]);

    const handleInput = (e) => {
        setOrderSummary({
            ...orderSummary,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(name.trim() === '' || phone.trim() === '' || mail.trim() === '' || repeatedMail.trim() === '' || mail !== repeatedMail){
            setError(true);
            (name === '') ? nameInput.current.style.border = '1px solid red' : nameInput.current.style.border = '';
            (phone === '') ? phoneInput.current.style.border = '1px solid red' : phoneInput.current.style.border = '';
            (mail === '') ? mailInput.current.style.border = '1px solid red' : mailInput.current.style.border = '';
            (repeatedMail === '') ? repeatedMailInput.current.style.border = '1px solid red' : repeatedMailInput.current.style.border = '';
            return;
        }
        setError(false);
        setBtn(false)
        nameInput.current.style.border = '';
        phoneInput.current.style.border = '';
        mailInput.current.style.border = '';
        repeatedMailInput.current.style.border = '';
    }

    const createOrder = async () => {
        const db = getFirestore();
        const orders = db.collection('orders')
        console.log(orders)
        const buyerData = {
            name,
            phone,
            mail
        }
        const newOrder = {
            buyer: buyerData,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            items: cart,
            total: 10
        }
        try{
            console.log(orders.add(newOrder))
            const { id } = await orders.add(newOrder);
            alert(`Thanks for buying!! your number ID is: ${id}`)
            
        } catch(err){
            console.log('Error')
        }

    }

    useEffect(() => {
        const db = getFirestore();
        const itemCollection = db.collection('items');
        itemCollection.get().then((querySnapshot) => {
            setDataJson( querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
        })
    },[count])

    return (
        <CartContext.Provider
            value={{
                cart,
                qty: cart.length,
                orderSummary,
                error,
                btn,
                nameInput,
                phoneInput,
                mailInput,
                repeatedMailInput,
                setBtn,
                sumItems,
                sumTotal,
                selectProduct,
                addMore,
                lessMore,
                deleteProduct,
                cleanCart,
                handleInput,
                handleSubmit,
                createOrder
            }}
        >
            {children}
        </CartContext.Provider>
     );
}

export default CartProvider;