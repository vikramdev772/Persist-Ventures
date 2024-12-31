import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfilePicture() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Pressable onPress={() => router.push('/onboarding/SelectInterests')}>
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
            <View style={styles.progressCircleWrapper}>
              <View style={styles.progressBackground}>
                <View style={styles.progressArc} />
                <View style={styles.progressWhiteArc} />
              </View>
              <Text style={styles.progressText}>2 out 3</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => router.push('/onboarding/SelectInterests')}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.homeIndicator} />
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
    backgroundColor: '#9747FF',
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
    backgroundColor: '#7BCBFF',
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
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircleWrapper: {
    position: 'relative',
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBackground: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '-90deg' }]
  },
  progressArc: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderLeftColor: '#9747FF',
    borderTopColor: '#9747FF',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '240deg' }]
  },
  progressWhiteArc: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderLeftColor: '#FFFFFF',
    borderTopColor: '#FFFFFF',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '60deg' }]
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.1,
    textAlign: 'center',
    marginTop: 1,
  },
  nextButton: {
    width: 120,
    height: 48,
    backgroundColor: '#F2E8FF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#8A2BE2',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#3C3C3C',
    borderRadius: 2.5,
    alignSelf: 'center',
  },
});

