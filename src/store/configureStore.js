import {createStore, combineReducers} from 'redux';
import placesReducer from "./reducers/places";


const rootReducer = combineReducers({
    places: placesReducer
});

const configureStore = () => {
    createStore(rootReducer);
};

export default configureStore;
