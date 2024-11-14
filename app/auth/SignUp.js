import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';

const BACKEND_URL = 'http://192.168.1.107:5000';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Toggle password field visibility based on email validity
  useEffect(() => {
    if (formData.email && validateEmail(formData.email)) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
      setFormData((prev) => ({ ...prev, password: "" }));
    }
  }, [formData.email]);

  const handleSignUp = async () => {
    // Validate required fields
    if (!formData.firstName.trim()) {
      alert("Please enter your first name");
      return;
    }
    if (!formData.lastName.trim()) {
      alert("Please enter your last name");
      return;
    }
    if (!formData.phoneNumber.trim()) {
      alert("Please enter your phone number");
      return;
    }
  
    // If email is empty, set it to null
    const email = formData.email.trim() === "" ? null : formData.email;
  
    // If password is empty, set it to null
    const password = formData.password.trim() === "" ? null : formData.password;
  
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, {
        ...formData,
        email,  // Pass sanitized email
        password,  // Pass sanitized password
      });
  
      if (response.status === 200) {
        router.push('/auth/RoleSelection');
      } else {
        alert(response.data.message || 'Failed to sign up');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again.');
    }
  };  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <MaterialIcons name="person-add" size={100} color="#00C853" />
        </View>

        <Text style={styles.title}>Sign up</Text>

        <View style={styles.nameContainer}>
          <TextInput
            style={[styles.input, styles.nameInput]}
            placeholder="First name"
            value={formData.firstName}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, firstName: text }))
            }
          />
          <TextInput
            style={[styles.input, styles.nameInput]}
            placeholder="Last name"
            value={formData.lastName}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, lastName: text }))
            }
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Phone number"
          keyboardType="phone-pad"
          value={formData.phoneNumber}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, phoneNumber: text }))
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Email (optional)"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
        />

        {showPassword && (
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              value={formData.password}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, password: text }))
              }
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <MaterialIcons
                name={passwordVisible ? "visibility" : "visibility-off"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/auth/Login")}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  nameContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },
  nameInput: {
    flex: 1,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  signupButton: {
    backgroundColor: "#00C853",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: "#00C853",
    fontSize: 14,
    fontWeight: "600",
  },
});
