import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

function BuildControls(props) {
  const controls = [
    { label: "Salad", price: 50, type: "salad" },
    { label: "Bacon", price: 70, type: "bacon" },
    { label: "Cheese", price: 25, type: "cheese" },
    { label: "Meat", price: 100, type: "meat" },
  ];
  return (
    <div className={classes.BuildControls}>
      <p>
        <b>
          Current Price :{" "}
          <i className="fa fa-inr" style={{ margin: "2px" }}></i> {props.price}
        </b>
      </p>
      <button
        className={classes.button}
        onClick={props.reset}
        disabled={!props.purchaseable}
      >
        Reset Burger
      </button>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          price={ctrl.price}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        onClick={props.ordered}
        disabled={!props.purchaseable}
      >
       { props.isAuth  ? 'ORDER NOW' : 'Sign Up to Order'}
      </button>
    </div>
  );
}

export default BuildControls;
