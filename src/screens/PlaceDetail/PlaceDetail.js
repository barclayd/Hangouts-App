import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MapDisplay from '../../components/MapDisplay/MapDisplay';
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
            <ScrollView style={styles.container}>
            <View style={styles.landscapeContainer}>
                <View style={styles.landscapePlaceImage}>
                    <Image source={this.props.selectedPlace.image} style={styles.portraitPlaceImage}/>
                </View>
                <View style={styles.landscapeTextIconContainer}>
                    <MapDisplay lat={this.props.selectedPlace.location.latitude} long={this.props.selectedPlace.location.longitude} viewMode={this.state.viewMode}/>
                </View>
                </View>
                <View style={styles.landscapeColumnContainer}>
                    <Text style={styles.portraitPlaceName}>{this.props.selectedPlace.name}</Text>
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={styles.deleteButton}>
                            <Icon size={30} color='#B33A3A' name={(Platform.OS === 'android' ? "md-trash" : "ios-trash")}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
        if ( Dimensions.get("window").height < 800) {
            return landscapeContent;
        }

        return (
            <View styles={styles.container}>
                <View>
                    <View>
                        <Image source={this.props.selectedPlace.image} style={styles.portraitPlaceImage}/>
                        <View style={styles.placeText}>
                            <Text style={styles.portraitPlaceName}>{this.props.selectedPlace.name}</Text>
                        </View>
                    </View>
                    <View style={styles.mapView}>
                        <MapDisplay lat={this.props.selectedPlace.location.latitude} long={this.props.selectedPlace.location.longitude}/>
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
        margin: 40,
        flex: 1
    },
    landscapeContainer: {
        flexDirection: 'row',
        margin: 40
    },
    landscapeColumnContainer: {
        flexDirection: 'column'
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
        width: '50%',
        flex: 1
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
        alignSelf: 'center'
    },
    placeText: {
        marginTop: 20
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(actions.deletePlace(key))
    }
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
