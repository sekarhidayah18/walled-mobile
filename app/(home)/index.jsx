import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet, TouchableOpacity, } from 'react-native';
import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function LogoTitle({ avatar }) {
  const [isAvatarActive, setIsAvatarActive] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.avatarContainer,
        { borderColor: isAvatarActive ? '#4cc4c2' : '#19918F' },
      ]}
      onPress={() => setIsAvatarActive((prev) => !prev)}
      activeOpacity={0.8}
    >
      {/* Konten di dalam TouchableOpacity, misalnya gambar */}
     
      <Image style={styles.image} source={{ uri: avatar }} />
    </TouchableOpacity >

  );
}

export default function Home() {
  const [showBalance, setShowBalance] = useState(true);
  const [user, setUser] = useState({})
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          const res = await axios.get(
            "https://walled-api.vercel.app/profile",
            {
              headers: {
                Authorization: `Bearer ${value}`,
              },
            }
          );
          const user = res.data.data
          console.log(user, "....")
          setUser(user)
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
          <LogoTitle avatar={user?.avatar_url} />
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user.fullname}</Text>
            <Text style={{ fontSize: 18 }}>Personal Account</Text>
          </View>
        </View>
        <Image source={require('../../assets/littlesun.png')} />
      </View>
      <View style={{ paddingHorizontal: 23, paddingVertical: 12, }}>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 25, justifyContent: 'space-between' }}>
          <View style={{ width: '70%' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Good Morning, {user.fullname}!</Text>
            <Text style={{ fontSize: 18 }}>Check all your incoming and outgoing transactions here</Text>
          </View>
          <Image source={require('../../assets/sun.png')} style={{ width: 90, height: 86 }} />
        </View>
      </View>

      <View style={styles.accountnumber}>
        <Text style={{ color: '#fff', fontSize: 18 }}>Account No.</Text>
        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>{user.wallet?.account_number}</Text>
      </View>

      <View style={styles.balancebox}>

        <View>
          <Text style={{ color: 'black', fontSize: 18 }}>Balance</Text>
          <View style={{ gap: 2 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
              {showBalance
                ? `Rp${user.wallet?.balance?.toLocaleString("id-ID")}`
                : "Rp ****"}
              <TouchableOpacity onPress={() => setShowBalance((prev) => !prev)}>
                <Image source={require('../../assets/view.png')} style={{ width: 18, height: 18, marginLeft: 10 }} />
              </TouchableOpacity>
            </Text>
          </View>
        </View>

        <View>
          <View style={{ gap: 20, alignContent: 'flex-end' }}>
            <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: '#19918F', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome6 size={18} name="add" color={'#fff'} />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: '#19918F', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome size={18} name="send" color={'#fff'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.transbox}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'left' }}>Transaction History</Text>
      </View>

      <StatusBar style="auto" hidden />
    </View>
  );
}


const user = {
  fullname: 'Chelsea Olivia',
  typeofaccount: 'Personal Account',
  accountnumber: '100899',
  balance: '10.000.000'
}

const transactions = [
  {
    id: 1,
    date: '08 December 2024',
    amount: '75.000',
    name: 'Indoapril',
    type: 'Topup',
    debit: false,
  },
  {
    id: 2,
    date: '06 December 2024',
    amount: '80.000',
    name: 'Si Fulan',
    type: 'Transfer',
    debit: true,
  },
]


const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    flex: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 23,
    paddingBottom: 12,
    paddingTop: 15,
    backgroundColor: '#fff',
    marginBottom: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    borderRadius: 9999,
    width: 50,
    height: 50,
    alignItems: 'center',
  },
  avatarContainer: {
    borderRadius: 9999, // Full circle
    borderWidth: 6,
    cursor: "pointer", // Optional for web
    transition: "all 0.3s", // Optional for web
    alignItems: 'center',
  },
  accountnumber: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    width: 397,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#19918F',
    marginVertical: 15,
    borderRadius: 10,
  },
  balancebox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    width: 397,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transbox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    width: 397,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
