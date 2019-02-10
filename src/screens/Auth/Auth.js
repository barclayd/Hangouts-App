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

    loginHandler = () => {
        startMainTabs();
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
                        <DefaultInput placeholder='Email' style={styles.input}/>
                        <View
                            style={this.state.viewMode === 'portrait' ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                            <View
                                style={this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput placeholder='Password' style={styles.input}/>
                            </View>
                            <View
                                style={this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput placeholder='Confirm Password' style={styles.input}/>
                            </View>
                        </View>
                    </View>
                    <ButtonWithBackground color='#a1d0ff' onPress={this.loginHandler}>Submit</ButtonWithBackground>
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
