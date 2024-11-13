import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../redux/store';

const RootLayout = () => {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="auth/Login" />
        <Stack.Screen name="auth/SignUp" />
        <Stack.Screen name="auth/RoleSelection" />
        <Stack.Screen name="screens/HomeScreen" />
        <Stack.Screen name="screens/SplashScreen" />
      </Stack>
    </Provider>
  );
};

export default RootLayout;