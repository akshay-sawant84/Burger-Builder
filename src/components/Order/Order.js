import React from "react";
import classes from "./Order.module.css";
import moment from 'moment';

function Order(props) {
  let ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  let ingredientOutput = ingredients.map((ig) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          padding: "5px",
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients : {ingredientOutput}</p>
      <p>
        Price :
        <b>
          <i className="fa fa-inr" style={{ margin: "4px" }}></i> {props.price}
        </b>
      </p>
  <p>Order Date : {moment(props.date).format('MMMM Do YYYY')}</p>
    </div>
  );
}

export default Order;
