import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AuthButton } from '../components/ui/auth-button';

export default function ProfilePicture() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/onboarding/username" style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Link>
        <Pressable onPress={() => router.push('/onboarding/final')}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Set Your Profile Picture</Text>
        <Text style={styles.subtitle}>
          Upload a profile picture to represent yourself in the community.
        </Text>

        <Pressable style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={60} color="#FFFFFF" />
            <View style={styles.addButton}>
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.username}>astro destroyer</Text>
        </Pressable>
      </View>

      <View style={styles.bottomContent}>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressText}>2</Text>
            </View>
            <View style={styles.progressLine} />
            <Text style={styles.progressTotal}>out 3</Text>
          </View>
          <AuthButton
            variant="continue"
            onPress={() => router.push('/onboarding/final')}
            style={styles.nextButton}
          >
            Next
          </AuthButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 32,
    lineHeight: 24,
    fontFamily: 'Poppins',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#8A2BE2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8A2BE2',
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  bottomContent: {
    height: 101,
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'space-between',
    backgroundColor: '#000000',
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  progressLine: {
    width: 4,
    height: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
  progressTotal: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  nextButton: {
    width: 120,
    height: 40,
    backgroundColor: '#8A2BE2',
  },
});

