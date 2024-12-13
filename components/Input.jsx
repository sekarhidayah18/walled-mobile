import { TextInput, View, StyleSheet, Text } from "react-native";

function Input() {
    return (
        <View style={styles.container}>
            <Text style={styles.placeholder}>Notes</Text>
            <TextInput style={styles.input} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        backgroundColor: "white",
    },
    placeholder: {
        color: "#B3b3b3"
    },
    input: {
        borderBottomColor: "#B3B3B3",
        borderBottomWidth: 0.5,
    },
});


export default Input;