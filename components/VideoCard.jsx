import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'

const VideoCard = ({ 
    video: { id, thumbnail, title, video,
        creator: { username, avatar }
    }
}) => {
    const [play, setPlay] = useState(false)

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gpa3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image
                            source={ {uri: avatar}}
                            className="w-full h-full rounded-lg"
                            resizeMethod='cover'
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text 
                            className="text-white font-pregular text-xs"
                            numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className="text-xs text-gray-100">
                            {username}
                        </Text>
                    </View>
                </View>

                <View className="pt-2 pr-2">
                    <Image
                        className="w-1 h-5"
                        source={icons.menu}
                        resizeMethod='contain'
                    />
                </View>
            </View>
            
            {
                play ? (
                    <Video
                        source={{ uri: video }}
                        className="w-full h-60 rounded-xl mt-3"
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                        shouldPlay
                        onPlaybackStatusUpdate={(status) => {
                            if(status.didJustFinish) {
                                setPlay(false)
                            }
                        }}
                    />
                ) : (
                    <TouchableOpacity
                        className="w-full h-60 rounded-xl mt-3
                        relative justify-center items-center"
                        onPress={() => setPlay(true)}
                    >
                        <Image
                            source={ {uri: thumbnail}}
                            className="w-full h-full rounded-xl mt-3"
                            resizeMethod='cover'
                        />
                        <Image
                            source={ icons.play }
                            className="absolute w-12 h-12"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default VideoCard