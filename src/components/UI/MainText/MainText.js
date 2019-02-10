import React from 'react';
import {Text, StyleSheet} from 'react-native'

const mainText = props => (
    <Text style={styles.mainText}>{props.children}</Text>
);

const styles = StyleSheet.create({
    mainText: {
        color: '#003366',
        textAlign: 'center',
        marginBottom: 5
    }
});

export default mainText;
