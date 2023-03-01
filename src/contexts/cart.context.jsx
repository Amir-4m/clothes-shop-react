import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";


const CART_ACTION_TYPE = {
    'TOGGLE_CART_OPEN': 'TOGGLE_CART_OPEN',
    'SET_CART_ITEMS': 'SET_CART_ITEMS',
}


const addCartItem = (cartItems, productToAdd) => {
    const exsistingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    if (exsistingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }]

}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const exsistingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)
    if (exsistingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    )

}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

}
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
});
const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPE.TOGGLE_CART_OPEN:
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            }
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`unhandled type ${type} in cartReducer`)
    }
}
const INITIAL_STATE = {
    isCartOpen: false,
    cartCount: 0,
    cartTotal: 0,
    cartItems: [],

}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const { isCartOpen, cartItems, cartCount, cartTotal } = state;
    const setIsCartOpen = () => {
        dispatch({ type: CART_ACTION_TYPE.TOGGLE_CART_OPEN })
    }

    const updateCartItemsReduer = (newCartItem) => {
        const newCartCount = newCartItem.reduce((total, cartItem) => total + cartItem.quantity, 0)

        const newCartTotal = newCartItem.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)

        dispatch(createAction(CART_ACTION_TYPE.SET_CART_ITEMS, {cartCount:newCartCount, cartItems:newCartItem, cartTotal:newCartTotal}))
    }
    const addItemToCart = (product) => {
        const newCartItem = addCartItem(cartItems, product)
        updateCartItemsReduer(newCartItem)
    }

    const removeItemFromCart = (product) => {
        const newCartItem = removeCartItem(cartItems, product)
        updateCartItemsReduer(newCartItem)

    }

    const clearItemFromCart = (product) => {
        const newCartItem = clearCartItem(cartItems, product)
        updateCartItemsReduer(newCartItem)

    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}