import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BackIcon, DotsIcon, MenuIcon } from '../../assets/Header'
import { LinearGradient } from 'expo-linear-gradient'
import { FibeIcon } from '../../assets/Home'
import { ApprovedIcon } from '../../assets/offers'

export default function Offers({ navigation }) {
    return (
        <LinearGradient
            colors=
            {['#ffdede',
                'white']}
            start={{ y: 0, x: 0.5 }}
            end={{ y: 1, x: 0.5 }} className="h-screen">

            <View className="p-4">

                <View className="mt-10 mb-5  flex-row justify-between items-center">

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                    >
                        <View className="bg-white rounded-full p-4 ">
                            <BackIcon />
                        </View>


                    </TouchableOpacity>

                    <Text className="text-2xl font-bold ">Partners</Text>

                    <TouchableOpacity >
                        <View className="bg-gray-300 rounded-full p-4 ">
                            <DotsIcon />
                        </View>


                    </TouchableOpacity>

                </View>


                <View className="flex-row flex-wrap  justify-center gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (


                        <View key={index} className="bg-white flex-row justify-center rounded-xl p-10 w-[45%] ">

                            {<FibeIcon />}

                        </View>



                    ))
                    }
                </View>

            </View>
        </LinearGradient>
    )
}