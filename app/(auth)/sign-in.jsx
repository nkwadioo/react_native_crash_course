import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { images } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {
  const [form, setForm] = useState({ 
    email: '', password: '' 
  })

  const submit = async () => {
    if(!form.email || !form.password) {
      return Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true)

    try {
      await signIn(form.email, form.password)

      // set it to global state using constents

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
      console.log('Failed to login => ', error.message)
    } finally {
      setIsSubmitting(false)
    }


  }
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image 
            source={ images.logo }
            className="w-[120px] h-[35px]"
            resizeMode="contain"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField
            label="Email"
            title="Email"
            placeholder="Enter your email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7 text-white"
            keyboardType="email-address"
          />

          <FormField
            label="Password" 
            title="Password"
            placeholder="Enter your email"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton 
            containerStyles="mt-10"
            title="Sign In"
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
            <Link href="/sign-up" className="text-lg text-secondary font-psemibold">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
      <Text>SignIn</Text>
    </SafeAreaView>
  )
}

export default SignIn