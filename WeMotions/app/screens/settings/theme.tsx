import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type ThemeOption = 'light' | 'dark' | 'default';

const ThemeSelector: React.FC = () => {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('dark');

  const ThemeOption: React.FC<{
    label: string;
    value: ThemeOption;
    isSelected: boolean;
    onSelect: () => void;
  }> = ({ label, isSelected, onSelect }) => (
    <TouchableOpacity
      style={styles.themeOption}
      onPress={onSelect}
    >
      <View style={[
        styles.radio,
        isSelected && styles.radioSelected
      ]}>
        {isSelected && (
          <View style={styles.radioInner} />
        )}
      </View>
      <Text style={[
        styles.themeOptionText,
        isSelected && styles.themeOptionTextSelected
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Theme</Text>
      </View>

      <View style={styles.content}>
        <ThemeOption
          label="Light Mood"
          value="light"
          isSelected={selectedTheme === 'light'}
          onSelect={() => setSelectedTheme('light')}
        />
        <ThemeOption
          label="Dark Mood"
          value="dark"
          isSelected={selectedTheme === 'dark'}
          onSelect={() => setSelectedTheme('dark')}
        />
        <ThemeOption
          label="Default settings"
          value="default"
          isSelected={selectedTheme === 'default'}
          onSelect={() => setSelectedTheme('default')}
        />
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
    paddingTop: 8,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#71717A',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#A855F7',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#A855F7',
  },
  themeOptionText: {
    fontSize: 16,
    color: '#71717A',
  },
  themeOptionTextSelected: {
    color: '#FFFFFF',
  },
});

export default ThemeSelector;

