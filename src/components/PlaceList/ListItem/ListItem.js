import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const listItem = (props) => (
    <TouchableOpacity onPress={() => props.removeHandler(props.itemId)} onLongPress={() => alert(`Item id: ${props.itemId} was long pressed`)}>
        <View style={styles.listItem}>
            <Text style={{fontSize: 20}}>{props.placeName}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        padding: 20,
        backgroundColor: '#eee',
        margin: 10
    }
});

export default listItem;
