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
  },
  {
    id: '3',
    url: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735714756/reels/aundqgrxzlcry1n7fqpa.mp4',
    user: {
      name: 'Taylor.Swift',
      avatar: '/placeholder.svg?height=40&width=40',
      badge: 'Inspirational Speaker',
      description: 'Empowering messages delivered in style.'
    },
    stats: {
      likes: '4k',
      shares: '8k',
      comments: '3k',
      forwards: '5k'
    }
  },
  {
    id: '4',
    url: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735714778/reels/ooqmgc4bd7xnuske7tvp.mp4',
    user: {
      name: 'John.Doe',
      avatar: '/placeholder.svg?height=40&width=40',
      badge: 'Tech Enthusiast',
      description: 'Exploring technology through engaging videos.'
    },
    stats: {
      likes: '5k',
      shares: '9k',
      comments: '4k',
      forwards: '6k'
    }
  },
  {
    id: '5',
    url: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735714779/reels/blajo5uj4e6skyadhxcz.mp4',
    user: {
      name: 'Jane.Doe',
      avatar: '/placeholder.svg?height=40&width=40',
      badge: 'Fitness Guru',
      description: 'Stay fit, stay strong! Your daily dose of motivation.'
    },
    stats: {
      likes: '6k',
      shares: '10k',
      comments: '5k',
      forwards: '7k'
    }
  },
  {
    id: '6',
    url: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735720063/reels/oxvf9djjesqqgovvoko4.mp4',
    user: {
      name: 'Chris.Brown',
      avatar: '/placeholder.svg?height=40&width=40',
      badge: 'Music Lover',
      description: 'Enjoy the rhythm of life with my beats.'
    },
    stats: {
      likes: '3k',
      shares: '7k',
      comments: '2k',
      forwards: '4k'
    }
  },
  {
    id: '7',
    url: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735720116/reels/ncujpkg7dmcjbsayrqe5.mp4',
    user: {
      name: 'Lara.Croft',
      avatar: '/placeholder.svg?height=40&width=40',
      badge: 'Adventure Seeker',
      description: 'Sharing glimpses of my adventures!'
    },
    stats: {
      likes: '4k',
      shares: '9k',
      comments: '3k',
      forwards: '5k'
    }
  },
  {
    id: '8',
    url: 'https://res.cloudinary.com/dzienjo1z/video/upload/v1735720167/reels/yrxzhevr6yuks15qhrwk.mp4',
    user: {
      name: 'Peter.Parker',
      avatar: '/placeholder.svg?height=40&width=40',
      badge: 'Storyteller',
      description: 'Capturing life, one video at a time.'
    },
    stats: {
      likes: '5k',
      shares: '11k',
      comments: '6k',
      forwards: '8k'
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
