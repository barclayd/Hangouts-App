import React, {Component} from 'react';
import {StyleSheet, View, Button, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

class MapPicker extends Component {

    state = {
        focusedLocation: {
            latitude: 51.4816,
            longitude: -3.1791,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.122
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    style={styles.map}
                />
                <View style={styles.button}>
                    <Button title="Locate me" onPress={() => alert('Pick location!')}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    map: {
        width: '100%',
        height: 250
    },
    button: {
        margin: 8
    }
});

export default MapPicker;
