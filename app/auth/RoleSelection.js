// screens/RoleSelectionScreen.js
import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";

export default function RoleSelectionScreen({ route, navigation }) {
  const [selectedRole, setSelectedRole] = useState("");
  const { userId } = route.params;

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      Alert.alert("Please select a role.");
      return;
    }
    try {
      const response = await fetch(
        `http://192.168.1.107:5000/api/auth/update-role/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: selectedRole }),
        }
      );
      if (response.ok) {
        navigation.navigate("Home");
      } else {
        const data = await response.json();
        Alert.alert("Failed to select role", data.message || "Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("An error occurred while updating role.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Buyer" 
          onPress={() => setSelectedRole("buyer")}
          color={selectedRole === "buyer" ? "#4CAF50" : "#2196F3"} 
        />
        <Button 
          title="Seller" 
          onPress={() => setSelectedRole("seller")}
          color={selectedRole === "seller" ? "#4CAF50" : "#2196F3"} 
        />
        <Button 
          title="Farmer" 
          onPress={() => setSelectedRole("farmer")}
          color={selectedRole === "farmer" ? "#4CAF50" : "#2196F3"} 
        />
        <Button 
          title="Landowner" 
          onPress={() => setSelectedRole("landowner")}
          color={selectedRole === "landowner" ? "#4CAF50" : "#2196F3"} 
        />
      </View>
      <Button 
        title="Confirm Role" 
        onPress={handleRoleSelection}
        disabled={!selectedRole} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 10,
    marginBottom: 20,
  },
});