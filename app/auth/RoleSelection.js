import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRole } from '../../redux/actions/authActions';
import { useRouter } from 'expo-router';

const RoleSelectionScreen = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const router = useRouter();

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role.');
      return;
    }

    try {
      console.log('User ID:', user._id);
      console.log('Selected Role:', selectedRole);

      // Dispatch action to select role
      await dispatch(selectRole(user._id, selectedRole));

      // Navigate to HomeScreen after successful role selection
      router.push('/screens/HomeScreen');
    } catch (err) {
      console.error('Role selection failed:', err);
      Alert.alert('Error', `Failed to select role: ${err.message}`);
    }
  };

  return (
    <View>
      <Text>Select a Role</Text>
      <Button title="Buyer" onPress={() => setSelectedRole('buyer')} />
      <Button title="Seller" onPress={() => setSelectedRole('seller')} />
      <Button title="Farmer" onPress={() => setSelectedRole('farmer')} />
      <Button title="Landowner" onPress={() => setSelectedRole('landowner')} />
      <Button title="Confirm" onPress={handleRoleSelection} />
    </View>
  );
};

export default RoleSelectionScreen;
