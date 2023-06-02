
import { CartContext } from '../../contexts/cart.context';

import './checkout.style.scss'
import { useContext } from 'react';

const Checkout = () => {
    const {cartItems, addItemToCart, removeItemFromCart} = useContext(CartContext);

    return <div>
        <h1> I am checkout page</h1>
        <div>
            {
                cartItems.map((cartItem)=>{
                    const {name, quantity,id} = cartItem;
                    return <div key={id}>
                        <h2>{name}</h2>
                        <span>{quantity}</span>
                        <span onClick={() => {removeItemFromCart(cartItem)}}>decrement</span>
                        <span onClick={ () => {addItemToCart(cartItem)}}>increment</span>
                        </div>
                })
            }
        </div>
    </div>
}

export default Checkout;
