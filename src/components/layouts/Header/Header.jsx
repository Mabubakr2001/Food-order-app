import PropTypes from "prop-types";
import * as React from "react";
import MealsImg from "../../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartBtn from "./HeaderCartBtn";

const { Fragment } = React;

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartBtn onOpen={props.onOpen} />
      </header>
      <div className={classes["main-image"]}>
        <img src={MealsImg} alt="Meals Image" />
      </div>
    </Fragment>
  );
};

Header.propTypes = {
  onOpen: PropTypes.func,
};

export default Header;
