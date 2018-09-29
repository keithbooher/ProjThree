import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./Payments.css";

class Payments extends Component {
  render() {

    const targetStripeAccount = {
      stripe_account: this.props.targetStripe,
      platform_fee: this.props.price * 5,
      price: this.props.price * 100,
      artistEmail: this.props.artistEmail,
      currentUserEmail: this.props.currentUserEmail,
      productName: this.props.productName,
      image: this.props.image,
      firstName: this.props.firstName,
      productID: this.props.productID
    };
    console.log(targetStripeAccount);

    return (
      <StripeCheckout
        //somehow am going to have to set this equal to a variable that equals the total of a shopping cart of a customer in future projects
        name="Art Gutter"
        description={this.props.productName}
        amount={this.props.price * 100}
        token={token =>
          this.props.handleToken(Object.assign(targetStripeAccount, token))
        }
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        shippingAddress={true}
        billingAddress={true}
        email={this.props.currentUserEmail}
      >
        {!this.props.auth ? <button className="login btn"><a href="/auth/google">Buy Now</a></button> : <button className="checkout btn">Buy Now</button>}

      </StripeCheckout>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(
  mapStateToProps,
  actions
)(Payments);
