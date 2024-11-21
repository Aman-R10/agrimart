import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

const Header = () => {
  return (
    <>
      {/* StatusBar Configuration */}
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.container}>
        {/* Top Row: Hamburger, Greeting, Bell */}
        <View style={styles.topRow}>
          <TouchableOpacity>
            <Feather name="menu" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Hi Karim! 👋</Text>
            <Text style={styles.subtitle}>Enjoy our services!</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.bellContainer}>
              <FontAwesome name="bell" size={24} color="green" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search here..."
            placeholderTextColor="#A9A9A9"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="sliders" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    paddingTop: StatusBar.currentHeight || 24, // Dynamic padding for the status bar
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  greetingContainer: {
    flex: 1,
    marginLeft: 12,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  bellContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#333',
  },
  filterButton: {
    backgroundColor: 'green',
    marginLeft: 8,
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
