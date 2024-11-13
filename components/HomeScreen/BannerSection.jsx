import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const BannerSection = () => {
  const banners = [
    {
      id: '1',
      title: 'Discount',
      discount: '25%',
      subtitle: 'All Vegetables & Fruits',
      bgColor: '#4CAF50',
      buttonText: 'See more!',
      image: require('../../assets/images/vegetable/apples.jpg'),
    },
    {
      id: '2',
      title: 'New',
      discount: '15%',
      subtitle: 'Organic Products',
      bgColor: '#FF9800',
      buttonText: 'Shop Now',
      image: require('../../assets/images/vegetable/avacado.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {banners.map((banner) => (
          <View key={banner.id} style={[styles.bannerCard, { backgroundColor: banner.bgColor }]}>
            <Image source={banner.image} style={styles.bannerImage} />
            <View style={styles.bannerContent}>
              <View>
                <Text style={styles.discountText}>{banner.discount}</Text>
                <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                <TouchableOpacity style={styles.bannerButton}>
                  <Text style={styles.buttonText}>{banner.buttonText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  scrollView: {
    paddingHorizontal: 15,
  },
  bannerCard: {
    width: Dimensions.get('window').width - 50,
    height: 180,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 15,
    justifyContent: 'center',
  },
  discountText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: 'white',
    marginVertical: 5,
  },
  bannerButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default BannerSection;
