import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./Payments.css";

class Payments extends Component {
  render() {
    // const targetStripeAccount = {
    //     stripe_account:"acct_1D570wLWgPyrropm",
    //     platform_fee: 1000,
    //     price: this.props.price
    // }
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
        name="Gallery"
        description="Money For Art"
        amount={(this.props.price + this.props.platformFee) * 100}
        token={token =>
          this.props.handleToken(Object.assign(targetStripeAccount, token))
        }
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        shippingAddress={true}
        billingAddress={true}
        email={this.props.currentUserEmail}
      >
        <button className="checkout btn">Buy</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
