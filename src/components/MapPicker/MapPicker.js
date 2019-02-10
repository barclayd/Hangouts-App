import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

const mapPicker = props => {

    return (
        <>
            <View style={styles.placeholder}>
                <Text>
                    Map
                </Text>
            </View>
            <View style={styles.button}>
                <Button title="Locate me" onPress={() => alert('Pick location!')}/>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    placeholder: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    button: {
        margin: 8
    }
});

export default mapPicker;
