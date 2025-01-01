import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface ProfileTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => onTabChange('Videos')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'Videos' && styles.activeTabText
        ]}>
          Videos
        </Text>
        {activeTab === 'Videos' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => onTabChange('Motions')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'Motions' && styles.activeTabText
        ]}>
          Motions
        </Text>
        {activeTab === 'Motions' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  tabText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#8B5CF6',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#8B5CF6',
  },
})

