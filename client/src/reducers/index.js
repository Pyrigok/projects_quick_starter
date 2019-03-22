import {combineReducers} from 'redux';
import auth from './auth';

const startApp = combineReducers({auth,})

export default startApp;