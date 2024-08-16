import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { images } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const SignUp = () => {
  const [form, setForm] = useState({ 
    email: '', password: '' , username: ''
  })

  const submit = () => {

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
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            // placeholder="Enter your username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10 text-white"
            keyboardType="text"
          />

          <FormField
            // label="Email"
            title="Email"
            // placeholder="Enter your email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt- text-white"
            keyboardType="email-address"
          />

          <FormField
            // label="Password" 
            title="Password"
            // placeholder="Enter your email"
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
            <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
            <Link href="/sign-in" className="text-lg text-secondary font-psemibold">Sign In</Link>
          </View>
        </View>
      </ScrollView>
      <Text>SignIn</Text>
    </SafeAreaView>
  )
}

export default SignUp