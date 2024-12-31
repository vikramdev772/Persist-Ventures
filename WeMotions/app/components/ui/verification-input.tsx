import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';

interface VerificationInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
}

export function VerificationInput({ length, value, onChange }: VerificationInputProps) {
  const inputRefs = useRef<TextInput[]>([]);
  const [focused, setFocused] = useState<number>(-1);

  const handleChange = (text: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = text;
    onChange(newValue.join(''));

    // Move to next input if there's a value
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            style={[
              styles.input,
              focused === index && styles.focused,
              value[index] && styles.filled
            ]}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            value={value[index] || ''}
            onFocus={() => setFocused(index)}
            onBlur={() => setFocused(-1)}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    width: (Dimensions.get('window').width - 120) / 5,
    height: (Dimensions.get('window').width - 120) / 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#1C1C1E',
    fontSize: 24,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  focused: {
    borderColor: '#8A2BE2',
  },
  filled: {
    borderColor: '#8A2BE2',
    backgroundColor: '#2C2C2E',
  },
});

