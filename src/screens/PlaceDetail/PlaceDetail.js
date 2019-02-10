import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as actions from '../../store/actions/index';

class PlaceDetail extends Component {

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = () => {
        this.setState({
            viewMode: Dimensions.get("window").height > 800 ? 'portrait' : 'landscape'
        });
    };

    state = {
        viewMode: Dimensions.get("window").height > 800 ? 'portrait' : 'landscape'
    };


    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    };

    render() {

        const landscapeContent = (
            <View style={styles.landscapeContainer}>
                <View style={styles.landscapePlaceImage}>
                    <Image source={this.props.selectedPlace.image} style={styles.portraitPlaceImage}/>
                </View>
                <View style={styles.landscapeTextIconContainer}>
                    <Text style={styles.portraitPlaceName}>{this.props.selectedPlace.name}</Text>
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={styles.deleteButton}>
                            <Icon size={30} color='#B33A3A' name={(Platform.OS === 'android' ? "md-trash" : "ios-trash")}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
        if ( Dimensions.get("window").height < 800) {
            return landscapeContent;
        }

        return (
            <View styles={styles.container}>
                <View>
                    <View>
                        <Image source={this.props.selectedPlace.image} style={styles.portraitPlaceImage}/>
                        <Text style={styles.portraitPlaceName}>{this.props.selectedPlace.name}</Text>
                    </View>
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={styles.deleteButton}>
                            <Icon size={30} color='#B33A3A' name={(Platform.OS === 'android' ? "md-trash" : "ios-trash")}/>
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
    landscapeContainer: {
        flexDirection: 'row',
        margin: 40
    },
    portraitPlaceImage: {
        width: '100%',
        height: 200
    },
    landscapePlaceImage: {
        width: '50%',
        height: 100
    },
    landscapeTextIconContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%'
    },
    portraitPlaceName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
        alignSelf: 'center',
        marginBottom: 10
    },
    deleteButton: {
        marginTop: 10,
        alignSelf: 'flex-end'
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(actions.deletePlace(key))
    }
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
