import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type SettingItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

const SettingItem: React.FC<SettingItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingItemContent}>
      <Ionicons name={icon} size={24} color="#71717A" />
      <Text style={styles.settingItemText}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#71717A" />
  </TouchableOpacity>
);

const Settings: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.content}>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingItem
            icon="person-outline"
            label="Mange Account"
            onPress={() => router.push('/screens/manage-account')}
          />
        </View>

        {/* General Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <SettingItem
            icon="moon-outline"
            label="Theme"
            onPress={() => router.push('/screens/theme')}
          />
          <SettingItem
            icon="search-circle-outline"
            label="One Vibe Tribe"
            onPress={() => router.push('/screens/vibe-tribe')}
          />
          <SettingItem
            icon="search-outline"
            label="Search for the best vibes"
            onPress={() => router.push('/screens/search-vibes')}
          />
          <SettingItem
            icon="shield-checkmark-outline"
            label="Privacy Policy"
            onPress={() => router.push('/screens/privacy-policy')}
          />
          <SettingItem
            icon="document-text-outline"
            label="Terms & Conditions"
            onPress={() => router.push('/screens/terms')}
          />
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity 
          style={styles.signOutButton} 
          onPress={() => router.push('/screens/sign-out')}
        >
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 24, 
    marginTop: 8, 
    position: 'relative', 
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    position: 'absolute', 
    left: 16, 
    zIndex: 1, 
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1, 
    textAlign: 'center', 
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    marginLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    fontSize: 16,
    color: '#71717A',
    marginLeft: 12,
  },
  signOutButton: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  signOutText: {
    fontSize: 16,
    color: '#EF4444',
  },
});

export default Settings;

