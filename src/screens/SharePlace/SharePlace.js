import React, {Component} from 'react';
import {View, Button, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import ImagePicker from '../../components/ImagePicker/ImagePicker';
import Map from '../../components/MapPicker/MapPicker';
import * as actions from '../../store/actions/index';

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: '#003366'
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

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
        this.props.onAddPlace(this.state.placeName);
        this.setState({
            placeName: ''
        });
    };

    onNavigatorEvent = (event) => {
      console.log(event);
      if (event.type === 'NavBarButtonPress') {
          if(event.id === "sideDrawerToggle") {
              this.props.navigator.toggleDrawer({
                  side: "left"
              });
          }
      }
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>
                            Share a place with us!
                        </HeadingText>
                    </MainText>
                    <ImagePicker />
                    <Map />
                    <PlaceInput placeholder='Place Name' value={this.state.placeName} placeChangeName={this.placeNameChangeHandler}/>
                    <View style={styles.button}>
                        <Button title='Share Place' onPress={this.placeSubmitHandler}/>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(actions.addPlace(placeName))
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        margin: 8
    }
});
export default connect(null, mapDispatchToProps)(SharePlaceScreen);
