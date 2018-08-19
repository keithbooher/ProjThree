import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';



class Payments extends Component {
    render() {
        return (
            <StripeCheckout 
                //somehow am going to have to set this equal to a variable that equals the total of a shopping cart of a customer is future projects
                name="Emaily"
                description="$5 for 5 email credits"
                amount={500}
                token={token=> this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
            <button className="btn">
                Add credits
            </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);