import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

class SideDrawer extends Component {
    render() {
        return (
            <View style={[styles.container, {
                width: Dimensions.get("window").width * 0.95
            }]}>
                <Text style={styles.text}> Welcome to Side Drawer </Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        backgroundColor: "#000d1a",
        color: '#fff',
        flex: 1
    },
    text: {
        color: "#fff",
        marginTop: (Dimensions.get("window").height / 2) - 20,
        marginLeft: (Dimensions.get("window").width / 5) - 20
    }
});

export default SideDrawer;
