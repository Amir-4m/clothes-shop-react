import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
    const cartItems = useSelector(selectCartItems);
    const { name, imageUrl, price, quantity } = cartItem;
    const dispatch = useDispatch();

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => dispatch(removeItemFromCart(cartItems, cartItem))}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => dispatch(addItemToCart(cartItems, cartItem))}>
                    &#10095;
                </div>
            </span>
            <span className='price'>${price}</span>
            <div onClick={() => dispatch(clearItemFromCart(cartItems, cartItem))} className='remove-button'>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;