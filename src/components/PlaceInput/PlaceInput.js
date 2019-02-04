import React from 'react';
import {StyleSheet, TextInput, Button, View} from 'react-native';

const placeInput = props => (
    <View style={styles.inputContainer}>
        <TextInput style={styles.placeInput} placeholder={props.placeholder} value={props.placeName} onChangeText={props.inputChange}/>
        <Button title={props.btnTitle} onPress={props.addItem} style={styles.placeButton}/>
    </View>
);

const styles = StyleSheet.create({
    placeInput: {
        width: '70%'
    },
    placeButton: {
        width: '30%'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
});

export default placeInput;
