import React, { useEffect, useRef, useState } from 'react'
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

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, isActive }) => {
  const videoRef = useRef<Video>(null)
  const [status, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus)

  useEffect(() => {
    if (isActive) {
      videoRef.current?.playAsync()
    } else {
      videoRef.current?.pauseAsync()
    }
  }, [isActive])

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    setStatus(status)
  }

  return (
    <View style={styles.container}>
      {/* Video */}
      <Video
        ref={videoRef}
        source={{ uri: video.url }}
        style={styles.video}
        shouldPlay={isActive}
        isLooping
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />

      {/* Actions */}
      <View style={styles.actions}>
        {[
          { icon: 'heart-outline', count: video.stats.likes, label: 'Like' },
          { icon: 'chatbubble-outline', count: video.stats.comments, label: 'Comment' },
          { icon: 'bookmark-outline', count: video.stats.shares, label: 'Share' },
          { icon: 'paper-plane-outline', count: video.stats.forwards, label: 'Forward' },
          { icon: 'ellipsis-vertical', count: '', label: 'More options' }
        ].map(({ icon, count, label }, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionButton}
            accessible={true}
            accessibilityLabel={label}
            accessibilityRole="button"
          >
            <Ionicons name={icon as any} size={24} color="#FFF" />
            {count && <Text style={styles.actionText}>{count}</Text>}
          </TouchableOpacity>
        ))}
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <View style={styles.userHeader}>
          <Image 
            source={{ uri: video.user.avatar }} 
            style={styles.avatar} 
            accessible={true}
            accessibilityLabel={`${video.user.name}'s avatar`}
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
    height: height - 78,
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '95%',
    backgroundColor: '#000',
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
    color: '#FFF',
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
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  badge: {
    color: '#8B5CF6',
    fontSize: 13,
  },
  description: {
    color: '#FFF',
    fontSize: 13,
    lineHeight: 18,
  },
})

