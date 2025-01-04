import React, { useCallback } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ReelData } from '../types';

interface VideoGridProps {
  videos: ReelData[];
  onVideoSelect: (video: ReelData) => void;
  isLoading?: boolean;
}

const { width } = Dimensions.get('window');
const numColumns = 3;
const ITEM_WIDTH = width / numColumns;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;

export const VideoGrid: React.FC<VideoGridProps> = ({ 
  videos, 
  onVideoSelect, 
  isLoading 
}) => {
  const renderItem = useCallback(({ item }: { item: ReelData }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => onVideoSelect(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{ 
          uri: item.videoUrl.replace('.mp4', '.jpg') 
        }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Ionicons name="play-circle-outline" size={24} color="white" />
      </View>
    </TouchableOpacity>
  ), [onVideoSelect]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      initialNumToRender={12}
      maxToRenderPerBatch={9}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    padding: 1,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1C1C1C',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
