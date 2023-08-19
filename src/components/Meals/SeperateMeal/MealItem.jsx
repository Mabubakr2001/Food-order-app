import PropTypes from "prop-types";
import * as React from "react";
import CartContext from "../../../store/cart-context";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const { useContext } = React;

const MealItem = (props) => {
  const cartContext = useContext(CartContext);

  function addItemToCartHandler(chooseItemAmount) {
    cartContext.addItem({
      id: props.theMeal.id,
      name: props.theMeal.name,
      price: props.theMeal.price,
      amount: chooseItemAmount,
    });
  }

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.theMeal.name}</h3>
        <p className={styles.description}>{props.theMeal.description}</p>
        <span className={styles.price}>{props.theMeal.price}</span>
      </div>
      <div>
        <MealItemForm id={props.theMeal.id} onAddItem={addItemToCartHandler} />
      </div>
    </li>
  );
};

MealItem.propTypes = {
  theMeal: PropTypes.object,
};

export default MealItem;
