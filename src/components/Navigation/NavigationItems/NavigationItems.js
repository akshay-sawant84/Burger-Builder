import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

function NavigationItems(props) {
    // console.log( props.isAuth );
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      { props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null } 
      { !props.isAuthenticated ? (
        <NavigationItem link="/auth">Authenticcation</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
    </ul>
  );
}

export default NavigationItems;
