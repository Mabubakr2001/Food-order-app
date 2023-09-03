import PropTypes from "prop-types";
import { Fragment } from "react";
import Button from "../Button/Button";
import classes from "./Hint.module.css";

export default function Hint(props) {
  return (
    <Fragment>
      <span className={classes.hint}>{props.innerText}</span>
      <Button btnText="Close" onClick={props.onClose} />
    </Fragment>
  );
}

Hint.propTypes = {
  innerText: PropTypes.string,
  onClose: PropTypes.func,
};
