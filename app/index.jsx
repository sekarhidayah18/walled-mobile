import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import Button from '../components/Button';
import { Link, router } from 'expo-router';
import { z } from "zod";
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Must be 4 or more characters long" }),
});

export default function App() {
  const [form, setForm] = useState({ email: "", password: "" }); //object kosong karena form nya ga cuman 1 dan scema yang kita buat bentuknya object, jadi biar lebih gampang ubahnya
  const [errorMsg, setErrors] = useState({});
  const [serverError, setServerError] = useState("");


  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });

    try {
      LoginSchema.pick({ [key]: true }).parse({ [key]: value });
      setErrors((prev) => ({ ...prev, [key]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [key]: err.errors[0].message }));
    }
  };

  const handleSubmit = async () => {
    try {
      LoginSchema.parse(form); //* setelah di validasi emailnya 
      // console.log("masikkkkkk")

      const res = await axios.post("https://walled-api.vercel.app/auth/login", form);
      // console.log(res.data.data.token, "ini budi")
      await AsyncStorage.setItem("token", res.data.data.token);
      router.replace("/(home)")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setServerError(err.response.data.message || "An error occurred");
        } else if (err.request) {
          setServerError("Network error. Please try again later.");
          console.error("Network Error:", err.request);
        } else {
          setServerError("An unexpected error occurred.");
          console.error("Request Setup Error:", err.message);
        }
      } else if (err?.errors) {
        const errors = {};
        err.errors.forEach((item) => {
          const key = item.path[0];
          errors[key] = item.message;
        });
        setErrors(errors);
      } else {
        setServerError("An unknown error occurred.");
        console.error("Unhandled Error:", err);
      }
    }
  };

  return (
    <View style={styles.container}>
      {serverError && <Text>{serverError}</Text>}

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType='email-address'
        onChangeText={(text) => handleInputChange("email", text)}
      />
      {errorMsg.email ? <Text style={styles.errorMsg}>{errorMsg.email}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true} //false password akan terlihat
        onChangeText={(text) => handleInputChange("password", text)}
      />
      {errorMsg.password ? <Text style={styles.errorMsg}>{errorMsg.password}</Text> : null}

      <Button text="Login" onPress={handleSubmit} />


      <Text style={styles.register}>
        Don't have account? <Link href="/register" style={styles.here}>Register Here!</Link>
      </Text>
      
      <Text style={styles.register}>
        Ke home <Link href="/(home)" style={styles.here}>HOME!</Link>
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
    marginTop: 15,
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
  errorMsg: {
    color: "red",
    fontSize: 12,
    width: "100%",
    textAlign: "left",
    marginBottom: 5,
  },

});
