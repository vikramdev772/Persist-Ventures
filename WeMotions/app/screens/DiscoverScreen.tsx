import React, { useState, useRef, useCallback } from 'react';
import { View, Dimensions, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { VideoPlayer } from './components/VideoPlayer'; // Ensure the path to VideoPlayer is correct

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

type ReelData = {
  id: string;
  username: string;
  videoUrl: string;
  likes: string;
  comments: string;
};

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
  }
];
const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  const handleViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newActiveIndex = viewableItems[0]?.index || 0;
      setActiveIndex(newActiveIndex);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        ref={flatListRef}
        data={reelsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <VideoPlayer
            video={{
              url: item.videoUrl,
              user: {
                name: item.username,
                avatar: 'https://via.placeholder.com/40', // Replace with actual avatar URL
                badge: 'Top Creator',
                description: 'Enjoying the vibes!',
              },
              stats: {
                likes: item.likes,
                shares: '1.2K',
                comments: item.comments,
                forwards: '300',
              },
            }}
            isActive={index === activeIndex}
          />
        )}
        pagingEnabled
        horizontal={false}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App;
