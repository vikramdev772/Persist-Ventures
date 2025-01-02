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

type AccountItemProps = {
  label: string;
  onPress: () => void;
  isDestructive?: boolean;
};

const AccountItem: React.FC<AccountItemProps> = ({ label, onPress, isDestructive }) => (
  <TouchableOpacity style={styles.accountItem} onPress={onPress}>
    <Text style={[styles.accountItemText, isDestructive && styles.destructiveText]}>
      {label}
    </Text>
    <Ionicons 
      name="chevron-forward" 
      size={20} 
      color={isDestructive ? "#EF4444" : "#71717A"} 
    />
  </TouchableOpacity>
);

const ManageAccount: React.FC = () => {
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
        <Text style={styles.headerTitle}>Mange Account</Text>
      </View>

      <View style={styles.content}>
        <AccountItem
          label="Account Info"
          onPress={() => router.push('/screens/settings/account-info')}
        />
        <AccountItem
          label="Change Password"
          onPress={() => router.push('/screens/settings/change-password')}
        />
        <AccountItem
          label="Blocked Users"
          onPress={() => router.push('/screens/settings/blocked-users')}
        />
        <AccountItem
          label="Delete Account"
          onPress={() => router.push('/screens/settings/delete-account')}
          isDestructive
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    marginTop:30,
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
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  accountItemText: {
    fontSize: 16,
    color: '#71717A',
  },
  destructiveText: {
    color: '#EF4444',
  },
});

export default ManageAccount;

