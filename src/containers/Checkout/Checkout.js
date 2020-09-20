import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import classes from "./Checkout.module.css";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      orderForm: {
        name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your Name",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        street: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Street",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        zipCode: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Zip Code",
          },
          value: "",
          validation: {
            required: true,
            minLength: 6,
            maxLength: 6,
            isNumeric: true
          },
          valid: false,
          touched: false,
        },
        country: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Country",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Your Email",
          },
          value: "",
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false,
        },
        // deliveryMethod: {
        //   elementType: "select",
        //   elementConfig: {
        //     options: [
        //       { value: "fastest", displayValue: "Fastest" },
        //       { value: "cheapest", displayValue: "Cheapest" },
        //     ],
        //   },
        //   value: "",
        // },
      },
      formIsValid: false,
    };
  }

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     // [['salad', "1"], ['bacon' '2']]
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalprice: price });
  // }

  // componentWillMount() {
  //   this.props.onInitPurchase();
  // }

  checkoutCancelHandler = () => {
    this.props.history.push("/");
  };

  orderHandler = (event) => {
    event.preventDefault();
    // this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      date : Date(),
      userId : this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);

    // axios
    //   .post("/orders.json", order)
    //   .then((res) => {
    //     setTimeout(() => {
    //       this.setState({ loading: false });
    //       this.props.history.push("/orders");
    //     }, 3000);
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false });
    //   });
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if( rules.isNumeric ){
      const pattern = /^\d+$/;
      isValid = pattern.test( value ) && isValid;
  }

    if( rules.isEmail ){
      const pattern = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test( value ) && isValid;
  }

    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    // touched = {formElement.config.touched}
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm });
    if (formIsValid) {
      this.setState({ formIsValid: true });
    }
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchaseRedirect = this.props.purchased ? (
        <Redirect to="/orders" />
      ) : null;
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelHandler}
            checkoutContinued={this.checkoutContinueHandler}
            ingredients={this.props.ings}
          />
        </div>
      );
    }

    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
        <Button btnType="Danger" clicked={this.checkoutCancelHandler}>
          Cancel
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div>
        <Container>
          <h1 style={{ textAlign: "center" }}>
            We hope it tastes delicious..!!
          </h1>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Paper style={{ boxShadow: "none" }}>{summary}</Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper style={{ boxShadow: "none" }}>
                <div className={classes.ContactData}>
                  <h3>Enter Your Contact Data</h3>
                  {form}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    purchased: state.order.purchased,
    token : state.auth.token,
    userId : state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
    // onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
