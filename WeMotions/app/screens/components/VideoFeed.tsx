import React, { useState } from 'react'
import { FlatList, StyleSheet, Dimensions } from 'react-native'
import { VideoPlayer } from './VideoPlayer'

const SAMPLE_VIDEOS = [
  {
    id: '1',
    url: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735708820/reels/evssb4qwphija9zdjbla.mp4',
    user: {
      name: 'Duane.Jenner',
      avatar: '/placeholder.svg?height=40&width=40',
      badge: 'Slow Replier',
      description: 'Share your thoughts with video freely, engage, and connect through more than 200+ emotions'
    },
    stats: {
      likes: '2k',
      shares: '5k',
      comments: '2k',
      forwards: '3k'
    }
  },
  {
    id: '2',
    url: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735708786/reels/ea3jiu4teumpc2dexcbi.mp4',
    user: {
      name: 'Marcia_Wisoky98',
      avatar: '/placeholder.svg?height=40&width=40',
      badge: 'Active Replier',
      description: 'Share your thoughts with video freely, engage, and connect through face-to-face conversations'
    },
    stats: {
      likes: '3k',
      shares: '6k',
      comments: '2k',
      forwards: '4k'
    }
  }
]

export function VideoFeed() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)

  const renderItem = ({ item, index }) => (
    <VideoPlayer 
      video={item} 
      isActive={index === activeVideoIndex}
    />
  )

  const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveVideoIndex(viewableItems[0].index)
    }
  }, [])

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }

  return (
    <FlatList
      data={SAMPLE_VIDEOS}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      snapToInterval={Dimensions.get('window').height - 80}
      snapToAlignment="start"
      decelerationRate="fast"
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  )
}

