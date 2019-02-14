import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import startMainTabs from '../MainTabs/startMainTabs';
import backgroundImage from '../../assets/background.jpg';
import validate from '../../utility/validation';

class AuthScreen extends Component {
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
        viewMode: Dimensions.get("window").height > 800 ? 'portrait' : 'landscape',
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password:  {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
            }
        }
    };

    loginHandler = () => {
        startMainTabs();
    };

    updateInputHandler = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            }
        }
        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            }
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password' ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue) : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    }
                }
            }
        })
    };

    render() {
        const headingText = (
            <MainText>
                <HeadingText>Login</HeadingText>
            </MainText>
        );


        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    {this.state.viewMode === 'portrait' ? headingText : null}
                    <ButtonWithBackground color='#a1d0ff' onPress={() => alert('Hello!')}>Switch to
                        Login</ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput
                            placeholder='Email'
                            style={styles.input}
                            textContentType='username'
                            autoCorrect= {false}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            value={this.state.controls.email.value}
                            valid={this.state.controls.email.valid}
                            touched={this.state.controls.email.touched}
                            onChangeText={(val) => this.updateInputHandler('email', val)}/>
                        <View
                            style={this.state.viewMode === 'portrait' ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                            <View
                                style={this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput
                                    placeholder='Password'
                                    style={styles.input}
                                    secureTextEntry
                                    textContentType='newPassword'
                                    valid={this.state.controls.password.valid}
                                    touched={this.state.controls.password.touched}
                                    onChangeText={(val) => this.updateInputHandler('password', val)}/>
                            </View>
                            <View
                                style={this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput
                                    placeholder='Confirm Password'
                                    textContentType='password'
                                    style={styles.input}
                                    secureTextEntry
                                    valid={this.state.controls.confirmPassword.valid}
                                    touched={this.state.controls.confirmPassword.touched}
                                    onChangeText={(val) => this.updateInputHandler('confirmPassword', val)}/>
                            </View>
                        </View>
                    </View>
                    <ButtonWithBackground
                        color='#a1d0ff'
                        disabled={!this.state.controls.password.valid || !this.state.controls.confirmPassword.valid || !this.state.controls.email.valid}
                        onPress={this.loginHandler}>Submit</ButtonWithBackground>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb',
        opacity: 0.5
    },
    backgroundImage: {
        width: '100%',
        flex: 1
    },
    landscapePasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    portraitPasswordContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    landscapePasswordWrapper: {
        width: '40%'
    },
    portraitPasswordWrapper: {
        width: '100%'
    }
});

export default AuthScreen;
