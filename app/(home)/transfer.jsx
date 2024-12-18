import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function Transfer() {

    const [value, setValue] = useState('');
    const [note, setNote] = useState('');
    const [norek, setNorek] = useState('');

    // Fungsi untuk menambahkan titik setiap ribuan
    const formatNumber = (text) => {
        const cleaned = text.replace(/\D/g, ''); // Menghapus karakter non-digit
        return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Menambahkan titik setiap ribuan
    };

    // Fungsi untuk menangani perubahan input
    const handleInputChange = (text) => {
        // const formattedValue = formatNumber(text);
        setValue(text);
    };
    // fungsi untuk menangani aksi saat botton Topup ditekan
    const handleTrans = async () => {
        if (!norek || !value || !note) {
            Alert.alert('Error', 'Please fill in both amount and notes');
            return;
        }


        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                // console.log(token, 'token');
                try {
                    // console.log('topup!', value, note)
                    const response = await axios.post('https://walled-api.vercel.app/transactions/transfer', {
                        to: norek,
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
setNorek('');
setValue('');
setNote('');
    };
    return (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: "space-between" }}>
            <View style={{ alignItems: 'center', width: '100%' }}>
                <View style={styles.to}>
                    <Text style={{ fontSize: 16, color: '#fff', lineHeight: 15, paddingBottom:0 }}>To:   </Text>
                    <TextInput
                        style={styles.transnumber}
                        keyboardType='numeric'
                    />

                </View>

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
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View>
                            <Text style={{ color: "#B3b3b3", fontSize: 14 }}>Balance</Text>
                        </View>
                        <View>
                            <Text style={{ color: "#19918F", fontSize: 14 }}>IDR 10.000.0000</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.notebox}>
                    <Text style={styles.placeholder}>Notes</Text>
                    <TextInput style={styles.inputnote} />
                </View>
            </View>

            <TouchableOpacity>
                <View style={styles.buttontrans}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18, }}>Transfer</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20,
        backgroundColor: "white",
        marginTop: 25,
    },
    to: {
        width: "100%",
        padding: 20,
        backgroundColor: "#19918F",
    },
    notebox: {
        width: "100%",
        padding: 20,
        backgroundColor: "white",
        marginTop: 25,
    },
    placeholder: {
        color: "#B3b3b3",
        fontSize: 16,
    },
    transnumber: {
        fontSize: 16,
        color: 'white',
        borderBottomColor: "#B3B3B3",
        borderBottomWidth: 0.5,
        width: '100%',
        paddingVertical:0,
        paddingLeft:25
    },
    currency: {
        fontSize: 18,
        paddingBottom:0
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
        paddingBottom:0,
        paddingTop:0,
        paddingLeft:33
    },
    inputnote: {
        fontSize: 16,
        borderBottomColor: "#B3B3B3",
        borderBottomWidth: 0.5,
        width: '100%',
    },
    buttontrans: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        width: 397,
        alignItems: 'center',
        backgroundColor: '#19918F',
        borderRadius: 10,
        marginBottom: 15,
    },
});

export default Transfer