import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

export default function SplashOne() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/splash-two');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});