// app/screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header/Header";
import BannerSection from "../../components/HomeScreen/BannerSection";
import FeaturedProducts from "../../components/HomeScreen/Buyer/FeaturedProducts";

const HomeScreen = () => {
  const [role, setRole] = useState(""); // To store the role fetched from AsyncStorage
  const [loading, setLoading] = useState(true); // To handle loading state

  // Fetch the role from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem("userRole");
        setRole(storedRole || "unknown"); // Default to "unknown" if no role is found
      } catch (error) {
        console.error("Error fetching role:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchRole();
  }, []); // Empty dependency array to run only once on component mount

  // Function to render content based on the user's role
  const renderContent = () => {
    switch (role) {
      case "farmer":
        return (
          <Text style={styles.roleContent}>
            Welcome, Farmer! Your content goes here.
          </Text>
        );
      case "landowner":
        return (
          <Text style={styles.roleContent}>
            Welcome, Landowner! Your content goes here.
          </Text>
        );
      case "buyer":
        return (
          <Text style={styles.roleContent}>
            Welcome, Buyer! Your content goes here.
          </Text>
        );
      case "seller":
        return (
          <Text style={styles.roleContent}>
            Welcome, Seller! Your content goes here.
          </Text>
        );
      default:
        return (
          <Text style={styles.roleContent}>
            Loading your role-specific content...
          </Text>
        );
    }
  };

  if (loading) {
    // You can show a loading spinner or a placeholder while the role is being fetched
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <BannerSection />
      {renderContent()}
      <FeaturedProducts />
    </View>
  );
};

const styles = StyleSheet.create({
  roleContent: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
});

export default HomeScreen;
