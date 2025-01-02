import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Video, AVPlaybackStatus } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type ReelData = {
  id: string;
  username: string;
  videoUrl: string;
  likes: string;
  comments: string;
};

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const reelsData = [
  {
    id: '1',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794204/reels/docyamg8euojeuuypnnj.mp4',
    likes: '87.5K',
    comments: '2,091'
  },
  {
    id: '2',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794206/reels/an9wuutgiydiljsvqvzj.mp4',
    likes: '92.1K',
    comments: '1,845'
  },
  {
    id: '3',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794211/reels/wa1baviitk8finyf7q1w.mp4',
    likes: '76.3K',
    comments: '1,567'
  },
  {
    id: '4',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794188/reels/g9pl0ij0z0myssslgwr1.mp4',
    likes: '103.2K',
    comments: '3,241'
  },
  {
    id: '5',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794189/reels/gc25ckuuuhaplcimbwdq.mp4',
    likes: '95.8K',
    comments: '2,756'
  },
  {
    id: '6',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794184/reels/pgl4lghjxbsyptqbdges.mp4',
    likes: '88.9K',
    comments: '2,123'
  },
  {
    id: '7',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735794140/reels/rgzvezoewtzwf0yjgr1r.mp4',
    likes: '79.4K',
    comments: '1,897'
  },
  {
    id: '8',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735831360/reels/dof6dbezdwngsmt2th2c.mp4',
    likes: '89.3K',
    comments: '2,210'
  },
  {
    id: '9',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735831262/reels/q9dzt4tgalgzrwbyd6fv.mp4',
    likes: '84.7K',
    comments: '1,980'
  },
  {
    id: '10',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735831263/reels/tczvjpxdhs6mtk12agba.mp4',
    likes: '91.2K',
    comments: '2,450'
  },
  {
    id: '11',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735831268/reels/x0jguetnkhi3jcp4fclc.mp4',
    likes: '87.1K',
    comments: '2,130'
  },
  {
    id: '12',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735831283/reels/nkzbwigajhvgyr4w7v0e.mp4',
    likes: '94.5K',
    comments: '2,620'
  },
  {
    id: '13',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735831306/reels/dadiqdt5fulwyvysnyw9.mp4',
    likes: '89.8K',
    comments: '2,340'
  },
  {
    id: '14',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735831306/reels/ydtwt746fq8gcvkhv7uw.mp4',
    likes: '90.4K',
    comments: '2,410'
  },
  {
    id: '15',
    username: 'Rosalie_Gorczany',
    videoUrl: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735831344/reels/cjxw1uihtj5elqduugcu.mp4',
    likes: '85.6K',
    comments: '2,050'
  }
];


interface ReelsViewerProps {
  reels: ReelData[];
  initialIndex: number;
  onClose: () => void;
}

const ReelsViewer: React.FC<ReelsViewerProps> = ({ reels, initialIndex = 0, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const flatListRef = useRef<FlatList>(null);
  const videoRefs = useRef<{ [key: string]: Video | null }>({});

  const onViewableItemsChanged = useCallback(({ changed }: { changed: any[] }) => {
    changed.forEach(element => {
      const cell = videoRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          cell.playAsync();
          setActiveIndex(element.index);
        } else {
          cell.stopAsync();
        }
      }
    });
  }, []);

  const renderItem = useCallback(({ item, index }: { item: ReelData; index: number }) => (
    <View style={styles.reelContainer}>
      <Video
        ref={ref => (videoRefs.current[index] = ref)}
        source={{ uri: item.videoUrl }}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={index === activeIndex}
        isLooping
        isMuted={false}
      />
      
      <View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <View style={styles.userInfo}>
            <Ionicons name="person-circle" size={40} color="#FFD700" />
            <Text style={styles.username}>{item.username}</Text>
          </View>
          
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={28} color="#FFF" />
              <Text style={styles.iconText}>{item.likes}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="chatbubble-outline" size={28} color="#FFF" />
              <Text style={styles.iconText}>{item.comments}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="paper-plane-outline" size={28} color="#FFF" />
              <Text style={styles.iconText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  ), [activeIndex]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" />
      <View style={styles.reelsViewerContainer}>
        <FlatList
          ref={flatListRef}
          data={reels}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          pagingEnabled
          vertical
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50
          }}
          initialScrollIndex={initialIndex}
          getItemLayout={(_, index) => ({
            length: WINDOW_HEIGHT,
            offset: WINDOW_HEIGHT * index,
            index,
          })}
        />

        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.tabsContainer}>
            <Text style={styles.activeTab}>Trending</Text>
            <Text style={styles.inactiveTab}>Following</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const DiscoverScreen: React.FC = () => {
  const [selectedReel, setSelectedReel] = useState<number | null>(null);
  const [showReels, setShowReels] = useState(false);
  const videoRefs = useRef<{ [key: string]: Video | null }>({});

  const handleReelPress = (index: number) => {
    setSelectedReel(index);
    setShowReels(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for user"
            placeholderTextColor="#666"
          />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.gridContainer}>
            {reelsData.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={styles.gridItem}
                onPress={() => handleReelPress(index)}
              >
                <Video
                  ref={ref => (videoRefs.current[index] = ref)}
                  source={{ uri: item.videoUrl }}
                  style={styles.gridVideo}
                  resizeMode="cover"
                  shouldPlay={false}
                  isMuted={true}
                />
                <View style={styles.gridUserInfo}>
                  <Ionicons name="person-circle" size={20} color="#FFD700" />
                  <Text style={styles.gridUsername}>{item.username}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Modal
          visible={showReels}
          animationType="fade"
          onRequestClose={() => setShowReels(false)}
          statusBarTranslucent
        >
          {selectedReel !== null && (
            <ReelsViewer
              reels={reelsData}
              initialIndex={selectedReel}
              onClose={() => setShowReels(false)}
            />
          )}
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
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
    aspectRatio: 0.75,
    padding: 1,
  },
  gridVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1A1A1A',
  },
  gridUserInfo: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gridUsername: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  reelsViewerContainer: {
    flex: 1,
  },
  reelContainer: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  video: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  overlayContent: {
    marginBottom: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    zIndex: 1,
  },
  closeButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginRight: 28,
  },
  activeTab: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
    paddingBottom: 4,
  },
  inactiveTab: {
    color: '#999',
    fontSize: 16,
    marginHorizontal: 8,
    paddingBottom: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  socialIcons: {
    position: 'absolute',
    right: 0,
    bottom: 20,
    alignItems: 'center',
  },
  iconButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconText: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 4,
  },
});

export default DiscoverScreen;