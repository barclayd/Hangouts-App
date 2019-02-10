import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawer extends Component {
    render() {
        return (
            <View style={[styles.container, {
                width: Dimensions.get("window").width * 0.95
            }]}>
                <TouchableOpacity>
                    <View style={styles.drawItem}>
                        <Icon size={30} color='#fff' name="ios-log-out" style={styles.drawItemIcon} />
                        <Text style={styles.text}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        backgroundColor: "#000d1a",
        color: '#fff',
        flex: 1
    },
    drawItem: {
        color: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
        marginTop: 20
    },
    text: {
        color: '#fff',
        fontSize: 24,
        width: '80%',
    },
    drawItemIcon: {
        marginRight: 30
    }

});

export default SideDrawer;
