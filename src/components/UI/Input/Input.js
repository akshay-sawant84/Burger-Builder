import React from "react";
import classes from "./Input.module.css";

export default function Input(props) {
  let inputElement = null;
  let inputClasses = [classes.InputElement];

  if(props.invalid && props.touched){
    inputClasses.push(classes.Invalids);
  }


  switch (props.inputtype) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange = {props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange = {props.changed}
        />
      );
      break;
    // case ("select"):
    //   inputElement = (
    //     <select className={classes.InputElement}>
    //       {props.elementConfig.options.map((optionss) => (
    //         <option value={optionss.value} key={optionss.value}>{optionss.displayValue}</option>
    //       ))}
    //     </select>
    //   );
    //   break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange = {props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}
