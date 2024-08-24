import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ( { initialQuery, placeholder }) => {
    const [query, setQuery] = useState( initialQuery || '')
    const pathname = usePathname()
    

    return (
 
        <View className="border-2 border-black-200 w-full h-16 flex-row
        px-4 bg-black-100 rounded-2xl focus:border-secondary items-center
        space-x-4">
            <TextInput 
                className="text-base mt-0.5 text-white flex-1
                font-pregular"
                value={query}
                placeholder={placeholder}
                placeholderTextColor='#CDCDE0'
                onChangeText={(e) => setQuery(e)}
            />

            <TouchableOpacity onPress={ () => {
                if(!query) return  Alert.alert('Missing query', 
                    "Please input something to search results  across database")
                
                if(pathname.startsWith('/search')) 
                    router.setParams({ query })
                else router.push(`/search/${query}`)
            }}>
                <Image source={ icons.search } 
                    resizeMethod='contain'
                    className="w-5 h-5"
                    />
            </TouchableOpacity>
        </View>
)
}

export default SearchInput