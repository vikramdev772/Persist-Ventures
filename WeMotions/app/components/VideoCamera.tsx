import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface VideoCameraProps {
  onClose: () => void;
}

interface FilterOption {
  id: string;
  name: string;
  icon: string;
}

const filterOptions: FilterOption[] = [
  { id: '1', name: 'Normal', icon: 'image-outline' },
  { id: '2', name: 'Blur', icon: 'eye-outline' },
  { id: '3', name: 'Sepia', icon: 'color-filter-outline' },
  { id: '4', name: 'Vintage', icon: 'film-outline' },
  { id: '5', name: 'Grayscale', icon: 'contrast-outline' },
];

export function VideoCamera({ onClose }: VideoCameraProps) {
  const [flashOn, setFlashOn] = useState(false);
  const [frontCamera, setFrontCamera] = useState(true);

  const toggleFlash = () => setFlashOn(!flashOn);
  const toggleCamera = () => setFrontCamera(!frontCamera);

  const renderFilterItem = ({ item }: { item: FilterOption }) => (
    <TouchableOpacity style={styles.filterItem}>
      <Ionicons name={item.icon as any} size={24} color="#FFF" />
      <Text style={styles.filterText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topControls}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={30} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFlash}>
          <Ionicons name={flashOn ? "flash" : "flash-off"} size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* This is where the actual camera view would be rendered */}
      <View style={styles.cameraView}>
        <Text style={styles.cameraText}>Camera View</Text>
      </View>

      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.cameraButton}>
          <View style={styles.cameraButtonInner} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.switchCameraButton} onPress={toggleCamera}>
          <Ionicons name="camera-reverse-outline" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filterOptions}
        renderItem={renderFilterItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    color: '#FFF',
    fontSize: 24,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  cameraButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF',
  },
  switchCameraButton: {
    position: 'absolute',
    right: 30,
  },
  filterList: {
    position: 'absolute',
    bottom: 140,
    left: 0,
    right: 0,
  },
  filterItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  filterText: {
    color: '#FFF',
    marginTop: 5,
  },
});

