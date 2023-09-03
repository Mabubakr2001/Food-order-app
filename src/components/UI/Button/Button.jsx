import PropTypes from "prop-types";
import classes from "./Button.module.css";

export default function Button(props) {
  const buttonClasses =
    props.btnText === "Cancel" || props.btnText === "Close"
      ? `${classes.button} ${classes["button-alt"]}`
      : `${classes.button}`;

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      {props.btnText}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  btnText: PropTypes.string,
};
