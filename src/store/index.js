import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

import WeatherReducer from './reducers/WeatherReducer';
import AppReducer from './reducers/AppReducer';

const store = createStore(combineReducers({
    app: AppReducer,
    weather: WeatherReducer
}), applyMiddleware(thunk));


export default store