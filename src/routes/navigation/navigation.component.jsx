import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutAuthUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { NavigationContainer, NavLink, NavLinks, LogoContainer } from './navigation.styles';
import { currentUserSelector } from '../../store/user/user.selector';

const Navigation = () => {
    const currentUser = useSelector(currentUserSelector);
    const isCartOpen = useSelector(selectIsCartOpen);
    const signOutHandler = async () => {
        await signOutAuthUser();
    }
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo'></CrwnLogo>
                </LogoContainer>
                <NavLinks>
                    <NavLink className='nav-link' to='/shop'>Shop</NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' className='nav-link' onClick={signOutHandler}>Sign Out</NavLink>
                        ) : (
                            <NavLink className='nav-link' to='/auth'>Sign In</NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}
export default Navigation;