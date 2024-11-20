// app/screens/HomeScreen.js
import React from "react";
import { View, Text } from "react-native";
import Header from "../../components/Header/Header";
import BannerSection from "../../components/HomeScreen/BannerSection";

const HomeScreen = () => (
  <View>
    <Header />
    <BannerSection />
  </View>
);

export default HomeScreen;
