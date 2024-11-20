import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/actions/authActions";
import { useRouter } from "expo-router"; // Import the useRouter hook

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter(); // Ensure this is correctly configured for navigation

  const handleSignup = async () => {
    if (!firstName || !lastName || !phone) {
      Alert.alert("Error", "First name, last name, and phone are required.");
      return;
    }
  
    try {
      // Dispatch signup action and inspect the response
      const response = await dispatch(
        signup({ firstName, lastName, phone, email, password })
      );
  
      // Log the raw response
      console.log("Raw dispatch response:", response);
  
      // Check for the _id field in the user object
      const userId = response?._id || response?.user?._id; // Fallback for structure variations
  
      if (userId) {
        console.log("Signup successful, navigating to RoleSelection");
        console.log("User ID:", userId);
  
        // Navigate to RoleSelection screen with userId
        router.push({
          pathname: "/auth/RoleSelection",
          params: { userId },
        });
      } else {
        throw new Error("User ID (_id) is missing in the response.");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      Alert.alert("Error", err.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    width: "100%",
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
});

export default SignUp;
