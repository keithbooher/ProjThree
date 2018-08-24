import axios from 'axios'
import { FETCH_USER } from './types';

//big funnel that catches requests and forwards them to the different reducers
//seeing who current user is
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    // THIS IS CONNECTING TO OUR BACKEND SOMEHOW. THIS IS SHOWING US OUR CURRENT USER.
    console.log('res', res.data)
    //getting a notification. dispatch an action containing the response, which is the identity of the user 
    dispatch({ type: FETCH_USER, payload: res.data});
};

//takes token to our back end api
export const handleToken = (token, amount) => async dispatch => {
    //response to this post request is our user model
    const res = await axios.post('/api/stripe', token, amount);
    console.log('token', token);
    console.log('amount', amount);
    
    
    dispatch({ type: FETCH_USER, payload: res.data });
}