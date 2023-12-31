import PropTypes from "prop-types";
import styles from "./CartItem.module.css";

const CartItem = (props) => {
  const convertedPrice = `$${+props.item.price.toFixed(2)}`;

  return (
    <li className={styles["cart-item"]}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{convertedPrice}</span>
          <span className={styles.amount}>x {props.item.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
  onRemove: PropTypes.func,
  onAdd: PropTypes.func,
};

export default CartItem;
