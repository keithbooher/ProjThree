import axios from 'axios'
import { FETCH_USER } from './types';

//big funnel that catches requests and forwards them to the different reducers
//seing who current user is
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    //getting a notification. dispatch an action containing the response, which is the identity of the user 
    dispatch({ type: FETCH_USER, payload: res.data });
};

//takes token to our back end api
export const handleToken = (token) => async dispatch => {
    //response to this post request is our user model
    const res = await axios.post('/api/stripe', token);
    console.log('token from actions', token)

    dispatch({ type: FETCH_USER, payload: res.data });
}