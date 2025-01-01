import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

const PURPLE = '#8B5CF6';
const DARK_BG = '#1C1C1C';
const WHITE = '#FFFFFF';
const GRAY = '#666666';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

// Custom Home Icon Component
const HomeIcon = ({ color }: { color: string }) => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 12L12 4L21 12V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V12Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export function BottomNavigation({ activeTab, onTabPress }: BottomNavigationProps) {
  const [centerMode, setCenterMode] = useState<'video' | 'reply'>('video');

  const toggleCenterMode = () => {
    const newMode = centerMode === 'video' ? 'reply' : 'video';
    setCenterMode(newMode);
    onTabPress(newMode);
  };

  const renderTab = (
    name: string, 
    icon: React.ReactNode
  ) => (
    <TouchableOpacity 
      style={styles.tab} 
      onPress={() => onTabPress(name)}
    >
      {icon}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderTab('home', 
        <HomeIcon color={activeTab === 'home' ? PURPLE : WHITE} />
      )}
      
      {renderTab('discover', 
        <Ionicons
          name="apps-outline"
          size={28}
          color={activeTab === 'discover' ? PURPLE : WHITE}
        />
      )}

      {/* Center Video/Reply Button */}
      <TouchableOpacity 
        style={styles.centerButton} 
        onPress={toggleCenterMode}
      >
        <View style={styles.centerButtonInner}>
          <Ionicons 
            name={centerMode === 'video' ? 'videocam' : 'arrow-undo'} 
            size={32} 
            color={WHITE} 
          />
        </View>
        <View style={styles.centerButtonLabels}>
          <Text style={[
            styles.centerButtonText,
            centerMode === 'video' ? styles.activeText : styles.inactiveText
          ]}>
            Video
          </Text>
          <Text style={[
            styles.centerButtonText,
            centerMode === 'reply' ? styles.activeText : styles.inactiveText
          ]}>
            Reply
          </Text>
        </View>
      </TouchableOpacity>

      {renderTab('notifications',
        <Ionicons
          name="notifications-outline"
          size={28}
          color={activeTab === 'notifications' ? PURPLE : WHITE}
        />
      )}

      {renderTab('profile',
        <Ionicons
          name="person-outline"
          size={28}
          color={activeTab === 'profile' ? PURPLE : WHITE}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: DARK_BG,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  centerButton: {
    width: 90,
    height: 90,
    marginTop: -45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButtonInner: {
    backgroundColor: PURPLE,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: WHITE,
  },
  centerButtonLabels: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 8,
  },
  centerButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  activeText: {
    color: WHITE,
  },
  inactiveText: {
    color: GRAY,
  }
});