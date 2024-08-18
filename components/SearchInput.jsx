import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const SearchInput = ( {title, value, placeholder, handleChangeText, keyboardType, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
 
        <View className="border-2 border-black-200 w-full h-16 flex-row
        px-4 bg-black-100 rounded-2xl focus:border-secondary items-center
        space-x-4">
            <TextInput 
                className="text-base mt-0.5 text-white flex-1
                font-pregular"
                value={value}
                placeholder={placeholder}
                placeholderTextColor='#7B7B8B'
                onChangeText={handleChangeText}
                secureTextEntry={!showPassword && title === 'Password'}
            />

            <TouchableOpacity onPress={ () => setShowPassword(!showPassword)}>
                <Image source={ icons.search } 
                    resizeMethod='contain'
                    className="w-5 h-5"
                    />
            </TouchableOpacity>
        </View>
)
}

export default SearchInput