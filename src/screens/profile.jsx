import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Home/Header'
import Footer from '../components/common/Footer'
import { TextInput } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { UPDATE_PROFILE_ROUTE } from '../utils/apiRoutes'
import { setUserDetails } from '../globalStates/dataSlice'
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


export default function Profile() {
    const userDetails = useSelector((state) => state.data.userDetails)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        FirstName: userDetails.FirstName,
        LastName: userDetails.LastName,
        Email: userDetails.Email,
        MobileNumber: userDetails.mobile,
        Pancard: userDetails.Pancard
    });

    const dismissKeyboard = () => {
        Keyboard.dismiss(); // Function to dismiss the keyboard

    };

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };


    function updateProfile() {
        axios.post(UPDATE_PROFILE_ROUTE, {
            FirstName: formData.FirstName,
            LastName: formData.LastName,
            Email: formData.Email,
            MobileNumber: formData.MobileNumber,
            Pancard: formData.Pancard
        })
            .then((res) => {
                console.log(res.status);

                if (res.status == 200) {

                    dispatch(setUserDetails({
                        ...userDetails,
                        FirstName: formData.FirstName,
                        LastName: formData.LastName,
                        Email: formData.Email,
                        Pancard: formData.Pancard
                    }))
                }
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.error) {
                    console.log("Error:", error.response.data.error);
                } else {
                    console.log("Unknown Error", error);
                }
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
            <Header title={'Profile'} />

            <TouchableWithoutFeedback  onPress={dismissKeyboard}>



                <View className="h-screen bg-white ">

                    <View className="w-full mt-5 ">


                        <LinearGradient
                            colors=
                            {['#DADBE8',
                                'white']}
                            start={{ y: 0, x: 0.2 }}
                            end={{ y: 1, x: 0.3 }}
                            className="rounded-lg mx-4"
                        >

                            <View className="mb-5 py-[10%] px-4 "
                                 style={{
                                    borderWidth: 0, // Set borderWidth to 0 for all sides
                                    borderBottomWidth: 4, // Set borderBottomWidth to create the bottom border
                                    borderColor: '#F37321', // Border color for the bottom border
                                    borderBottomLeftRadius: 15, // Border radius for the bottom left corner
                                    borderBottomRightRadius: 15, // Border radius for the bottom right corner
                                }}


                            >

                                <TouchableOpacity className="m-auto" >
                                    <Image className="" source={require('../../assets/Home/man2.png')} />
                                </TouchableOpacity>

                                <View className="flex-row justify-between mb-5">

                                    <View className="w-[70%]  ">
                                        <Text className="text-[13px] text-gray-500 mb-1"  style={{  fontFamily: 'OpenSans_700Bold' }}>
                                            First Name
                                        </Text>

                                        <Text className="text-blue-900 font-bold text-[14px]" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                            {userDetails.FirstName}
                                        </Text>

                                    </View>
                                    <View className="">
                                        <Text className="text-[13px] text-gray-500 mb-1 " style={{  fontFamily: 'OpenSans_700Bold' }}>
                                            Last Name
                                        </Text>

                                        <Text className="text-blue-900 font-bold text-[14px] " style={{  fontFamily: 'OpenSans_700Bold' }}>
                                            {userDetails.LastName}
                                        </Text>

                                    </View>

                                </View>



                                <View className="flex-row justify-between mb-5">

                                    <View className="w-[70%]  ">
                                        <Text className="text-[13px] text-gray-500 mb-1" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                            Email
                                        </Text>

                                        <Text className="text-blue-900 font-bold text-[14px]" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                            {userDetails.Email}
                                        </Text>

                                    </View>
                                    <View className="">
                                        <Text className="text-[13px] text-gray-500 mb-1" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                            Mobile NO.
                                        </Text>

                                        <Text className="text-blue-900 font-bold text-[14px]" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                            {userDetails.mobile}
                                        </Text>

                                    </View>

                                </View>



                                <View className="flex-row justify-between mb-5">

                                    <View className="">
                                        <Text className="text-[13px] text-gray-500 mb-1" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                            PAN Card No
                                        </Text>

                                        <Text className="text-blue-900  text-[14px]" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                            {userDetails.Pancard}
                                        </Text>

                                    </View>


                                </View>

                            </View>

                        </LinearGradient>

                        <View className="w-[90%] m-auto">
                            <TextInput
                                label={'First Name'}
                                className="bg-white mb-2"
                                value={formData.FirstName}
                                onChangeText={(text) => handleInputChange('FirstName', text)}
                                style={{ fontSize: 12, backgroundColor: 'white' }}
                            />
                            <TextInput
                                label={'Last Name'}
                                className="bg-white mb-2"
                                value={formData.LastName}
                                onChangeText={(text) => handleInputChange('LastName', text)}
                                style={{ fontSize: 12, backgroundColor: 'white' }}
                            />
                            <TextInput
                                label={'Email'}
                                className="bg-white mb-2"
                                value={formData.Email}
                                onChangeText={(text) => handleInputChange('Email', text)}
                                style={{ fontSize: 12, backgroundColor: 'white' }}
                            />
                            {/* 
                            <TextInput
                                label={'Mobile No.'}
                                className="bg-white mb-5"
                                value={formData.MobileNumber}
                                onChangeText={(text) => handleInputChange('MobileNumber', text)}
                                style={{ fontSize: 12, backgroundColor: 'white' }}
                            /> */}

                            <TextInput
                                label={'PAN Card No.'}
                                className="bg-white mb-5"
                                value={formData.Pancard}
                                onChangeText={(text) => handleInputChange('Pancard', text)}
                                style={{ fontSize: 12, backgroundColor: 'white' }}
                            />


                        </View>

                    </View>

                    <TouchableOpacity
                        className={`bg-orange-600 px-6 py-2 rounded mx-5`}
                        onPress={updateProfile}

                        // style={{ position: 'absolute', gap: 2, left: 0, right: 0, bottom: 0 }}
                    >
                        <Text className="text-white text-center text-lg " style={{  fontFamily: 'OpenSans_400Regular' }}>
                            Update Profile
                        </Text>
                    </TouchableOpacity>
                </View>

            </TouchableWithoutFeedback>
            {/* <Footer /> */}
        </>

    )
}


