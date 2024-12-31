import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Username() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (username.trim()) {
      router.push('/onboarding/profile-picture');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose Your Username</Text>
        <Text style={styles.subtitle}>
          Create a username that reflects you—make it memorable and stand out.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your user name"
          placeholderTextColor="#666666"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.bottomContent}>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={styles.progressCircleWrapper}>
              <View style={styles.progressArc} />
              <View style={styles.progressCircle}>
                <Text style={styles.progressText}>1</Text>
              </View>
            </View>
            <Text style={styles.outOfText}>out 3</Text>
          </View>

          <TouchableOpacity 
            style={[
              styles.nextButton,
              !username.trim() && styles.nextButtonDisabled
            ]} 
            onPress={handleNext}
            disabled={!username.trim()}
          >
            <Text style={[
              styles.nextButtonText,
              !username.trim() && styles.nextButtonTextDisabled
            ]}>
              Next
            </Text>
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
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
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
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    color: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 16,
    marginTop: 8,
    fontFamily: 'Poppins',
    backgroundColor: 'transparent',
  },
  bottomContent: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    paddingTop: 16,
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircleWrapper: {
    position: 'relative',
    width: 32,
    height: 32,
  },
  progressCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  progressArc: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderLeftColor: '#8A2BE2',
    borderTopColor: '#8A2BE2',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  outOfText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
    fontFamily: 'Poppins',
  },
  nextButton: {
    width: 120,
    height: 40,
    backgroundColor: '#E6D8F9',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#8A2BE2',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  nextButtonTextDisabled: {
    color: '#8A2BE2',
    opacity: 0.5,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#3C3C3C',
    borderRadius: 2.5,
    alignSelf: 'center',
  },
});