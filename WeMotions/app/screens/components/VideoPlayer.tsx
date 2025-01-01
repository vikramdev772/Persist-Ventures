import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av'
import { Ionicons } from '@expo/vector-icons'

interface VideoPlayerProps {
  video: {
    url: string
    user: {
      name: string
      avatar: string
      badge: string
      description: string
    }
    stats: {
      likes: string
      shares: string
      comments: string
      forwards: string
    }
  }
  isActive: boolean
}

export function VideoPlayer({ video, isActive }: VideoPlayerProps) {
  const [status, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus)
  const videoRef = useRef<Video>(null)

  useEffect(() => {
    if (isActive) {
      videoRef.current?.playAsync()
    } else {
      videoRef.current?.pauseAsync()
    }
  }, [isActive])

  return (
    <View style={styles.container}>
      {/* Video Content */}
      <Video
        ref={videoRef}
        source={{ uri: video.url }}
        style={styles.video}
        shouldPlay={isActive}
        isLooping
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />

      {/* Right Side Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={24} color="#FFF" />
          <Text style={styles.actionText}>{video.stats.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#FFF" />
          <Text style={styles.actionText}>{video.stats.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={24} color="#FFF" />
          <Text style={styles.actionText}>{video.stats.shares}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="paper-plane-outline" size={24} color="#FFF" />
          <Text style={styles.actionText}>{video.stats.forwards}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <View style={styles.userHeader}>
          <Image 
            source={{ uri: video.user.avatar }}
            style={styles.avatar}
          />
          <View style={styles.userMeta}>
            <Text style={styles.username}>{video.user.name}</Text>
            <Text style={styles.badge}>{video.user.badge}</Text>
          </View>
        </View>
        <Text style={styles.description}>{video.user.description}</Text>
      </View>
    </View>
  )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width,
    height: height - 80, // Account for bottom navigation
    backgroundColor: '#000000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },
  actions: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    alignItems: 'center',
    gap: 24,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  userInfo: {
    position: 'absolute',
    left: 16,
    right: 88,
    bottom: 16,
    gap: 8,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userMeta: {
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C1C1C',
  },
  username: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  badge: {
    color: '#8B5CF6',
    fontSize: 13,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
  },
})

