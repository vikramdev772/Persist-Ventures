import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AccountInfo: React.FC = () => {
  const router = useRouter();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: 'Bryan',
    lastName: 'Reichert',
    username: 'Bryan_Reichert38',
    email: 'Bryan_Reichert15@hotmail.com',
  });

  const handleSave = () => {
    // Handle save logic here
    router.back();
  };

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
        <Text style={styles.headerTitle}>Account Info</Text>
      </View>

      <View style={styles.content}>
        {/* Name Fields */}
        <View style={styles.nameContainer}>
          <View style={styles.nameField}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'firstName' && styles.inputFocused,
              ]}
              value={formData.firstName}
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
              onFocus={() => setFocusedField('firstName')}
              onBlur={() => setFocusedField(null)}
              placeholderTextColor="#71717A"
            />
          </View>
          <View style={styles.nameField}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'lastName' && styles.inputFocused,
              ]}
              value={formData.lastName}
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
              onFocus={() => setFocusedField('lastName')}
              onBlur={() => setFocusedField(null)}
              placeholderTextColor="#71717A"
            />
          </View>
        </View>

        {/* Username Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === 'username' && styles.inputFocused,
            ]}
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
            onFocus={() => setFocusedField('username')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor="#71717A"
          />
        </View>

        {/* Email Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === 'email' && styles.inputFocused,
            ]}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#71717A"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    marginTop:30,
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
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  nameField: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#18181B',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#27272A',
  },
  inputFocused: {
    borderColor: '#A855F7',
  },
  saveButton: {
    backgroundColor: '#A855F7',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AccountInfo;

