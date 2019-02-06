import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PlaceList from '../../components/PlaceList/PlaceList';
import PlaceDetail from '../../components/PlaceDetail/PlaceDetail';

class Places extends Component {

    state = {
        placeName: '',
        places: [],
        selectedPlace: null
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
                    name: prevState.placeName,
                    image: {
                        uri: 'https://www.visitbritain.com/sites/default/files/consumer_destinations/teaser_images/manchester_town_hall.jpg'
                    }
                }),
                placeName: ''
            }
        });
    };

    placeRemoveHandler = () => {
        this.setState(prevState => {
            return {
                places: prevState.places.filter((place) => place.key !== prevState.selectedPlace.key)
            }
        });
        this.closeModal();
    };

    closeModal = () => {
        this.setState({
            selectedPlace: null
        })
    };

    placeSelectedHandler = (key) => {
        this.setState(prevState => {
            return {
                selectedPlace: prevState.places.find(place => place.key === key)
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <PlaceDetail
                    selectedPlace={this.state.selectedPlace}
                    onModalClosed={this.closeModal}
                    onRemoveItem={this.placeRemoveHandler}/>
                <PlaceInput
                    placeholder='Enter a place...'
                    placeName={this.state.placeName}
                    btnTitle='Add'
                    addItem={this.placeAddedHandler}
                    inputChange={this.placeNameChangeHandler}
                />
                <PlaceList
                    places={this.state.places}
                    onItemSelected={this.placeSelectedHandler}/>
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
