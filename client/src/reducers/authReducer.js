import { FETCH_USER } from '../actions/types';


//reducer updates the value
export default function(state = null, action) {
    // console.log('action', action)
    switch (action.type) {
        case FETCH_USER:
            //pulls off new user model
            return action.payload || false;
        default:
            return state;
    }
}

//reducer create a new piece of state