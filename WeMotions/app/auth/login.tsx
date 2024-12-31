import { View, Text, StyleSheet, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { AuthInput } from '../components/ui/auth-input';
import { AuthButton } from '../components/ui/auth-button';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function Login() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
  
    const handleContinue = () => {
      if (!email) {
        setError('Please enter your email');
        return;
      }
      if (!email.includes('@')) {
        setError('Please enter a valid email');
        return;
      }
      // Navigate to the verify account page
      router.push('/auth/verify-account');
    };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="cellular" size={16} color="white" />
            <Ionicons name="wifi" size={16} color="white" />
            <Ionicons name="battery-full" size={16} color="white" />
          </View>
        </View>
        <View style={styles.headerContent}>
          <Link href="../" style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Link>
          <Text style={styles.headerText}>Sign up</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.topContent}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Log in to join the conversation and connect with your community
          </Text>

          <View style={styles.form}>
            <AuthInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError('');
              }}
              placeholder="Email"
              error={error}
            />

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.line} />
            </View>

            <AuthButton
              variant="social"
              onPress={() => {}}
              icon={<Ionicons name="logo-apple" size={20} color="white" />}
            >
              continue with Apple
            </AuthButton>

            <AuthButton
              variant="social"
              onPress={() => {}}
              icon={
                <Image
                  source={require('../../assets/images/google.png')}
                  style={styles.googleIcon}
                />
              }
            >
              continue with Google
            </AuthButton>
          </View>
        </View>

        <View style={styles.bottomContent}>
          <AuthButton
            variant="continue"
            onPress={handleContinue}
          >
            Continue
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
    paddingTop: 0,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 44,
  },
  time: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    justifyContent: 'space-between',
  },
  topContent: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 24,
    lineHeight: 24,
  },
  form: {
    gap: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#2C2C2E',
  },
  dividerText: {
    color: '#999999',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  bottomContent: {
    paddingBottom: 34,
  },
});