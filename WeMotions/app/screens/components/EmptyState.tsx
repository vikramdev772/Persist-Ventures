import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface EmptyStateProps {
  type: string
}

export function EmptyState({ type }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="play-circle-outline" size={48} color="#333" />
      </View>
      <Text style={styles.title}>
        No {type} yet
      </Text>
      <Text style={styles.description}>
        {type === 'videos' 
          ? 'Tap the plus button and Create ur first video'
          : 'You currently have no motions selected yet. Submit motion and watch it later here'
        }
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
})

