import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, Modal, Pressable, ScrollView } from 'react-native';
import Button from '../components/Button';
import { Link } from 'expo-router';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function Register() {
    const [isChecked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>

            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#aaa"
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType='email-address'
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry={true} //false password akan terlihat
            />

            <TextInput
                style={styles.input}
                placeholder="Avatar URL"
                placeholderTextColor="#aaa"
            />
            <View style={styles.tnc}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#19918F' : undefined}
                />

                <Text style={{ fontSize: 18, alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                    I have read and agree to the{" "}
                    <Link href="/tnc">
                        <Text style={{ color: '#19918F', fontSize: 18 }}>
                            Term and Conditions <Text style={{ color: 'red', fontSize: 18 }}>*</Text>
                        </Text>
                    </Link>

                </Text>
            </View>

            <Button text="Register" />

            <Text style={styles.register}>
                Have account? <Link href="/" style={styles.here}>Login Here!</Link>
            </Text>

            <StatusBar style="auto" hidden />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    logo: {
        width: 233,
        height: 57,
        marginBottom: 30,
        resizeMode: 'stretch',
        marginBottom: 75
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
    },
    register: {
        fontSize: 18,
        marginTop: 15,
        alignItems: "flex-start"
    },
    here: {
        fontSize: 18,
        color: "#19918F"
    },
    tnc: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 12,
        display: 'flex',
    }
});
