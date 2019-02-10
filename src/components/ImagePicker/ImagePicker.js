import React from 'react';
import {View, Image, Button} from 'react-native';
import imagePlaceholder from "../../assets/manchester.jpg";

const imagePicker = props => {

    return (
        <>
        <View style={styles.placeholder}>
            <Image source={imagePlaceholder} style={styles.previewImage}/>
        </View>
        <View style={styles.button}>
            <Button title="Pick Image" onPress={() => alert('Pick an image!')}/>
        </View>
        </>
    )

};

const styles = {
    placeholder: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    previewImage: {
        width: '100%',
        height: '100%'
    },
    button: {
        margin: 8
    }
};

export default imagePicker;
