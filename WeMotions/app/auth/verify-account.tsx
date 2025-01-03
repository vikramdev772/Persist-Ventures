import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { VerificationInput } from '../components/ui/verification-input';
import { CountdownTimer } from '../components/ui/countdown-timer';
import { AuthButton } from '../components/ui/auth-button';

export default function VerifyAccount() {
  const [verificationCode, setVerificationCode] = useState('');
  const [isResendActive, setIsResendActive] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(true);
  const router = useRouter();

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  const handleResend = () => {
    if (mounted) {
      setIsResendActive(false);
      setError('');
    }
  };

  const handleVerify = () => {
    if (verificationCode === '12345') {
      router.push('/auth/verification-success');
    } else {
      setError('Wrong Code Verification');
    }
  };

  const handleTimerComplete = () => {
    if (mounted) {
      setIsResendActive(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/auth/defaultlogin')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Verify your account</Text>
        <Text style={styles.subtitle}>
          Check your email for a verification code to complete setup.
        </Text>

        <View style={styles.inputContainer}>
          <VerificationInput
            length={5}
            value={verificationCode}
            onChange={(code) => {
              setVerificationCode(code);
              setError('');
            }}
            error={error}
          />
          {error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color="#FF3B30" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          <CountdownTimer
            initialSeconds={59}
            onComplete={handleTimerComplete}
          />
        </View>

        <TouchableOpacity
          onPress={handleResend}
          disabled={!isResendActive}
          style={styles.resendContainer}
        >
          <Text style={styles.resendText}>
            Didn't receive a code?{' '}
            <Text style={[styles.resendLink, !isResendActive && styles.resendLinkDisabled]}>
              Resend
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContent}>
        <AuthButton
          variant="continue"
          onPress={handleVerify}
          disabled={verificationCode.length !== 5}
        >
          Verify your account
        </AuthButton>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 32,
    lineHeight: 24,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  errorText: {
    color: '#FF3B30',
    marginLeft: 4,
    fontSize: 14,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    color: '#999999',
    fontSize: 14,
  },
  resendLink: {
    color: '#8A2BE2',
    textDecorationLine: 'underline',
  },
  resendLinkDisabled: {
    opacity: 0.5,
  },
  bottomContent: {
    padding: 24,
    paddingBottom: 34,
  },
});