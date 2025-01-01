import React from 'react'
import { View, Text, StatusBar, StyleSheet, SafeAreaView } from 'react-native'
import { VideoFeed } from './components/VideoFeed'

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
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
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  headerText: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '500',
  },
})
