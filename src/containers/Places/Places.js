import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PlaceList from '../../components/PlaceList/PlaceList';

class Places extends Component {

    state = {
        placeName: '',
        places: []
    };

    placeNameChangeHandler = (value) => {
        this.setState({
            placeName: value
        })
    };

    placeAddedHandler = () => {
        if(this.state.placeName.trim () === '') {
            return;
        }
        this.setState(prevState => {
            return {
                places: prevState.places.concat({
                    key: Math.random(),
                    value: prevState.placeName
                }),
                placeName: ''
            }
        });
    };

    placeRemoveHandler = (key) => {
        this.setState(prevState => {
            return {
                places: prevState.places.filter((place) => place.key !== key)
            }
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <PlaceInput
                    placeholder='Enter a place...'
                    placeName={this.state.placeName}
                    btnTitle='Add'
                    addItem={this.placeAddedHandler}
                    inputChange={this.placeNameChangeHandler}
                />
                <PlaceList
                    places={this.state.places}
                    removeItem={this.placeRemoveHandler}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 60,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});



export default Places;
