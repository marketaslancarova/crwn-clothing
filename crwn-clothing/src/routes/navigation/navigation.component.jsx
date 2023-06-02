import { Fragment, useContext } from "react";
import { Outlet,Link } from "react-router-dom"
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import "../navigation/navigation.style.scss"



const Navigation = () => {
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
   }

    return (
      <Fragment>
        <div className="navigation">
         <Link  className="logo-container" to='/'>
            <CrwnLogo/>
         </Link>
         <div className="nav-links-container">
            <Link className="nav-link" to="/shop">Shop</Link>
            {
              currentUser ? (
                <Link className="nav-link" to="/auth" onClick={signOutHandler}>Sign out</Link>
              ):(
                <Link className="nav-link" to="/auth">Sign in</Link>
              )
            }
            <CartIcon/>
         </div>
         { isCartOpen && <CartDropdown />}
        </div>
        <Outlet></Outlet>
      </Fragment>
    )
  }

export default Navigation;