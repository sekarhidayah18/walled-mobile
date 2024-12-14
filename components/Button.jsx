import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function Button({ bgColor = "#19918F", text, to }) {
    return (
        <TouchableOpacity style={{ ...styles.button, backgroundColor: bgColor }}
            onPress={() => {
                router.replace(to)
            }}
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
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Button