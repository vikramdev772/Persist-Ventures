import React from 'react'
import { View, Text, StatusBar, StyleSheet, SafeAreaView, Platform } from 'react-native'
import { VideoFeed } from './components/VideoFeed'

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={Platform.OS === 'android' ? '#000000' : undefined}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Trending</Text>
      </View>

      {/* Video Feed */}
      <VideoFeed />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Use theme.black for better scaling if a theme is used
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 16 : 8,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  headerText: {
    fontSize: 16, // Use a responsive font size like RFPercentage if possible
    color: '#8B5CF6', // Move to theme.purpleAccent if using a theme
    fontWeight: '500',
  },
})
