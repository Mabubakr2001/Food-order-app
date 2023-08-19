import PropTypes from "prop-types";
import * as React from "react";
import CartContext from "./cart-context";

const { useReducer } = React;

const defaultCartValue = {
  items: [],
  totalAmount: 0,
};

function cartReducer(lastState, action) {
  // if (action.type === "Add") {
  //   const newTotalAmount =
  //     lastState.totalAmount + action.item.price * action.item.amount;

  //   const existedItemIndex = lastState.items.findIndex(
  //     (item) => item.id == action.item.id
  //   );

  //   let updatedItems;

  //   if (existedItemIndex !== -1) {
  //     const existedItem = lastState.items[existedItemIndex];
  //     const updatedItem = {
  //       ...existedItem,
  //       amount: existedItem.amount + action.item.amount,
  //     };
  //     updatedItems = [...lastState.items];
  //     updatedItems[existedItemIndex] = updatedItem;
  //   } else {
  //     updatedItems = lastState.items.concat(action.item);
  //   }

  //   return {
  //     items: updatedItems,
  //     totalAmount: newTotalAmount,
  //   };
  // }

  // Refactored Version
  if (action.type === "Add") {
    const { id, price, amount } = action.item;
    const newTotalAmount = lastState.totalAmount + price * amount;

    const existedItemIndex = lastState.items.findIndex((item) => item.id == id);

    let updatedItems;

    if (existedItemIndex !== -1) {
      updatedItems = lastState.items.map((item) => {
        if (item.id == id) {
          return { ...item, amount: item.amount + amount };
        }
        return item;
      });
    } else {
      updatedItems = [...lastState.items, action.item];
    }

    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }

  if (action.type === "Remove") {
    const targetItemIndex = lastState.items.findIndex(
      (item) => item.id == action.itemID
    );

    if (targetItemIndex === -1) return;

    const targetItemItSelf = lastState.items[targetItemIndex];
    const newTotalAmount = lastState.totalAmount - targetItemItSelf.price;

    let updatedItems = [...lastState.items];

    if (targetItemItSelf.amount > 1) {
      const updatedItem = {
        ...targetItemItSelf,
        amount: targetItemItSelf.amount - 1,
      };
      updatedItems[targetItemIndex] = updatedItem;
    } else {
      updatedItems.splice(targetItemIndex, 1);
    }

    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }

  // Return the last state for other action types
  return lastState;
}

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartValue
  );

  function addItemToCartHandler(item) {
    dispatchCartAction({ type: "Add", item });
  }

  function removeItemFromCartHandler(itemID) {
    dispatchCartAction({ type: "Remove", itemID });
  }

  const cartContextThatWillChange = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContextThatWillChange}>
      {props.children}
    </CartContext.Provider>
  );
};

CartContextProvider.propTypes = {
  children: PropTypes.node,
};

export default CartContextProvider;
