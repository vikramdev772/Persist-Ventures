import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReelsViewer from './components/reels-viewer';

// Sample data with video URLs
const reelsData = [
  {
    id: '1',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794204/reels/docyamg8euojeuuypnnj.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794204/reels/docyamg8euojeuuypnnj.mp4'
  },
  {
    id: '2',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794206/reels/an9wuutgiydiljsvqvzj.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794206/reels/an9wuutgiydiljsvqvzj.mp4'
  },
  {
    id: '3',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794211/reels/wa1baviitk8finyf7q1w.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794211/reels/wa1baviitk8finyf7q1w.mp4'
  },
  {
    id: '4',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794188/reels/g9pl0ij0z0myssslgwr1.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794188/reels/g9pl0ij0z0myssslgwr1.mp4'
  },
  {
    id: '5',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794189/reels/gc25ckuuuhaplcimbwdq.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794189/reels/gc25ckuuuhaplcimbwdq.mp4'
  },
  {
    id: '6',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794184/reels/pgl4lghjxbsyptqbdges.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794184/reels/pgl4lghjxbsyptqbdges.mp4'
  },
  {
    id: '7',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794140/reels/rgzvezoewtzwf0yjgr1r.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794140/reels/rgzvezoewtzwf0yjgr1r.mp4'
  },
];

export default function DiscoverScreen() {
  const [selectedReel, setSelectedReel] = useState(null);
  const [showReels, setShowReels] = useState(false);

  const handleReelPress = (index) => {
    setSelectedReel(index);
    setShowReels(true);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for user"
          placeholderTextColor="#666"
        />
      </View>

      {/* Grid Content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.gridContainer}>
          {reelsData.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridItem}
              onPress={() => handleReelPress(index)}
            >
              <Image
                source={{ uri: item.thumbnailUrl }}
                style={styles.gridImage}
              />
              <View style={styles.userInfo}>
                <View style={styles.userAvatar}>
                  <Ionicons name="person-circle" size={20} color="#FFD700" />
                </View>
                <Text style={styles.username}>{item.username}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Reels Viewer Modal */}
      <Modal
        visible={showReels}
        animationType="slide"
        onRequestClose={() => setShowReels(false)}
        statusBarTranslucent
      >
        <ReelsViewer
          reels={reelsData}
          initialIndex={selectedReel}
          onClose={() => setShowReels(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    marginTop: 60,
  },
  searchContainer: {
    padding: 16,
    paddingTop: 8,
  },
  searchInput: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    color: '#FFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 1,
  },
  gridItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1A1A1A',
  },
  userInfo: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    marginRight: 4,
  },
  username: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  }
});

