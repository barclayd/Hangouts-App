import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';

const buttonWithBackground = props => (
    <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.button, {backgroundColor: props.color}]}>
            <Text>{props.children}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
   button: {
       padding: 10,
       margin: 5,
       opacity: .7,
       borderRadius: 10
   }
});

export default buttonWithBackground;
