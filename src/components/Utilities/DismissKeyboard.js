import {
    Keyboard,
    TouchableWithoutFeedback,
    View,
    StyleSheet
} from "react-native";
import React from "react";

export const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                        {children}
            </View>
        </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});




