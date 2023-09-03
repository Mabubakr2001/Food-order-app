import PropTypes from "prop-types";
import useInput from "../../hooks/use-input";
import Button from "../UI/Button/Button";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    resetInput: resetName,
  } = useInput((enteredValue) => enteredValue.trim() !== "");

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    resetInput: resetStreet,
  } = useInput((enteredValue) => enteredValue.trim() !== "");

  const {
    value: postalCodeValue,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    inputChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    resetInput: resetPostalCode,
  } = useInput((enteredValue) => enteredValue.trim() !== "");

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    resetInput: resetCity,
  } = useInput((enteredValue) => enteredValue.trim() !== "");

  let formIsValid = false;

  if (nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!nameIsValid || !streetIsValid || !postalCodeIsValid || !cityIsValid)
      return;

    const customerInfo = {
      name: nameValue,
      street: streetValue,
      postalCode: postalCodeValue,
      city: cityValue,
    };

    props.onConfirm(customerInfo);

    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();
  };

  const nameClasses = nameHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const streetClasses = streetHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const postalCodeClasses = postalCodeHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const cityClasses = cityHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.combination}>
        <div className={nameClasses}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && (
            <p className={classes["error-text"]}>Name has to be not empty!</p>
          )}
        </div>
        <div className={streetClasses}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={streetValue}
            onChange={streetChangeHandler}
            onBlur={streetBlurHandler}
          />
          {streetHasError && (
            <p className={classes["error-text"]}>Street has to be not empty!</p>
          )}
        </div>
      </div>
      <div className={classes.combination}>
        <div className={postalCodeClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input
            type="text"
            id="postal"
            value={postalCodeValue}
            onChange={postalCodeChangeHandler}
            onBlur={postalCodeBlurHandler}
          />
          {postalCodeHasError && (
            <p className={classes["error-text"]}>
              Postal code has to be not empty!
            </p>
          )}
        </div>
        <div className={cityClasses}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={cityValue}
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
          />
          {cityHasError && (
            <p className={classes["error-text"]}>City has to be not empty!</p>
          )}
        </div>
      </div>
      <div className={classes.actions}>
        <Button btnText="Cancel" onClick={props.onCancel} />
        <button
          className={classes.confirm}
          onClick={confirmHandler}
          disabled={!formIsValid}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

Checkout.propTypes = {
  onCancel: PropTypes.func,
  choosenItems: PropTypes.array,
  onConfirm: PropTypes.func,
  willPay: PropTypes.string,
};

export default Checkout;
