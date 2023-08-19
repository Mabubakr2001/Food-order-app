import PropTypes from "prop-types";
import * as React from "react";
import CartContext from "../../../store/cart-context";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartBtn.module.css";

const { useContext, useEffect, useState } = React;

const HeaderCartBtn = (props) => {
  const [btnIsAnimated, setBtnIsAnimated] = useState(false);
  const cartContextValue = useContext(CartContext);
  const allCartItemsNumber = cartContextValue.items.reduce(
    (accumulator, item) => {
      return accumulator + item.amount;
    },
    0
  );

  const btnClasses = `${classes.button} ${btnIsAnimated ? classes.bump : ""}`;

  useEffect(() => {
    if (cartContextValue.items.length === 0) return;

    setBtnIsAnimated(true);

    const timer = setTimeout(() => setBtnIsAnimated(false), 300);

    return () => clearTimeout(timer);
  }, [cartContextValue.items]);

  return (
    <button className={btnClasses} onClick={props.onOpen}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{allCartItemsNumber}</span>
    </button>
  );
};

HeaderCartBtn.propTypes = {
  onOpen: PropTypes.func,
};

export default HeaderCartBtn;
