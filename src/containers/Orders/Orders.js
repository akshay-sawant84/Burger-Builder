import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Container from "@material-ui/core/Container";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  // constructor(){
  //     super();
  //     this.state = {
  //         orders : [],
  //         loading : true
  //     }
  // }

  componentDidMount() {
    // axios.get("/orders.json")
    // .then((res) => {
    //     const fetchData = [];
    //     for(let key in res.data){
    //         fetchData.push({...res.data[key], id : key});
    //     }
    //     console.log(fetchData);
    //     this.setState ({ loading : false, orders : fetchData })
    // })
    // .catch((err) => {
    //     console.log(err);
    //     this.setState({ loading : false })
    // })
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <Container maxWidth="md">
          {this.props.orders.length === 0 ? (
            <h1>No orders</h1>
          ) : (
            this.props.orders.map((order) => (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
                date = {order.date}
              />
            ))
          )}
        </Container>
      );
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    token : state.auth.token ,
    orders: state.order.orders,
    loading: state.order.loading,
    userId : state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
