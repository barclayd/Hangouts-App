import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = (event) => {
        console.log(event);
        if (event.type === 'NavBarButtonPress') {
            if(event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    };

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
