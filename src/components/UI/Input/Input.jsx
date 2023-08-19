import PropTypes from "prop-types";
import * as React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.inputInfo.id}>{props.label}</label>
      <input ref={ref} {...props.inputInfo} />
    </div>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  label: PropTypes.string,
  inputInfo: PropTypes.object,
};

export default Input;
