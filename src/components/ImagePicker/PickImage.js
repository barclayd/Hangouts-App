import React, {Component} from 'react';
import {View, Image, Button} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {

    state = {
        pickedImage: null
    };

    pickImageHandler = () => {
      ImagePicker.showImagePicker({
          title: "Pick an image!"
      }, res => {
            if (res.didCancel) {
                console.log('User cancelled');
            } else if (res.error) {
                console.log('Error', res.error);
            } else {
               this.setState({
                   pickedImage: {
                       uri: res.uri
                   }
               });
               this.props.onImagePicked({
                   uri: res.uri
               });
            }
          });
    };

    render() {
        return (
            <>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.previewImage}/>
                </View>
                <View style={styles.button}>
                    <Button title="Pick Image" onPress={this.pickImageHandler}/>
                </View>
            </>
        )
    }

}

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

export default PickImage;
