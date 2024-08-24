import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../../lib/useAppwrite'
import { getUserPosts, searchPosts, signOut } from '../../lib/appwrite'
import { StatusBar } from 'expo-status-bar'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'

import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'

const Profile = () => {
  const  { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite( () => getUserPosts(user.$id))

  const [refresh, setRefresh] = useState(false)

  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')
  }

  console.log(user)
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={( {item} ) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={ () => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <View className="w-full flex-row-reverse">
              <TouchableOpacity
                className="w-6 h-6 items-end mb-10"
                onPress={ logout }
              >
                <Image 
                  source={ icons.logout }
                  className="w-6 h-6" resizeMode='contain'
                />
              </TouchableOpacity>

            </View>
            <View className="justify-center items-center border border-secondary rounded-lg w-16 h-16">
              <Image source={ {uri: user?.avatar} } className="w-full h-full rounded-lg" />
            </View>
            
            <InfoBox  
              title={ user?.username }
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex-row" >

              <InfoBox  
                title={ posts.length || 0 }
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              
              <InfoBox  
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>

        )}
        ListEmptyComponent={ () => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for user"
          />

        )} 
        />
      <StatusBar style='light' />
    </SafeAreaView>
  )
}

export default Profile