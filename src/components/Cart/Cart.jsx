import PropTypes from "prop-types";
import * as React from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const { useContext } = React;

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const updatedTotalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;

  const cartHasItems = cartContext.items.length > 0;

  return (
    <Modal>
      <ul className={styles["cart-items"]}>
        {cartContext.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              item={item}
              onAdd={() => cartContext.addItem({ ...item, amount: 1 })}
              onRemove={() => cartContext.removeItem(item.id)}
            />
          );
        })}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{updatedTotalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {cartHasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

Cart.propTypes = {
  onClose: PropTypes.func,
};

export default Cart;
