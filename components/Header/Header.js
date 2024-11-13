import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install this icon library

const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#7b9d55" />
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity>
            <Ionicons name="menu" size={35} color="white" />
          </TouchableOpacity>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>Hi Sam...</Text>
            <Text style={styles.subtitleText}>Enjoy our service</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={{ marginRight: 9 }}>
              <Ionicons name="language-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#7b9d55',
    flex: 0,
  },
  header: {
    backgroundColor: '#7b9d55',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50, // Increase this value for more curve
    borderBottomRightRadius: 30, // Increase this value for more curve
    marginTop: 60,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    alignItems: 'left',
  },
  welcomeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Header;
