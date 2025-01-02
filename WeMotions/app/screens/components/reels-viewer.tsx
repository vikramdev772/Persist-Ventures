import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');
const BOTTOM_NAV_HEIGHT = 49;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : 0;
const ACTUAL_HEIGHT = WINDOW_HEIGHT - BOTTOM_NAV_HEIGHT;  // Removed STATUS_BAR_HEIGHT subtraction

export default function ReelsViewer({ reels, initialIndex = 0, onClose }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const flatListRef = useRef(null);
  const videoRefs = useRef({});

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach(element => {
      const cell = videoRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          cell.playAsync();
        } else {
          cell.stopAsync();
        }
      }
    });
  });

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.reelContainer}>
        <Video
          ref={ref => (videoRefs.current[index] = ref)}
          source={{ uri: item.videoUrl }}
          style={styles.video}
          resizeMode="cover"
          shouldPlay={index === activeIndex}
          isLooping
          isMuted={false}
        />
        
        {/* User Info Overlay */}
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <View style={styles.userInfo}>
              <Ionicons name="person-circle" size={40} color="#FFD700" />
              <Text style={styles.username}>{item.username}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={reels}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        vertical
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
        initialScrollIndex={initialIndex}
        getItemLayout={(data, index) => ({
          length: ACTUAL_HEIGHT,
          offset: ACTUAL_HEIGHT * index,
          index,
        })}
        snapToInterval={ACTUAL_HEIGHT}  // Added to ensure proper snapping
        decelerationRate="fast"         // Added for smooth scrolling
      />

      {/* Close Button */}
      <TouchableOpacity 
        style={[
          styles.closeButton, 
          { top: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT + 10 : 20 }
        ]} 
        onPress={onClose}
      >
        <Ionicons name="close" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  reelContainer: {
    width: WINDOW_WIDTH,
    height: ACTUAL_HEIGHT,
  },
  video: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  overlayContent: {
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
    padding: 10,
  },
});