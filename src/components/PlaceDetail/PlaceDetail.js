import React from 'react';
import {Modal, View, Image, Text, Button, StyleSheet} from 'react-native';

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
                    <Button title='Delete' color='#B33A3A' onPress={() => props.onRemoveItem()}/>
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
    }
});

export default placeDetail;
