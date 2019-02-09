import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {

    itemSelectedHandler = key => {
        const selectedPlace = this.props.places.find(place => place.key === key);
        this.props.navigator.push({
            screen: 'places-app.PlaceDetailScreen',
            title: selectedPlace.name,
            passProps: {
                selectedPlace: selectedPlace
            }
        });
    };

    render() {
        return (
            <View>
                <PlaceList
                    places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
};

export default connect(mapStateToProps)(FindPlaceScreen);
