import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ( {title, value, placeholder, handleChangeText, keyboardType, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
    <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-base text-gray-100 font-pmedium">{ title }</Text>
        
        <View className="border-2 border-black-200 w-full h-16 flex-row
        px-4 bg-black-100 rounded-2xl focus:border-secondary items-center">
        <TextInput 
            className="flex-1 text-white font-simibold"
            value={value}
            placeholder={placeholder}
            placeholderTextColor='#7B7B8B'
            onChangeText={handleChangeText}
            secureTextEntry={!showPassword && title === 'Password'}
        />

        {title === 'Password' && (
            <TouchableOpacity onPress={ () => setShowPassword(!showPassword)}>
                <Image source={ !showPassword ? icons.eye : icons.eyeHide} 
                className="w-6 h-6 resizeMode-contain"/>
            </TouchableOpacity>
        )}
        </View>
    </View>
)
}

export default FormField