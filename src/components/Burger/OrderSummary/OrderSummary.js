import React from "react";
import Aux from "../../../hoc/Auxx/Aux";
import classes from "./OrderSummary.module.css";
import Button from "../../UI/Button/Button";

function OrderSummary(props) {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>
          {igKey} : {props.ingredients[igKey]}{" "}
        </span>
      </li>
    );
  });
  return (
    <Aux>
      <button className={classes.btn} onClick={props.modalClosed}>
        <i style={{ fontSize: "25px" }} className="fa fa-times-circle"></i>
      </button>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients : </p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>
          Total Price : <i className="fa fa-inr" style={{ margin: "4px" }}></i>
          {props.price}
        </strong>
      </p>
      <p>Continue To Checkout</p>
      {/* <button className={}>CANCEL</button>
      <button>Contine</button> */}
      <hr />
      <div style={{ display: "flex" }}>
        <Button btnType="Danger" clicked={props.modalClosed}>
          <span style={{ display: "flex", alignItems: "center" }}>
            Cancel{" "}
            <i
              style={{ fontSize: "30px", margin: "0 10px" }}
              className="fa fa-times-circle"
            ></i>
          </span>
        </Button>
        <Button btnType="Success" clicked={props.purchaseContinue}>
          <span style={{ display: "flex", alignItems: "center" }}>
            Continue{" "}
            <i
              style={{ fontSize: "30px", margin: "0 10px" }}
              className="fa fa-cart-plus"
            ></i>
          </span>
        </Button>
      </div>
    </Aux>
  );
}

export default OrderSummary;
