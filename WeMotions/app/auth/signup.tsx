import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Pressable,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { debounce } from 'lodash';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface FormFieldProps {
  label: string;
  field: keyof FormData;
  errors: FormErrors;
  value: string;
  onChangeText: (text: string) => void;
  setFocusedField: (field: keyof FormData | null) => void;
  [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  field, 
  errors, 
  value, 
  onChangeText, 
  setFocusedField,
  ...props 
}) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      {...props}
      style={[styles.input, errors[field] && styles.inputError]}
      placeholder={label}
      placeholderTextColor="#666666"
      value={value}
      onChangeText={onChangeText}
      onFocus={() => setFocusedField(field)}
      onBlur={() => setFocusedField(null)}
    />
    {errors[field] && (
      <Text style={styles.errorText}>{errors[field]}</Text>
    )}
  </View>
);

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<keyof FormData | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedEmailValidation = useCallback(
    debounce((email: string) => {
      if (email && !/\S+@\S+\.\S+/.test(email)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
      } else {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    }, 300),
    []
  );

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Perform sign-up logic here
        await router.push('/onboarding/profile-picture');
      } catch (error) {
        console.error('Sign-up error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [validateForm, router]);

  const getInputStyle = (field: keyof FormData) => [
    styles.input,
    focusedField === field && styles.inputFocused,
    errors[field] && styles.inputError
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text style={styles.headerTitle}>Login</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>
            Create an account to join the conversation and connect with your community
          </Text>

          <View style={styles.form}>
            <View style={styles.nameRow}>
              <View style={styles.nameField}>
                <FormField 
                  label="First name" 
                  field="firstName" 
                  errors={errors} 
                  value={formData.firstName} 
                  onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
                  setFocusedField={setFocusedField}
                />
              </View>

              <View style={styles.nameField}>
                <FormField 
                  label="Last name" 
                  field="lastName" 
                  errors={errors} 
                  value={formData.lastName} 
                  onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
                  setFocusedField={setFocusedField}
                />
              </View>
            </View>

            <FormField 
              label="Username" 
              field="username" 
              errors={errors} 
              value={formData.username} 
              onChangeText={(text) => setFormData(prev => ({ ...prev, username: text }))} 
              setFocusedField={setFocusedField}
              autoCapitalize="none" 
            />

            <FormField 
              label="Email" 
              field="email" 
              errors={errors} 
              value={formData.email} 
              onChangeText={(text) => {
                setFormData(prev => ({ ...prev, email: text }));
                debouncedEmailValidation(text);
              }} 
              setFocusedField={setFocusedField}
              keyboardType="email-address" 
              autoCapitalize="none" 
            />

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, errors.password && styles.inputError, styles.passwordInput]}
                  placeholder="Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={!showPassword}
                  value={formData.password}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))} 
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
                <Pressable 
                  style={styles.eyeIcon} 
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={8}
                >
                  <Ionicons 
                    name={showPassword ? "eye" : "eye-off"} 
                    size={20} 
                    color="#999999" 
                  />
                </Pressable>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, errors.confirmPassword && styles.inputError, styles.passwordInput]}
                  placeholder="Confirm Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={!showConfirmPassword}
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))} 
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                />
                <Pressable 
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  hitSlop={8}
                >
                  <Ionicons 
                    name={showConfirmPassword ? "eye" : "eye-off"} 
                    size={20} 
                    color="#999999" 
                  />
                </Pressable>
              </View>
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity 
          style={styles.continueButtonContainer} 
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <LinearGradient 
            colors={['#A858F4', '#9032E6']} 
            style={styles.continueButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <Text style={styles.continueButtonText}>
              {isSubmitting ? 'Submitting...' : 'Continue'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 12,
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
    marginBottom: 32,
    lineHeight: 24,
  },
  form: {
    gap: 24,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 16,
  },
  nameField: {
    flex: 1,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  input: {
    height: 56,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  inputFocused: {
    borderColor: '#8B5CF6',
  },
  inputError: {
    borderColor: '#FF4444',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
  continueButtonContainer: {
    marginHorizontal: 24,
    marginBottom: Platform.OS === 'ios' ? 34 : 24,
  },
  continueButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

