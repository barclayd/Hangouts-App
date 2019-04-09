import React, {Component} from 'react';
import {View, Button, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
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

    componentDidUpdate() {
        if (this.props.placeAdded) {
            this.props.navigator.switchToTab({tabIndex: 0});
        }
    }

    componentWillMount() {
        this.reset();
    }

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
        this.reset();
        this.imagePicker.reset();
        this.mapPicker.reset();
    };

    onNavigatorEvent = (event) => {
        if (event.type === "ScreenChangedEvent" && event.id === "willAppear") {
            this.props.onStartAddPlace();
        }
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

    reset = () => {
        this.setState({
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
        })
    };

    render() {
        console.log(this.props);
        let submitButton = (
            <Button disabled={
            !this.state.controls.placeName.valid ||
            !this.state.controls.location.valid ||
            !this.state.controls.image.valid} title='Share Place' onPress={this.placeSubmitHandler}/>
        );
        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />
        }
        return (
            <DismissKeyboard>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>
                            Share a place with us!
                        </HeadingText>
                    </MainText>
                    <PickImage ref={ref => (this.imagePicker = ref)} onImagePicked={this.imagePickedHandler} />
                    <Map ref={ref => (this.mapPicker = ref)} onLocationPicker={this.locationPickedHandler} />
                    <PlaceInput
                        placeholder='Place Name'
                        value={this.state.controls.placeName.value}
                        valid={this.state.controls.placeName.valid}
                        touched={this.state.controls.placeName.touched}
                        placeChangeName={(val) => this.updateInputHandler('placeName', val)}/>
                    <View style={styles.button}>
                        {submitButton}
                    </View>
                </View>
            </KeyboardAwareScrollView>
            </DismissKeyboard>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        placeAdded: state.places.placeAdded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, placeLocation, image) => dispatch(actions.addPlace(placeName, placeLocation, image)),
        onStartAddPlace: () => dispatch(actions.startAddPlace())
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
export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
