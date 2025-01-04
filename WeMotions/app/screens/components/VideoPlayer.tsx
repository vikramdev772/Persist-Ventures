import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import type { VideoData } from '../types';

interface VideoPlayerProps {
  video: VideoData;
  isActive: boolean;
  onClose?: () => void;
  onError?: (error: string) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  isActive,
  onClose,
  onError,
}) => {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);
  const [isLoading, setIsLoading] = useState(true);

  const handlePlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    setStatus(status);
    if ('isLoaded' in status) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const handleVideoPlayback = async () => {
      try {
        if (isActive) {
          await videoRef.current?.playAsync();
        } else {
          await videoRef.current?.pauseAsync();
          await videoRef.current?.setPositionAsync(0);
        }
      } catch (error) {
        if (isMounted && onError) {
          onError(error instanceof Error ? error.message : 'Video playback error');
        }
      }
    };

    handleVideoPlayback();

    return () => {
      isMounted = false;
      videoRef.current?.unloadAsync();
    };
  }, [isActive, onError]);

  return (
    <View style={styles.container}>
      {onClose && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
      )}

      <Video
        ref={videoRef}
        source={{ uri: video.url }}
        style={styles.video}
        shouldPlay={isActive}
        isLooping
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onError={(error) => onError?.(error.error.message)}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8B5CF6" />
        </View>
      )}

      <View style={styles.actions}>
        {[
          { icon: 'heart-outline', count: video.stats.likes, label: 'Like' },
          { icon: 'chatbubble-outline', count: video.stats.comments, label: 'Comment' },
          { icon: 'bookmark-outline', count: video.stats.shares, label: 'Share' },
          { icon: 'paper-plane-outline', count: video.stats.forwards, label: 'Forward' },
          { icon: 'ellipsis-vertical', count: '', label: 'More options' },
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
  );
};

const { width, height } = Dimensions.get('window');

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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
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
    fontWeight: '500',
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
});
