import React from 'react';
import {Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const placeDetail = (props) => {
    let modalContent;
    if (props.selectedPlace) {
        modalContent = (
            <View>
                <Image source={props.selectedPlace.image} style={styles.placeImage}/>
                <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
            </View>
        );
    }
    return (
        <Modal onRequestClose={props.onModalClosed} visible={props.selectedPlace !== null} animationType="slide">
            <View style={styles.modalContainer}>
                {modalContent}
            </View>
                <View>
                    <TouchableOpacity onPress={() => props.onRemoveItem()}>
                        <View style={styles.deleteButton}>
                        <Icon size={30} color='#B33A3A' name="ios-trash"/>
                        </View>
                    </TouchableOpacity>
                    <Button title='Close' onPress={props.onModalClosed}/>
                </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
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
