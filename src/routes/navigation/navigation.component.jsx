import { Fragment, useContext } from "react";
import { Outlet,Link } from "react-router-dom"
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";


import {NavigatorContainer, LogoContainer, NavLinks, NavLink} from "./navigation.style"

const Navigation = () => {
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
   }

    return (
      <Fragment>
        <NavigatorContainer>
         <LogoContainer to='/'>
            <CrwnLogo/>
         </LogoContainer>
         <NavLinks>
            <NavLink to="/shop">Shop</NavLink>
            {
              currentUser ? (
                <NavLink to="/auth" onClick={signOutHandler}>Sign out</NavLink>
              ):(
                <NavLink to="/auth">Sign in</NavLink>
              )
            }
            <CartIcon/>
         </NavLinks>
         { isCartOpen && <CartDropdown />}
        </NavigatorContainer>
        <Outlet></Outlet>
      </Fragment>
    )
  }

export default Navigation;