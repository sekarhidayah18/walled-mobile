import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function Button({ bgColor = "#19918F", text, onPress = () => {} }) {
    return (
        <TouchableOpacity 
        onPress={onPress}
        style={{ ...styles.button, backgroundColor: bgColor }}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        marginTop: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Button