import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';


const mapDisplay = props => {

    let passedCoordinates = {
        latitude: props.lat,
        longitude: props.long,
        latitudeDelta: 0.0122,
        longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.122
    };

    return (
        <View style={styles.container}>
            <MapView
                region={passedCoordinates}
                style={props.viewMode === 'landscape' ? styles.landscapeMap : styles.map}>
                <MapView.Marker coordinate={passedCoordinates}/>
            </MapView>
        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    map: {
        width: '100%',
        height: 250
    },
    landscapeMap: {
        width: '100%',
        height: 200
    }
});

export default mapDisplay;
