import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Start the Dialogue with{'\n'}Voice & Video</Text>
        
        <Image
          source={require('../assets/images/illustration.png')}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.description}>
          Kick off conversations by sharing your thoughts with voice or video. Move beyond text and express yourself in a way that truly connects.
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity 
            style={styles.emailButton}
            onPress={() => router.push('/auth/defaultlogin')}
          >
            <Text style={styles.emailButtonText}>continue with Email</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => router.push('/auth/defaultlogin')}
          >
            <Ionicons name="logo-apple" size={20} color="white" />
            <Text style={styles.socialButtonText}>continue with apple</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => router.push('/auth/defaultlogin')}
          >
            <Image 
              source={require('../assets/images/google.png')} 
              style={styles.googleIcon} 
            />
            <Text style={styles.socialButtonText}>continue with Google</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.loginLink} onPress={() => router.push('/auth/login')}>
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  time: {
    color: 'white',
    fontSize: 16,
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  illustration: {
    width: '100%',
    height: 300,
    marginVertical: 40,
  },
  description: {
    fontSize: 16,
    color: '#rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttons: {
    width: '100%',
    gap: 12,
  },
  emailButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#8A2BE2',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  socialButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1C1C1E',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  loginLink: {
    color: '#8A2BE2',
    textDecorationLine: 'underline',
  },
});

