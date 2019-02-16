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
        },
        locationChosen: false
    };

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
           ...this.state.focusedLocation,
           latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            }
        });
        this.props.onLocationPicker({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
    };

    getLocationHandler = () => {
      navigator.geolocation.getCurrentPosition(pos => {
          const coordsEvent = {
              nativeEvent: {
                  coordinate: {
                      latitude: pos.coords.latitude,
                      longitude: pos.coords.longitude
                  }
              }
          };
        this.pickLocationHandler(coordsEvent);
      }, err => {
          console.log(err);
          alert('Fetching your location failed. Please pick a location on the map instead');
      })
    };

    render() {
        let marker = null;
        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation}/>
        }
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}
                >
                    {marker}
                </MapView>
                <View style={styles.button}>
                    <Button title="Locate me" onPress={this.getLocationHandler}/>
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
