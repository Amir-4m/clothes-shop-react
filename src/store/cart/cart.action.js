import { createAction } from "../../utils/reducer/reducer.utils"
import { CART_ACTION_TYPE } from "./cart.types";


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


export const addItemToCart = (cartItems, product) => {
    const newCartItem = addCartItem(cartItems, product)
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItem)
}

export const removeItemFromCart = (cartItems, product) => {
    const newCartItem = removeCartItem(cartItems, product)
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItem)

}

export const clearItemFromCart = (cartItems, product) => {
    const newCartItem = clearCartItem(cartItems, product)
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItem)

}


export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPE.TOGGLE_CART_OPEN, boolean)