import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function Thankyou({ navigation }) {
    return (
        <View
            className="px-8 h-screen bg-white flex-row items-center justify-center">

            <View className="">

                <View className="flex-row justify-center mb-5">
                    <Image className="" source={require('../../assets/Thankyou.png')} 
                     style={{
                        // tintColor: '#FF4800',
                      
                      }}
                    />
                </View>

                <View className="mb-10">

                    <Text className="text-6xl font-bold  mx-auto text-center mb-5 text-orange-600">
                        Thankyou
                    </Text>

                    <Text className="text-center">
                        For Sharing The Details
                    </Text>

                </View>

                <View className="">

                    <TouchableOpacity className="bg-orange-600  px-10 py-3 rounded-xl" onPress={() => navigation.navigate('Home')}>
                        <Text className="text-white text-center">
                            Go To Dashboard
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    )
}