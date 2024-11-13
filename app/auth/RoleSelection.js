import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import axios from 'axios';

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8;
const ITEM_SPACING = (width - ITEM_WIDTH) / 2;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function RoleSelection() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: "buyer",
      title: "Buyer",
      icon: require("../../assets/images/profileicon/buyericon.png"),
      description:
        "Purchase agricultural products directly from sellers. Get access to fresh produce and farming equipment at competitive prices.",
      color: "#4CAF50",
    },
    {
      id: "seller",
      title: "Seller",
      icon: require("../../assets/images/profileicon/sellericon.png"),
      description:
        "List and sell your agricultural products. Reach out to a wide network of potential buyers and expand your business.",
      color: "#2196F3",
    },
    {
      id: "farmer",
      title: "Farmer",
      icon: require("../../assets/images/profileicon/farmericon.png"),
      description:
        "Find work opportunities on various farms. Connect with landowners and get regular employment in agricultural activities.",
      color: "#FF9800",
    },
    {
      id: "landowner",
      title: "Landowner",
      icon: require("../../assets/images/profileicon/landownericon.png"),
      description:
        "Find skilled farmers for your land. Post work requirements and connect with experienced agricultural workers.",
      color: "#9C27B0",
    },
  ];

  const handleConfirm = async () => {
    if (!selectedRole) {
      alert("Please select a role to continue");
      return;
    }
  
    try {
      // Send selected role to backend to update user's role
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: selectedRole }),
      });
  
      if (response.ok) {
        // Redirect to home or another screen with role parameter
        router.push({
          pathname: "/screens/HomeScreen",
          params: { role: selectedRole },
        });
      } else {
        // Parse error message from response if available
        const errorData = await response.json();
        const errorMessage = errorData?.message || "Failed to save role, please try again.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error during role confirmation:", error);
      alert("An error occurred. Please check your connection or try again.");
    }
  };
  

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
    });

    return (
      <TouchableOpacity
        onPress={() => setSelectedRole(item.id)}
        activeOpacity={0.9}
      >
        <Animated.View
          style={[
            styles.itemContainer,
            {
              transform: [{ scale }],
              opacity,
              backgroundColor:
                selectedRole === item.id ? `${item.color}22` : "#fff",
              borderColor: selectedRole === item.id ? item.color : "#E0E0E0",
            },
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${item.color}22` },
            ]}
          >
            <Image
              source={item.icon}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>

          {selectedRole === item.id && (
            <View
              style={[
                styles.selectedIndicator,
                { backgroundColor: item.color },
              ]}
            ></View>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Your Role</Text>
      <Text style={styles.subHeader}>
        Select how you want to use the platform
      </Text>

      <AnimatedFlatList
        ref={flatListRef}
        data={roles}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />

      <View style={styles.paginationContainer}>
        {roles.map((_, index) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const dotScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: "clamp",
          });

          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  transform: [{ scale: dotScale }],
                  opacity: dotOpacity,
                },
              ]}
            />
          );
        })}
      </View>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          !selectedRole && styles.confirmButtonDisabled,
        ]}
        onPress={handleConfirm}
        disabled={!selectedRole}
      >
        <Text style={styles.confirmButtonText}>Confirm & Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  flatListContent: {
    paddingHorizontal: ITEM_SPACING,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
    alignItems: "center",
  },
  iconContainer: {
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  selectedIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#333",
    marginHorizontal: 4,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  confirmButtonDisabled: {
    backgroundColor: "#ccc",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
