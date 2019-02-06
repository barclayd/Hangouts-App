import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PlaceList from '../../components/PlaceList/PlaceList';
import PlaceDetail from '../../components/PlaceDetail/PlaceDetail';
import * as actions from '../../store/actions/index';

class Places extends Component {

    state = {
        placeName: ''
    };

    placeNameChangeHandler = (value) => {
        this.setState({
            placeName: value
        });
    };

    placeAddedHandler = () => {
        if(this.state.placeName.trim () === '') {
            return;
        }
        this.props.onAddPlace(this.state.placeName);
        this.setState({
            placeName: ''
        });
    };

    placeRemoveHandler = () => {
        this.props.onDeletePlace();
    };

    closeModal = () => {
       this.props.onDeselectPlace();
    };

    placeSelectedHandler = (key) => {
        this.props.onSelectPlace(key);
    };

    render() {
        return (
            <View style={styles.container}>
                <PlaceDetail
                    selectedPlace={this.props.selectedPlace}
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
                    places={this.props.places}
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

const mapStateToProps = state => {
    return {
        places: state.places.places,
        selectedPlace: state.places.selectedPlace
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: name => dispatch(actions.addPlace(name)),
        onDeletePlace: () => dispatch(actions.deletePlace()),
        onSelectPlace: key => dispatch(actions.selectPlace(key)),
        onDeselectPlace: () => dispatch(actions.deselectPlace())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Places);
