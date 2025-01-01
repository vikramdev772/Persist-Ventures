import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabPress }: BottomNavigationProps) {
  const [centerMode, setCenterMode] = useState<'video' | 'reply'>('video');

  const toggleCenterMode = () => {
    const newMode = centerMode === 'video' ? 'reply' : 'video';
    setCenterMode(newMode);
    onTabPress(newMode);
  };

  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => onTabPress('home')}
      >
        <Ionicons 
          name="home-outline" 
          size={24} 
          color={activeTab === 'home' ? '#8B5CF6' : '#FFF'} 
        />
      </TouchableOpacity>

      {/* Discover Tab */}
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => onTabPress('discover')}
      >
        <Ionicons 
          name="grid-outline" 
          size={24} 
          color={activeTab === 'discover' ? '#8B5CF6' : '#FFF'} 
        />
      </TouchableOpacity>

      {/* Center Button */}
      <TouchableOpacity 
        style={styles.centerButton}
        onPress={toggleCenterMode}
      >
        <View style={styles.centerButtonInner}>
          <Ionicons 
            name={centerMode === 'video' ? 'videocam' : 'arrow-undo'} 
            size={24} 
            color="#FFF" 
          />
        </View>
        <View style={styles.centerTextWrapper}>
          <Text
            style={[
              styles.centerText,
              centerMode === 'video' ? styles.activeText : styles.inactiveText,
            ]}
          >
            Video
          </Text>
          <Text style={[styles.centerText, { opacity: 0.5 }]}>•</Text>
          <Text
            style={[
              styles.centerText,
              centerMode === 'reply' ? styles.activeText : styles.inactiveText,
            ]}
          >
            Reply
          </Text>
        </View>
      </TouchableOpacity>

      {/* Notifications Tab */}
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => onTabPress('notifications')}
      >
        <Ionicons 
          name="notifications-outline" 
          size={24} 
          color={activeTab === 'notifications' ? '#8B5CF6' : '#FFF'} 
        />
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => onTabPress('profile')}
      >
        <Ionicons 
          name="person-outline" 
          size={24} 
          color={activeTab === 'profile' ? '#8B5CF6' : '#FFF'} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#000',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#333',
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -29,  // Matches Figma spec
  },
  centerButtonInner: {
    width: 64,       // Matches Figma spec
    height: 64,      // Matches Figma spec
    borderRadius: 32, // Matches Figma spec
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,  // Matches Figma spec
    borderColor: '#FAF5FF', // White border
  },
  centerTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  centerText: {
    fontSize: 12,
    fontWeight: '500',
    marginHorizontal: 4,
  },
  activeText: {
    color: '#FFF',
    opacity: 1,
  },
  inactiveText: {
    color: '#FFF',
    opacity: 0.5,
  },
});