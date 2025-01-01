import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DiscoverScreen() {
  // Mock data for grid items
  const gridItems = new Array(9).fill({
    username: 'Rosalie_Gorczany',
    imageUrl: '/placeholder/400/400' // You'll replace these with actual image URLs
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for user"
          placeholderTextColor="#666"
        />
      </View>

      {/* Grid Content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.gridContainer}>
          {gridItems.map((item, index) => (
            <View key={index} style={styles.gridItem}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.gridImage}
              />
              <View style={styles.userInfo}>
                <View style={styles.userAvatar}>
                  <Ionicons name="person-circle" size={20} color="#FFD700" />
                </View>
                <Text style={styles.username}>{item.username}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    marginTop: 60,
  },
  searchContainer: {
    padding: 16,
    paddingTop: 8,
  },
  searchInput: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    color: '#FFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 1,
  },
  gridItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1A1A1A',
  },
  userInfo: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    marginRight: 4,
  },
  username: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  }
});