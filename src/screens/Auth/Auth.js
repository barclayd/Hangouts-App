import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import startMainTabs from '../MainTabs/startMainTabs';
import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {

    loginHandler = () => {
        startMainTabs();
    };

    render() {

        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <MainText>
                    <HeadingText>Login</HeadingText>
                </MainText>
                <ButtonWithBackground color='#a1d0ff' onPress={() => alert('Hello!')}>Switch to Login</ButtonWithBackground>
                <View style={styles.inputContainer}>
                <DefaultInput placeholder='Email' style={styles.input}/>
                <DefaultInput placeholder='Password' style={styles.input} />
                <DefaultInput placeholder='Confirm Password' style={styles.input}/>
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
    }
});

export default AuthScreen;
