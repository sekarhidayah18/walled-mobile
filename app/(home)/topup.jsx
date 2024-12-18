import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function Topup() {

    const [value, setValue] = useState('');
    const [note, setNote] = useState('');

    // Fungsi untuk menambahkan titik setiap ribuan
    const formatNumber = (text) => {
        const cleaned = text.replace(/\D/g, ''); // Menghapus karakter non-digit
        return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Menambahkan titik setiap ribuan
    };

    // Fungsi untuk menangani perubahan input
    const handleInputChange = (text) => {
        const formattedValue = formatNumber(text);
        setValue(formattedValue);
    };
    // fungsi untuk menangani aksi saat botton Topup ditekan
    const handleTopUp = async () => {
        if (!value || !note) {
            Alert.alert('Error', 'Please fill in both amount and notes');
            return;
        }


        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                console.log(token, 'token');
                try {
                    console.log('topup!', value, note)
                    const response = await axios.post('https://walled-api.vercel.app/transactions/topup', {
                        amount: value,
                        description: note,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    // if (response.status === 200) {
                    //     console.log(response, "hasil response")
                    // }
                    // else {
                    //     console.log('gagal!')
                    // }
                    // memeriksa respon API
                    if (response.status === 201) {
                        Alert.alert('Success', 'Transaction succesful!');
                        // console.log(result);
                    } else {
                        Alert.alert('Error', 'Transaction failed');
                        console.log(response);
                    }
                } catch (error) {
                    Alert.alert('Error', 'Failed to perform the transaction');
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error, 'gagal mengambil token!')
        }

    };

    return (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: "space-between" }}>
            <View style={{ alignItems: 'center', width: '100%' }}>
                <View style={styles.container}>
                    <Text style={styles.placeholder}>Amount</Text>
                    <Text style={styles.currency}>
                        IDR<Text style={styles.superscript}></Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="0"
                        value={value}
                        onChangeText={handleInputChange}
                    />
                </View>

                <View style={styles.typebox}>
                    <View>
                        <Text style={{ fontSize: 20 }}>BYOND Pay</Text>
                    </View>

                    <View>
                        <TouchableOpacity>
                            <AntDesign name="down" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.notebox}>
                    <Text style={styles.placeholder}>Notes</Text>
                    <TextInput
                        style={styles.inputnote}
                        value={note}
                        onChangeText={setNote}
                    />
                </View>
            </View>

            <TouchableOpacity onPress={handleTopUp}>
                <View style={styles.buttontopup}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18, }}>Top Up</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        width: "100%",
        padding: 20,
        backgroundColor: "white",
        marginTop: 26,
    },
    notebox: {
        width: "100%",
        padding: 20,
        backgroundColor: "white",
        marginTop: 25,
    },
    typebox: {
        width: "100%",
        backgroundColor: "white",
        padding: 20,
        marginTop: 25,
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center',
    },
    placeholder: {
        color: "#B3b3b3",
        fontSize: 16,
    },
    currency: {
        fontSize: 18,
        paddingBottom: 0
    },
    superscript: {
        fontSize: 10,
        lineHeight: 10,
        position: 'relative',
    },
    input: {
        borderBottomColor: "#B3B3B3",
        borderBottomWidth: 0.5,
        fontSize: 30,
        width: '100%',
        paddingBottom: 0,
        paddingTop: 0,
        paddingLeft: 33
    },
    inputnote: {
        fontSize: 16,
        borderBottomColor: "#B3B3B3",
        borderBottomWidth: 0.5,
        width: '100%'
    },
    buttontopup: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        width: 397,
        alignItems: 'center',
        backgroundColor: '#19918F',
        borderRadius: 10,
        marginBottom: 15,
    },
});

export default Topup