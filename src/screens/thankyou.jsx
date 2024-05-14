import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import {
    useFonts,
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

export default function Thankyou({ navigation }) {

    let [fontsLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_100Thin_Italic,
        Poppins_200ExtraLight,
        Poppins_200ExtraLight_Italic,
        Poppins_300Light,
        Poppins_300Light_Italic,
        Poppins_400Regular,
        Poppins_400Regular_Italic,
        Poppins_500Medium,
        Poppins_500Medium_Italic,
        Poppins_600SemiBold,
        Poppins_600SemiBold_Italic,
        Poppins_700Bold,
        Poppins_700Bold_Italic,
        Poppins_800ExtraBold,
        Poppins_800ExtraBold_Italic,
        Poppins_900Black,
        Poppins_900Black_Italic,
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }
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

                    <Text className="text-6xl  mx-auto text-center mb-5 text-orange-600" style={{ fontFamily: 'Poppins_600SemiBold' }}>
                        Thankyou
                    </Text>

                    <Text className="text-center" style={{ fontFamily: 'Poppins_400Regular' }}>
                        For Sharing The Details
                    </Text>

                </View>

                <View className="">

                    <TouchableOpacity className="bg-orange-600  px-10 py-3 rounded-xl" onPress={() => navigation.navigate('Home')}>
                        <Text className="text-white text-center" style={{ fontFamily: 'Poppins_400Regular' }}>
                            Go To Dashboard
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    )
}