import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotificationItem {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  type: 'follow' | 'videoReply' | 'motion';
  timestamp: string;
  thumbnail?: string;
}

export default function NotificationsScreen() {
  const [hasInternet, setHasInternet] = useState(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      user: { name: 'Rosalie_Gorczany', avatar: '/placeholder/40/40' },
      type: 'follow',
      timestamp: 'New'
    },
    {
      id: '2',
      user: { name: 'Rosalie_Gorczany', avatar: '/placeholder/40/40' },
      type: 'videoReply',
      timestamp: 'New',
      thumbnail: '/placeholder/40/40'
    },
    // Add more notifications as needed
  ]);

  if (!hasInternet) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyStateContainer}>
          <Ionicons name="wifi-outline" size={64} color="#666" />
          <Text style={styles.emptyStateTitle}>No Internet Connection</Text>
          <Text style={styles.emptyStateText}>
            It looks like you're offline. Please check your connection and try again.
          </Text>
        </View>
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyStateContainer}>
          <Ionicons name="notifications-outline" size={64} color="#666" />
          <Text style={styles.emptyStateTitle}>No Notifications</Text>
          <Text style={styles.emptyStateText}>
            You don't have any notifications right now. Keep interacting and check back soon.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>New</Text>
        {notifications.map((notification) => (
          <TouchableOpacity key={notification.id} style={styles.notificationItem}>
            <Image
              source={{ uri: notification.user.avatar }}
              style={styles.avatar}
            />
            <View style={styles.notificationContent}>
              <Text style={styles.username}>{notification.user.name}</Text>
              <Text style={styles.actionText}>
                {notification.type === 'follow' && 'Started following you.'}
                {notification.type === 'videoReply' && 'has Submitted A video reply on your video'}
                {notification.type === 'motion' && 'has Submitted motion on your video'}
              </Text>
            </View>
            {notification.thumbnail && (
              <Image
                source={{ uri: notification.thumbnail }}
                style={styles.thumbnail}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    marginTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    padding: 16,
    paddingTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    marginRight: 12,
  },
  username: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  actionText: {
    color: '#CCC',
    fontSize: 14,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});