import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./Overlay.module.css";

const Overlay = (props) => {
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={props.onClose}></div>,
    document.querySelector(".backdrops")
  );
};

Overlay.propTypes = {
  onClose: PropTypes.func,
};

export default Overlay;
