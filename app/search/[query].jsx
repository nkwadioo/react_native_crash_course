import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../../lib/useAppwrite'
import { searchPosts } from '../../lib/appwrite'
import { StatusBar } from 'expo-status-bar'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { images } from '../../constants'
import VideoCard from '../../components/VideoCard'

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite( () => searchPosts(query))

  const [refresh, setRefresh] = useState(false)


  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={( {item} ) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={ () => (
          <View className="my-6 px-6">
            <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>

        )}
        ListEmptyComponent={ () => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />

        )} 
        />
      <StatusBar style='light' />
    </SafeAreaView>
  )
}

export default Search