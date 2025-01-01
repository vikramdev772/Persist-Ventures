import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ProfileStats } from './components/ProfileStats'
import { ProfileTabs } from './components/ProfileTabs'
import { VideoGrid } from './components/VideoGrid'
import { EmptyState } from './components/EmptyState'

export default function ProfileScreen() {
    const [activeTab, setActiveTab] = useState('Videos')
    const hasContent = false // Toggle this to show empty state vs content
  
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.username}>Rosalie_Gorczany</Text>
            <Ionicons name="chevron-down" size={20} color="#FFF" />
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="link" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="add" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="settings-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
  
        <ScrollView>
          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: '/placeholder.svg?height=100&width=100' }}
              style={styles.profileImage}
            />
            <Text style={styles.displayName}>Rosalie_Gorczany</Text>
            <Text style={styles.badge}>Fast Replier</Text>
          </View>
  
          {/* Stats */}
          <ProfileStats 
            followers="999M"
            following="999K"
            videos="999"
          />
  
          {/* Edit Profile Button */}
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit profile</Text>
          </TouchableOpacity>
  
          {/* Tabs and Content */}
          <ProfileTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
  
          {hasContent ? (
            <VideoGrid />
          ) : (
            <EmptyState 
              type={activeTab.toLowerCase()}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      marginTop: 40,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    headerRight: {
      flexDirection: 'row',
      gap: 16,
    },
    username: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },
    iconButton: {
      padding: 4,
    },
    profileInfo: {
      alignItems: 'center',
      paddingVertical: 16,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 12,
    },
    displayName: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 4,
    },
    badge: {
      color: '#8B5CF6',
      fontSize: 14,
    },
    editButton: {
      backgroundColor: '#8B5CF6',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      marginHorizontal: 32,
      marginVertical: 16,
    },
    editButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
  })
  