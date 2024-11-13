// app/auth/VerifyOTP.js
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VerifyOTP() {
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const refs = Array(6).fill(0).map(() => useRef());

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      refs[index + 1].current?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(30);
    // Add your resend OTP logic here
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      Alert.alert("Error", "Please enter the complete OTP");
      return;
    }

    try {
      // Add your OTP verification logic here
      await AsyncStorage.setItem("userToken", "sample-token");
      router.replace("/screens/HomeScreen");
    } catch (error) {
      console.error("OTP verification error:", error);
      Alert.alert("Error", "Failed to verify OTP");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text>←</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Verify OTP</Text>

      <Image
        source={require("../../assets/images/auth/loginlady.png")}
        style={styles.image}
      />

      <Text style={styles.description}>
        We have just sent a 6 digit code to your{'\n'}
        entered number. Enter the code below.
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={refs[index]}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>

      <TouchableOpacity 
        onPress={timeLeft === 0 ? handleResend : null}
        style={styles.resendContainer}
      >
        <Text style={styles.resendText}>
          Didn't receive any code? 
          <Text style={[
            styles.resendLink,
            timeLeft > 0 && styles.resendDisabled
          ]}>
            {timeLeft > 0 ? ` Resend in ${timeLeft}s` : " Resend"}
          </Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.verifyButton}
        onPress={handleVerify}
      >
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 50,
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginVertical: 20,
  },
  description: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 30,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#f9f9f9",
  },
  resendContainer: {
    marginBottom: 30,
  },
  resendText: {
    color: "#666",
  },
  resendLink: {
    color: "#00B057",
    fontWeight: "600",
  },
  resendDisabled: {
    color: "#666",
  },
  verifyButton: {
    backgroundColor: "#00B057",
    padding: 15,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
  },
  verifyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});