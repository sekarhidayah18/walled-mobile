import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, FlatList } from 'react-native';
import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const [showAmount, setShowAmount] = useState(true);

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
          // console.log(user, "....")
          setUser(user)
        }
      } catch (e) {
        // console.log(e);
      }
    };
    getData();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
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
        // console.log(e);
      }
    };
    const getDataTransactions = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          const res = await axios.get(
            "https://walled-api.vercel.app/transactions",
            {
              headers: {
                Authorization: `Bearer ${value}`,
              },
            }
          );
          const transactions = res.data.data
          // console.log(transactions, "sekar")
          setTransactions(transactions)
        }
      } catch (e) {
        // console.log(e);
      }
    };
    getData();
    getDataTransactions();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          const res = await axios.get(
            "https://walled-api.vercel.app/transactions",
            {
              headers: {
                Authorization: `Bearer ${value}`,
              },
            }
          );
          const transactions = res.data.data
          // console.log(transactions, "sekar")
          setTransactions(transactions)
        }
      } catch (e) {
        // console.log(e);
      }
    };
    getData();
  }, []);

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <LogoTitle avatar={user?.avatar_url} />
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user.fullname}</Text>
              <Text style={{ fontSize: 18 }}>Personal Account</Text>
            </View>
          </View>
          <Image source={require('../../assets/littlesun.png')} style={{ width: 30, height: 30 }} />
        </View>
        <View style={{ paddingHorizontal: 23 }}>
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
                  ? Intl.NumberFormat(
                    'id-ID',
                    {
                      style: 'currency',
                      currency: 'IDR',
                    }
                  ).format(user.wallet?.balance || 0)
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
                <Link href="/topup">
                  <FontAwesome6 size={18} name="add" color={'#fff'} />
                </Link>
              </TouchableOpacity>


              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: '#19918F', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Link href="/transfer">
                  <FontAwesome size={18} name="send" color={'#fff'} />
                </Link>
              </TouchableOpacity>

            </View>
          </View>
        </View>

        <View style={styles.transbox}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'left', color: '#19918f' }}>Transaction History</Text>
        </View>

        <ScrollView>
          <View style={styles.translist}>
            {transactions
              ?.sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date))
              .map((transaction) => {
                return (
                  <View key={transaction.id} style={styles.datatrans}>
                    <View>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{transaction.recipient_fullname}</Text>
                      <Text style={{ fontSize: 16, color: 'black' }}>{transaction.description}</Text>
                      <Text style={{ fontSize: 16, color: '#b3b3b3' }}>{new Intl.DateTimeFormat('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false, // Format 24 jam (non-AM/PM)
                      }).format(new Date(transaction.transaction_date))} </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          color: user.id === transaction.recipient_wallet_id || transaction.transaction_type === "top-up" ? 'green' : 'red',
                        }}
                      >
                        {transaction.recipient_wallet_id === user.id || transaction.transaction_type === "top-up" ? '+' : '-'}
                        {Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 2,
                        }).format(transaction.amount)}
                      </Text>
                    </View>
                  </View>
                )
              })}

          </View>
        </ScrollView>

        <StatusBar style="auto" hidden />
      </ScrollView>
    </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    flex: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 23,
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: '#fff',
    marginBottom: 0,
  },
  container: {
    flex: 1,
  },
  scrollView: {
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
  datatrans: {
    paddingHorizontal: 20,
    paddingVertical: 3,
    flexDirection: 'row',
    width: 397,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderTopColor: '#b3b3b3',
    borderTopWidth: 0.1,
  },
  accountnumber: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    width: 397,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#19918F',
    marginTop: 24,
    marginBottom: 15,
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 397,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    borderBottomColor: '#b3b3b3',
    borderBottomWidth: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});