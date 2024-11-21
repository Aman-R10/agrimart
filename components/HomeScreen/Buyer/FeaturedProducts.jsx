import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const FeaturedProducts = () => {
  // Dummy data for products
  const products = [
    { id: '1', name: 'Rice Seeds', price: '₹150/kg', image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Lime', price: '₹30/pcs', image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Tractor', price: '₹5,00,000', image: 'https://via.placeholder.com/100' },
    { id: '4', name: 'Peas Seeds', price: '₹80/kg', image: 'https://via.placeholder.com/100' },
    { id: '5', name: 'Tomato Seeds', price: '₹120/kg', image: 'https://via.placeholder.com/100' },
    { id: '6', name: 'Corn Seeds', price: '₹100/kg', image: 'https://via.placeholder.com/100' },
  ];

  // Render a single product card
  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Featured Products</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      {/* Horizontal Product Slider */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: 'green',
  },
  list: {
    paddingLeft: 8,
  },
  card: {
    width: 120,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginRight: 16,
    padding: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  productPrice: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default FeaturedProducts;
