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
    console.log("Signup initiated");
    console.log("Form data:", { firstName, lastName, phone, email, password });

    if (!firstName || !lastName || !phone) {
      console.warn("Validation failed: Missing required fields");
      Alert.alert("Error", "First name, last name, and phone are required.");
      return;
    }

    try {
      console.log("Dispatching signup action with user data...");
      const response = await dispatch(
        signup({ firstName, lastName, phone, email, password })
      );

      console.log("Dispatch response:", response);

      // Check if the response contains the user ID
      const userId = response?._id;

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
        onChangeText={(value) => {
          setFirstName(value);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(value) => {
          setLastName(value);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={(value) => {
          setPhone(value);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(value) => {
          setEmail(value);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(value) => {
          setPassword(value);
        }}
        secureTextEntry
      />
      <Button
        title="Sign Up"
        onPress={() => {
          console.log("Sign Up button pressed");
          handleSignup();
        }}
      />
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
