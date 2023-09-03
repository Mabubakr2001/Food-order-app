import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Modal = (props) => {
  const classes = `${styles.modal} ${props.className ? props.className : ""}`;
  return ReactDOM.createPortal(
    <div className={classes}>{props.children}</div>,
    document.querySelector(".modals")
  );
};

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
