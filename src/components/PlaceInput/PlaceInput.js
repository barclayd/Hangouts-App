import React, {Component} from 'react';
import {StyleSheet, TextInput, Button, View} from 'react-native';

class PlaceInput extends Component {

    state = {
        placeName: ''
    };

    placeNameChangeHandler = (value) => {
        this.setState({
            placeName: value
        });
    };

    placeSubmitHandler = () => {
        if (this.state.placeName.trim() === "") {
            return;
        }
        this.props.onPlaceAdded(this.state.placeName);
    };


    render() {

        return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.placeInput} placeholder='An Awesome Place' value={this.state.placeName} onChangeText={this.placeNameChangeHandler}/>
            <Button title='Add' onPress={this.placeSubmitHandler} style={styles.placeButton}/>
        </View>
        );

    }
}

const styles = StyleSheet.create({
    placeInput: {
        width: '70%'
    },
    placeButton: {
        width: '30%'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
});

export default PlaceInput;
