import PropTypes from "prop-types";
import * as React from "react";
import useHttp from "../../hooks/use-http";
import CartContext from "../../store/cart-context";
import Checkout from "../Checkout/Checkout";
import Button from "../UI/Button/Button";
import Hint from "../UI/Hint/Hint";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const { useContext, useState, Fragment } = React;

const Cart = (props) => {
  const { sendRequest, isLoading, error } = useHttp();
  const [placedOrderName, setPlacedOrderName] = useState("");
  const [checkoutIsShown, setCheckoutIsShown] = useState(false);
  const cartContext = useContext(CartContext);
  const updatedTotalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;

  const cartHasItems = cartContext.items.length > 0;

  function openCheckoutForm() {
    setCheckoutIsShown(true);
  }

  function cancelOrder() {
    setCheckoutIsShown(false);
  }

  function placeOrder(orderFromDB) {
    setPlacedOrderName(orderFromDB.name);
    cartContext.clearCart();
  }

  function prepareOrder(customerInfo) {
    const order = {
      customer: { ...customerInfo },
      items: cartContext.items,
      willPay: updatedTotalAmount,
    };

    sendRequest({
      requestConfig: {
        url: "https://react-http-93a9d-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: order,
      },
      applyData: placeOrder,
    });
  }

  return (
    <Modal>
      {isLoading && !error && <LoadingSpinner />}
      {error && <Hint innerText={error} onClose={props.onClose} />}
      {placedOrderName && (
        <Hint
          innerText="Your order was placed. Thank you for using ReactMeals🤝"
          onClose={props.onClose}
        />
      )}
      {!isLoading && !placedOrderName && !error && (
        <Fragment>
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
          {checkoutIsShown && (
            <Checkout onCancel={cancelOrder} onConfirm={prepareOrder} />
          )}
          {!checkoutIsShown && (
            <div className={styles.actions}>
              <Button btnText="Close" onClick={props.onClose} />
              {cartHasItems && (
                <Button btnText="Order" onClick={openCheckoutForm} />
              )}
            </div>
          )}
        </Fragment>
      )}
    </Modal>
  );
};

Cart.propTypes = {
  onClose: PropTypes.func,
};

export default Cart;
