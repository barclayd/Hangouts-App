import React from 'react';
import {TouchableOpacity, TouchableNativeFeedback, StyleSheet, Text, View, Platform} from 'react-native';

const buttonWithBackground = props => {

    const content = (
        <View style={[styles.button, {backgroundColor: props.color}, props.disabled ? styles.disabled : null]}>
            <Text style={props.disabled ? styles.disabledText : null}>{props.children}</Text>
        </View>
    );
    if (props.disabled) {
        return content;
    }
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        )
    }
    return (
        <TouchableOpacity onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
   button: {
       padding: 10,
       margin: 5,
       opacity: .7,
       borderRadius: 10
   },
    disabled: {
       backgroundColor: '#eee'
    },
    disabledText: {
        color: '#aaa',
        borderColor: '#aaa'
    }
});

export default buttonWithBackground;
