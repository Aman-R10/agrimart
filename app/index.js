import { useState, useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hardcode to simulate a logged-out state
    setIsLoggedIn(false); // Set to false to always show login screen for now
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return isLoggedIn ? <Redirect href="/screens/HomeScreen" /> : <Redirect href="/auth/Login" />;
}
