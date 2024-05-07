import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import Header from '../components/Home/Header'
import Footer from '../components/common/Footer'
import { TextInput } from 'react-native-paper'


export default function Profile() {

    const dismissKeyboard = () => {
        Keyboard.dismiss(); // Function to dismiss the keyboard

    };
    return (

        <>
        <Header title={'Profile'} />

        <TouchableWithoutFeedback onPress={dismissKeyboard}>

        

                <View className="h-screen ">

                    <View className="h-[50%] flex-col  m-auto w-full">


                        <TouchableOpacity className="h-20 w-20 m-auto rounded-full flex-row justify-center mb-5" >
                            <Image className="" source={require('../../assets/Home/man2.png')} />
                        </TouchableOpacity>

                        <View className="w-[90%] m-auto">

                            <TextInput
                                label={'First Name'}
                                mode="outlined"
                                className="bg-gray-200 mb-2"
                                outlineColor="white"

                            />

                            <TextInput
                                label={'Last Name'}
                                mode="outlined"
                                className="bg-gray-200 mb-2"
                                outlineColor="white"

                            />


                            <TextInput
                                label={'Email'}
                                mode="outlined"
                                className="bg-gray-200 mb-2"
                                outlineColor="white"

                            />


                            <TextInput
                                label={'Phone Number'}
                                mode="outlined"
                                className="bg-gray-200 mb-5"
                                outlineColor="white"

                            />


                            <TouchableOpacity className="bg-orange-600 rounded-xl">

                                <Text className="text-white font-bold p-3  text-center">

                                    Update Profile
                                </Text>


                            </TouchableOpacity>



                        </View>



                    </View>

                </View>

                

          


        </TouchableWithoutFeedback>
         <Footer/>
        </>

    )
}