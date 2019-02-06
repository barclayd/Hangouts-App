import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

const listItem = (props) => (
    <TouchableOpacity onPress={() => props.onItemSelected(props.itemId)} onLongPress={() => alert(`Item id: ${props.itemId} was long pressed`)}>
        <View style={styles.listItem}>
            <Text style={{fontSize: 20}}>{props.placeName}</Text>
            <Image resizeMode='cover' source={props.placeImage} style={styles.placeImage}/>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        padding: 20,
        backgroundColor: '#eee',
        margin: 10,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    placeImage: {
        marginRight: 8,
        height: 60,
        width: 60
    }
});

export default listItem;
