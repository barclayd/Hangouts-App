import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as actions from '../../store/actions/index';

class PlaceDetail extends Component {

    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    };

    render() {
        return (
            <View styles={styles.container}>
                <View>
                    <View>
                        <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
                        <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                    </View>
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={styles.deleteButton}>
                            <Icon size={30} color='#B33A3A' name="ios-trash"/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 40
    },
    placeImage: {
        width: '100%',
        height: 200
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
        marginTop: 10
    },
    deleteButton: {
        alignItems: 'center'
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(actions.deletePlace(key))
    }
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
