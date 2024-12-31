import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { type ReactNode } from 'react';

interface AuthButtonProps {
  onPress: () => void;
  children: ReactNode;
  variant?: 'default' | 'social' | 'continue';
  icon?: ReactNode;
}

export function AuthButton({ 
  onPress, 
  children, 
  variant = 'default',
  icon
}: AuthButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        variant === 'social' && styles.socialButton,
        variant === 'continue' && styles.continueButton,
      ]} 
      onPress={onPress}
    >
      {icon && <>{icon}</>}
      <Text style={[
        styles.text,
        variant === 'social' && styles.socialText,
        variant === 'continue' && styles.continueText,
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4, // added margin top
  },
  socialButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
  },
  continueButton: {
    backgroundColor: '#8A2BE2',
    marginTop: 12, // added extra margin for continue button
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  socialText: {
    color: '#FFFFFF',
  },
  continueText: {
    color: '#FFFFFF',
  },
});

