import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface ProfileStatsProps {
  followers: string
  following: string
  videos: string
}

export function ProfileStats({ followers, following, videos }: ProfileStatsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{followers}</Text>
        <Text style={styles.statLabel}>Followers</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{following}</Text>
        <Text style={styles.statLabel}>Following</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{videos}</Text>
        <Text style={styles.statLabel}>Videos</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingVertical: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    color: '#666',
    fontSize: 14,
  },
})


