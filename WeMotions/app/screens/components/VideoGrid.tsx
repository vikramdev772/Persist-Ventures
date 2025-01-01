import React from 'react'
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface VideoGridProps {
  videos?: Array<{
    id: string
    thumbnail: string
    views: string
  }>
}

export function VideoGrid({ videos = [] }: VideoGridProps) {
  // If no videos provided, show 6 placeholder items
  const items = videos.length > 0 ? videos : Array(6).fill({
    id: 'placeholder',
    thumbnail: '/placeholder.svg?height=200&width=200',
    views: '999k'
  })

  return (
    <View style={styles.container}>
      {items.map((video, index) => (
        <View key={video.id + index} style={styles.videoItem}>
          <Image
            source={{ uri: video.thumbnail }}
            style={styles.thumbnail}
          />
          <View style={styles.viewCount}>
            <Ionicons name="play-outline" size={12} color="#FFF" />
            <Text style={styles.viewCountText}>{video.views}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

const { width } = Dimensions.get('window')
const itemWidth = (width - 32 - 2) / 3 // 32 for padding, 2 for gaps

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 1,
  },
  videoItem: {
    width: itemWidth,
    height: itemWidth * 1.5,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1C1C1C',
  },
  viewCount: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  viewCountText: {
    color: '#FFF',
    fontSize: 12,
  },
})

