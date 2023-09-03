import PropTypes from "prop-types";
import * as React from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import styles from "./MealItemForm.module.css";

const { useRef, useState } = React;

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const choosenItemAmount = +amountInputRef.current.value;
    if (choosenItemAmount < 1) return setAmountIsValid(false);
    props.onAddItem(choosenItemAmount);
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        inputInfo={{
          id: `amount-${props.id}`,
          type: "number",
          min: "1",
          step: "1",
          defaultValue: "1",
        }}
      />
      <Button btnText="+ Add" />
      {!amountIsValid && <p>Please enter a valid amount!</p>}
    </form>
  );
};

MealItemForm.propTypes = {
  id: PropTypes.string,
  onAddItem: PropTypes.func,
};

export default MealItemForm;
