// app/auth/Login.js
import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.101:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const { role, firstName, lastName } = data;
  
        // Save role and other data to AsyncStorage
        await AsyncStorage.setItem("userRole", role);
        await AsyncStorage.setItem("userName", `${firstName} ${lastName}`);
        
        // Navigate to HomeScreen
        router.replace("/screens/HomeScreen");
      } else {
        console.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/auth/loginlady.png")}
        style={styles.image}
      />

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => router.push("/auth/SignUp")}>
        <Text style={styles.Forgotlink}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Divider with "or login with" text */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or login with</Text>
        <View style={styles.divider} />
      </View>

      {/* Phone Number Login Button */}
      <TouchableOpacity 
        style={styles.phoneButton}
        onPress={() => router.push("/auth/LoginNumber")}
      >
        <Text style={styles.phoneIcon}><FontAwesome name="phone" size={23} color="#7b9d55"/></Text>
        <Text style={styles.phoneButtonText}>Mobile number</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/SignUp")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    alignSelf: "flex-start",
    fontWeight: "bold",
    left: 10,
  },
  image: {
    width: 450,
    height: 300,
    marginBottom: 20,
    resizeMode: "contain",
  },
  input: {
    width: "94%",
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#7b9d55",
    padding: 15,
    borderRadius: 8,
    width: "94%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "400",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "94%",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#666",
    fontSize: 14,
  },
  phoneButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "94%",
    backgroundColor: "white",
  },
  phoneIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  phoneButtonText: {
    fontSize: 17,
    color: "#7b9d55",
    fontWeight: "600",
  },
  link: {
    color: "black",
    marginTop: 30,
    fontSize: 14,
  },
  Forgotlink: {
    color: "#7b9d55",
    marginTop: 2,
    fontSize: 13,
    right: 110,
  },
});