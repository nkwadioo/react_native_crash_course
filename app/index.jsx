import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {  Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';


export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: '100%' }}>
            <View className="w-full justify-center align-center min-h-[95vh] px-4">
                <Image 
                    source={ images.logo }
                    className="h-[60px]"
                    resizeMode="contain"
                />

                <Image
                    source={ images.cards }
                    className="max-w-[380px] w-full h-[300px]"
                    resizeMode="contain"
                />

                <View className="relative mt-5" >
                    <Text className="text-3xl text-white font-bold text-center">
                        Discover Endless Possibilities with 
                        <Text className="text-secondary-200 relative inline-block"> Aora
                        </Text>
                    </Text>
                    <Image source={ images.path } className="w-[90px] h-[15px] absolute -bottom-2 right-4" />
                </View>

                <Text className="font-pregular text-xs text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of limited expoloration with Aora.</Text>

                <View className="justify-center items-center">
                    <CustomButton 
                        title="Continue with Email"
                        handlePress={() => router.push('/sign-in')}
                        containerStyles="w-full mt-7"
                    />
                </View>
            </View>
        </ScrollView>
        <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}

