import PropTypes from "prop-types";
import styles from "./Card.module.css";

const Card = (props) => {
  const classes = `${styles.card} ${props.className ? props.className : ""}`;
  return <div className={classes}>{props.children}</div>;
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
