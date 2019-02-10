import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import startMainTabs from '../MainTabs/startMainTabs';
import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", () => {
            this.setState({
                respStyles: {
                    pwContainerDirection: Dimensions.get("window").height > 800 ? "column" : 'row',
                    pwContainerJustifyContent: Dimensions.get("window").height > 800 ? 'flex-start' : 'space-between',
                    pwWrapperWidth: Dimensions.get("window").height > 800 ? '100%' : '40%'
                }
            })
        });
    }

    state = {
        respStyles: {
            pwContainerDirection: "column",
            pwContainerJustifyContent: 'flex-start',
            pwWrapperWidth: '100%'
        }
    };

    loginHandler = () => {
        startMainTabs();
    };

    render() {
        let headingText = null;
        if (Dimensions.get("window").height > 800) {
            headingText = (
                <MainText>
                    <HeadingText>Login</HeadingText>
                </MainText>
            );
        }

        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                {headingText}
                <ButtonWithBackground color='#a1d0ff' onPress={() => alert('Hello!')}>Switch to Login</ButtonWithBackground>
                <View style={styles.inputContainer}>
                <DefaultInput placeholder='Email' style={styles.input}/>
                <View style={{
                    flexDirection: this.state.respStyles.pwContainerDirection,
                    justifyContent: this.state.respStyles.pwContainerJustifyContent
                }}>
                    <View style={{
                        width: this.state.respStyles.pwWrapperWidth
                    }}>
                        <DefaultInput placeholder='Password' style={styles.input} />
                    </View>
                    <View style={{
                        width: this.state.respStyles.pwWrapperWidth
                    }}>
                        <DefaultInput placeholder='Confirm Password' style={styles.input}/>
                    </View>
                </View>
                </View>
                <ButtonWithBackground color='#a1d0ff' onPress={this.loginHandler}>Submit</ButtonWithBackground>
            </View>
            </ImageBackground>

        );
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
    passwordContainer: {
        flexDirection: Dimensions.get("window").height > 800 ? 'column' : 'row',
        justifyContent: 'space-between',
    },
    passwordWrapper: {
        width: Dimensions.get("window").height > 800 ? '100%' : '40%'
    }
});

export default AuthScreen;
