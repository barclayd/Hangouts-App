import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    places: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PLACE:
            return updateObject(state, {
                places: state.places.concat({
                    key: Math.random(),
                    name: action.placeName,
                    image: {
                        uri: 'https://www.visitbritain.com/sites/default/files/consumer_destinations/teaser_images/manchester_town_hall.jpg'
                    }
                })
            });
        case actionTypes.DELETE_PLACE:
            return updateObject(state, {
                places: state.places.filter((place) => place.key !== state.selectedPlace.key)
            });
        default:
            return state;
    }
};

export default reducer;
