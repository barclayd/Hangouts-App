import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const placeDetail = (props) => {
    return (
        <View styles={styles.container}>
                <View>
                    <View>
                        <Image source={props.selectedPlace.image} style={styles.placeImage} />
                        <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.onRemoveItem()}>
                        <View style={styles.deleteButton}>
                        <Icon size={30} color='#B33A3A' name="ios-trash"/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 40
    },
    placeImage: {
        width: '100%',
        height: 200
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
        marginTop: 10
    },
    deleteButton: {
        alignItems: 'center'
    }
});

export default placeDetail;
