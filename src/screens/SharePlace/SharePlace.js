import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/ImagePicker/PickImage';
import {DismissKeyboard} from '../../components/Utilities/DismissKeyboard';
import Map from '../../components/MapPicker/MapPicker';
import * as actions from '../../store/actions/index';
import validate from "../../utility/validation";

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: '#003366'
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    state = {
        controls: {
            placeName: {
                value: '',
                valid: false,
                validationRules: {
                    isNotNull: false
                },
                touched: false
            },
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            }
        }
    };

    updateInputHandler = (key, value) => {
        this.setState(prevState => {
           return {
               controls: {
                   ...prevState.controls,
                   [key]: {
                       ...prevState.controls[key],
                       value: value,
                       valid: validate(value, prevState.controls[key].validationRules),
                       touched: true
                   }
               }
           }
        });
    };

    placeSubmitHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value,
            this.state.controls.location.value,
            this.state.controls.image.value
        );
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

    locationPickedHandler = location => {
      this.setState(prevState => {
          return {
              controls: {
                  ...prevState.controls,
                  location: {
                      value: location,
                      valid: true
                  }
              }
          }
      });
    };

    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    };

    render() {
        return (
            <DismissKeyboard>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>
                            Share a place with us!
                        </HeadingText>
                    </MainText>
                    <PickImage onImagePicked={this.imagePickedHandler} />
                    <Map onLocationPicker={this.locationPickedHandler} />
                    <PlaceInput
                        placeholder='Place Name'
                        value={this.state.controls.placeName.value}
                        valid={this.state.controls.placeName.valid}
                        touched={this.state.controls.placeName.touched}
                        placeChangeName={(val) => this.updateInputHandler('placeName', val)}/>
                    <View style={styles.button}>
                        <Button disabled={
                            !this.state.controls.placeName.valid ||
                            !this.state.controls.location.valid ||
                            !this.state.controls.image.valid} title='Share Place' onPress={this.placeSubmitHandler}/>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            </DismissKeyboard>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, placeLocation, image) => dispatch(actions.addPlace(placeName, placeLocation, image))
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
