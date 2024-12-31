import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={styles.container}>
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
              <View style={styles.progressRing}>
                <View style={styles.baseRing} />
                <View style={styles.progressArc} />
              </View>
              <Text style={styles.progressText}>1 out 3</Text>
            </View>
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
    </SafeAreaView>
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
    marginBottom: 12,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 15,
    color: '#999999',
    marginBottom: 32,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.1,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    color: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 16,
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
    backgroundColor: 'rgba(28, 28, 28, 0.5)',
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
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transform: [{ rotate: '210deg' }],
  },
  baseRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderRadius: 32,
    borderColor: '#FFFFFF', 
  },
  progressArc: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderRadius: 32,
    borderColor: '#8B5CF6', 
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.1,
    textAlign: 'center',
  },
  nextButton: {
    width: 120,
    height: 48,
    backgroundColor: '#F2E8FF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#8A2BE2',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  nextButtonTextDisabled: {
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

