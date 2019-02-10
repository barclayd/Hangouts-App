import React from 'react';
import {TouchableOpacity, TouchableNativeFeedback, StyleSheet, Text, View, Platform} from 'react-native';

const buttonWithBackground = props => {

    const content = (
        <View style={[styles.button, {backgroundColor: props.color}]}>
            <Text>{props.children}</Text>
        </View>
    );

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
   }
});

export default buttonWithBackground;
