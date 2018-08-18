import axios from 'axios'
import { FETCH_USER } from './types';

//big funnel that catches requests and forwards them to the different reducers
//seing who current user is
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    //getting a notification. dispatch an action containing the response, which is the identity of the user 
    dispatch({ type: FETCH_USER, payload: res.data});
};