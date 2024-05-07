import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BackIcon, DotsIcon, MenuIcon } from '../../assets/Header'
import { LinearGradient } from 'expo-linear-gradient'
import { FibeIcon } from '../../assets/Home'
import { ApprovedIcon } from '../../assets/offers'
import { useDispatch } from 'react-redux'
import { setFormData } from '../globalStates/dataSlice'

export default function Offer({ navigation }) {
    const dispatch = useDispatch()

    function offer() {

        dispatch(setFormData({}))
        navigation.navigate('PlFormOne')

    }

    return (
        <LinearGradient
            colors=
            {['#ffdede',
                'white']}
            start={{ y: 0, x: 0.5 }}
            end={{ y: 1, x: 0.5 }} className="h-screen">

            <View className="p-4">

                <View className="mt-10 mb-5  flex-row  items-center">

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                    >
                        <View className="bg-white rounded-full p-4 ">
                            <BackIcon />
                        </View>


                    </TouchableOpacity>

                    <Text className="text-xl font-bold mx-14">Personal Loan</Text>


                </View>

                <View>

                    <Text className="text-xl font-bold mb-5">
                        Get your personal 0r business loan approved instantly!
                    </Text>

                    <Text className="text-lg mb-2">
                        Rate of interest 11.99% per annum
                    </Text>

                    <Text className="text-lg mb-2">
                        Loan tenure minimum of 3 Months to maximum 3 Years
                    </Text>

                    <Text className="text-lg mb-2">
                        Zero Processing fees, No Documentation require.

                    </Text>

                    <Text className="text-lg mb-2">
                        Secure and instant personal loans for students and salaried professionals.
                    </Text>

                </View>

            </View>

            <View className="absolute bottom-8 w-full ">

                <TouchableOpacity className="bg-orange-600  w-[90%] mx-auto p-4  rounded-3xl" onPress={offer}>
                    <Text className="text-white text-center">
                        Click Here
                    </Text>
                </TouchableOpacity>

            </View>

        </LinearGradient>
    )
}