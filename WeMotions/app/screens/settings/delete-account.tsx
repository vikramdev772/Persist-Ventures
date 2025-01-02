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

const DeleteAccount: React.FC = () => {
  const router = useRouter();
  const username = "Rosalie_Gorczany"; // This would typically come from your auth context

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
        <Text style={styles.headerTitle}>Delete Account</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.warningTitle}>
          Are you sure you want to delete your account{' '}
          <Text style={styles.username}>{username}</Text>
        </Text>

        <Text style={styles.warningSubtitle}>
          If you delete your account:
        </Text>

        <View style={styles.consequencesList}>
          <Text style={styles.consequenceItem}>
            • You won't be able to log in and use any Wemotions services with that account
          </Text>
          <Text style={styles.consequenceItem}>
            • You will lose access to all your videos
          </Text>
          <Text style={styles.consequenceItem}>
            • Information that isn't stored on Wemotions servers, such as Videos, will be removed. You won't be able to download such information after deleting your account.
          </Text>
        </View>

        <Text style={styles.confirmationText}>
          Do you want to continue?
        </Text>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => {
            // Handle account deletion
            router.push('/screens/deletion-confirmed');
          }}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingTop: 8,
  },
  warningTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 24,
    lineHeight: 24,
  },
  username: {
    color: '#EF4444',
  },
  warningSubtitle: {
    fontSize: 16,
    color: '#71717A',
    marginBottom: 16,
  },
  consequencesList: {
    gap: 16,
    marginBottom: 24,
  },
  consequenceItem: {
    fontSize: 16,
    color: '#71717A',
    lineHeight: 24,
  },
  confirmationText: {
    fontSize: 16,
    color: '#71717A',
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: '#A855F7',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DeleteAccount;

