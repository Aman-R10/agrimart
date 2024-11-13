import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function LoginNumber() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const handleSendOtp = () => {
    if (!phoneNumber.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return;
    }

    // If validation passes, navigate to OTP screen
    router.push({
      pathname: "/auth/VerifyOtp",
      params: { phoneNumber: phoneNumber },
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/auth/loginlady.png")}
        style={styles.image}
      />

      <Text style={styles.title}>Login</Text>

      <View style={styles.phoneInputContainer}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          !validatePhoneNumber(phoneNumber) && styles.buttonDisabled,
        ]}
        onPress={handleSendOtp}
        disabled={!validatePhoneNumber(phoneNumber)}
      >
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or login with</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity
        style={styles.emailButton}
        onPress={() => router.push("/auth/Login")}
      >
        <Text style={styles.emailIcon}>
          <FontAwesome name="envelope" size={20} color="#7b9d55" />
        </Text>
        <Text style={styles.emailButtonText}>Email address</Text>
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
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 12,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 10,
    color: "#000",
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E8E8E8",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#666",
  },
  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 20,
  },
  emailIcon: {
    marginRight: 10,
  },
  emailButtonText: {
    fontSize: 16,
    color: "#7b9d55",
  },
  link: {
    color: "#007AFF",
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
});
