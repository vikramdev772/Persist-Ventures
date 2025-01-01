import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation'; // Adjust the import path based on your structure

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Text style={styles.content}>Home Screen</Text>;
      case 'discover':
        return <Text style={styles.content}>Discover Screen</Text>;
      case 'video':
        return <Text style={styles.content}>Reply/Video Screen</Text>;
      case 'notifications':
        return <Text style={styles.content}>Alerts Screen</Text>;
      case 'profile':
        return <Text style={styles.content}>Profile Screen</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Render dynamic content based on the active tab */}
      <View style={styles.contentContainer}>{renderContent()}</View>

      {/* Bottom Navigation Bar */}
      <BottomNavigation activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background for the app
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
});
