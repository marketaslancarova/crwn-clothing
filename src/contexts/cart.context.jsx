import { createContext,useEffect,useReducer,useState } from "react";

const clearCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
}

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    )

    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem)
    }
    return [...cartItems,{...productToAdd,quantity:1}]
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    total: 0
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const {type, payload} = action;
    
    switch (type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload,
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload,
            }
        default:
           throw new Error(`Unhandled type ${type} in userReducer`)
    }
}
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    total: 0

})

const removeCartItem = (cartItems, productToRemove) =>{
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    )
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    }
    
    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem)
}

export const CartProvider = ({children}) => {
    // const [isCartOpen,setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount,setCartCount] = useState(0);
    // const [total,setCartTotal] = useState(0);

    const [{cartItems, isCartOpen, cartCount,total}, dispatch] = useReducer(cartReducer,INITIAL_STATE)
    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price,0);

        dispatch({type:'SET_CART_ITEMS',payload: {cartItems: newCartItems, cartCount: newCartCount,
            total: newCartTotal }})
    }
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems,productToAdd);
        updateCartItemsReducer(newCartItems)
    }
    
    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems,productToRemove);
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (cartItemToRemove) => {
        const newCartItems = clearCartItem(cartItems,cartItemToRemove);
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        dispatch({type:'SET_IS_CART_OPEN',payload: bool});

    }

    // useEffect(()=> {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
    //     setCartCount(newCartCount);
    // },[cartItems])

    
    // useEffect(()=> {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price,0);
    //     setCartTotal(newCartTotal);
    // },[cartItems])


    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart,total}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}