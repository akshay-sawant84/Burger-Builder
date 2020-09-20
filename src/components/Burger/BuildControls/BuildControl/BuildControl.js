import React from "react";
import classes from "./BuildControl.module.css";

 function BuildControl(props) {
  return (
    <div className={classes.BuildControl}>
      <button className={classes.Less} onClick = {props.removed} disabled = {props.disabled}>
        <i className="fa fa-minus"></i>
      </button>
      <div className={classes.Label}>
        {props.label} <span style = {{marginRight : '4px'}}></span> (<i className="fa fa-inr" style = {{margin : '4px'}}></i>{props.price})
      </div>
      <button className={classes.More} onClick={props.added}>
        <i className="fa fa-plus"></i>
      </button>
    </div>
  );
}

export default BuildControl;


