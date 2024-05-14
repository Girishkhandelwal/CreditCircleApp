//Home.jsx

import { View, Text, TouchableOpacity, Image, ScrollView, Button, Platform, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Home/Header';
import { CircleIcon, CircleLineIcon, UnionIcon } from '../../assets/Home';
import Offers from '../components/Home/Offers';
import Partners from '../components/Home/Partners';
import Footer from '../components/common/Footer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setScreenName } from '../globalStates/dataSlice';
import pushNotification from '../../pushNotification';
import {
    useFonts,
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
    OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold_Italic,
  } from '@expo-google-fonts/open-sans';


export default function Home({ navigation }) {

    const dispatch = useDispatch()
    const { expoPushToken } = pushNotification()



    async function sendPushNotification() {

        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'CreditCircle',
            body: 'Hello Dear!',
            data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

    }

    let [fontsLoaded] = useFonts({
        OpenSans_300Light,
        OpenSans_400Regular,
        OpenSans_500Medium,
        OpenSans_600SemiBold,
        OpenSans_700Bold,
        OpenSans_800ExtraBold,
        OpenSans_300Light_Italic,
        OpenSans_400Regular_Italic,
        OpenSans_500Medium_Italic,
        OpenSans_600SemiBold_Italic,
        OpenSans_700Bold_Italic,
        OpenSans_800ExtraBold_Italic,
      });

      if (!fontsLoaded) {
        return <Text>Loading..</Text>
      } 


    return (
        <>
            <Header title={'Dashboard'} />

            <View
                className="p-3 h-screen bg-white ">

                <View className="">

                    <View className='mb-[5%]'>

                        <View className={`flex-row items-center justify-between m-2 mb-[5%]`}>

                            <TouchableOpacity className="p-3 border-[1px] border-gray-400 rounded w-[49%] items-center justify-between  flex-row  " onPress={() => {
                                dispatch(setScreenName('LoanOffers'))
                                navigation.navigate('LoanOffers')

                                sendPushNotification()


                            }}>
                                <View className="flex-row ">
                                    <Image className="w-5 h-5" source={require('../../assets/Home/status.png')} />
                                    <Text className="text-red-600  mx-1" style={{  fontFamily: 'OpenSans_700Bold' }}>Loan Status</Text>

                                </View>
                                <Image className="" source={require('../../assets/Home/Vector.png')} />

                            </TouchableOpacity>

                            <TouchableOpacity className="p-3 border-[1px] border-gray-400 rounded w-[49%] items-center  flex-row  " onPress={() => {
                                dispatch(setScreenName('PlFormOne'))
                                navigation.navigate('PlFormOne')

                            }}>

                                <View className="flex-row ">

                                    <Image className="w-5 h-5" source={require('../../assets/Home/lucide_notebook-pen.png')} />
                                    <Text className="text-blue-800  mx-1" style={{  fontFamily: 'OpenSans_700Bold' }}>Apply for Loan</Text>
                                </View>
                                <Image className="ml-2" source={require('../../assets/Home/Vector.png')} />

                            </TouchableOpacity>

                        </View>



                        <View className="bg-[#222C7A] flex-row justify-center rounded-xl h-28" >

                            <View className="relative ">

                                <View className="absolute -left-1">

                                    <CircleLineIcon />

                                </View>
                                <CircleIcon />


                                <Text className="absolute w-[60%] left-[13%] top-7 text-[15px]  text-blue-900" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                    Need
                                </Text>
                                <Text className="absolute w-[70%] left-[13%] text-[16px] top-11  text-blue-900" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                    Instant loan
                                </Text>
                                <Text className="absolute w-[60%] left-[13%] top-16 text-[15px] text-blue-900" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                    for Urgent?
                                </Text>

                                <TouchableOpacity className="absolute bg-orange-600 bottom-[0%] left-5 py-1 px-2 rounded-2xl" onPress={() => navigation.navigate('PlFormOne')}>
                                    <Text className="text-white text-[10px]" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                        Apply Now
                                    </Text>
                                </TouchableOpacity>

                                <Image className="absolute bottom-0 -right-8" source={require('../../assets/Home/man.png')} />

                            </View>

                            {/* <View className="bg-gray-200 flex-row justify-center rounded-lg h-[140px] w-[400px] p-1 mx-auto">
                            <Image
                                source={require('../../assets/Home/banner11.png')}
                                resizeMode="cover" // You can adjust this value according to your requirement
                                style={{ flex: 1, width: '400px', height: undefined, borderRadius: 5 }}
                            />
                        </View> */}


                        </View>

                    </View>


                    <Offers navigation={navigation} />

                    <Partners navigation={navigation} />

                </View>

            </View>

            <Footer />

        </>
    )
}