import { useState, useEffect } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';  // If you're using AsyncStorage

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user login status from storage or API
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token'); // Example if you store token
      setIsLoggedIn(!!token); // If there's a token, user is logged in
      setIsLoading(false);
    };
    
    checkLoginStatus();
  }, []);

  if (isLoading) return null; // You can also show a loading screen/spinner here

  return isLoggedIn ? <Redirect href="/screens/HomeScreen" /> : <Redirect href="/auth/Login" />;
}
