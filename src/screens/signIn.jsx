import { View, Text, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useEffect, useState } from 'react'
import PhoneInput from 'react-native-international-phone-number';
import { LOGIN_ROUTE } from '../utils/apiRoutes';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin, setUserDetails } from '../globalStates/dataSlice';
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


export default function SignIn({ navigation }) {

  


    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.data.userDetails)

    const [selectedCountry, setSelectedCountry] = useState(null);

    const [inputValue, setInputValue] = useState('');

    const [error, setError] = useState(false)

    function handleInputValue(phoneNumber) {
        setError(false)
        setInputValue(phoneNumber);
    }

    function handleSelectedCountry(country) {
        setSelectedCountry(country);
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    function handelLogin() {

        console.log("inputValue", inputValue.replace(/\s/g, ''))

        axios.post(LOGIN_ROUTE, {
            MobileNumber: inputValue.replace(/\s/g, ''),
        }).then((res) => {

            console.log(res.data)

            if (res.data.otp) {

                dispatch(setUserDetails({
                    ...userDetails,
                    otp: res.data.otp,
                    mobile: inputValue.replace(/\s/g, ''),
                    firstName: res.data.name

                }))

                navigation.navigate('OtpScreen')

            } else if (res.data.status == "Not Found") {
                console.log('SignUp Please')
                setError(true)
            }

        }).catch((error) => {

            if (error.response && error.response.data && error.response.data.error) {
                console.log("Error:", error.response.data.error);
            } else {
                console.log("Unknown Error");
            }
        })
    }


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

        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View>

                <View className="h-screen flex-col justify-center p-4">

                    <View style={{ position: 'absolute', left: 20, right: 0, top: 70 }}>
                        <Image className="h-32 w-32" source={require('../../assets/appIcon.png')} />

                    </View>

                    <Image className="absolute  -top-20 -z-10" source={require('../../assets/forms/Ellipse 237.png')} />
                    <Image className="absolute  -top-20" source={require('../../assets/forms/Ellipse 236.png')} />
                    <Image className="absolute  -top-20 right-20 -z-10" source={require('../../assets/forms/Ellipse 235.png')} />
                    <Image className="absolute  -top-20 right-24 -z-10" source={require('../../assets/forms/Ellipse 234.png')} />
                    <Image className="absolute  -top-10 -right-24 -z-10" source={require('../../assets/forms/Ellipse 231.png')} />


                    <View className="flex-col justify-center ">

                        <View className="mb-5">

                            <Text className="text-4xl  mb-2" style={{ fontFamily: 'Poppins_300Light' }}>
                                Welcome
                            </Text>

                        </View>

                        <View className="mb-10 px-1">
                            <Text className="text-[15px] mb-1 text-gray-400" style={{ fontFamily: 'Poppins_400Regular' }}>
                                Login in to our platform
                            </Text>

                            <Text className="text-2xl text-blue-900 " style={{ fontFamily: 'Poppins_400Regular' }}>
                                Lets Start with your mobile Number
                            </Text>
                        </View>

                        <View className="mb-2">

                            <Text className="text-gray-400 mb-2" style={{ fontFamily: 'Poppins_400Regular' }}> 
                                Enter the mobile number here.
                            </Text>

                            <PhoneInput
                                defaultValue="+91"
                                placeholder='Enter Your Number'
                                value={inputValue}
                                onChangePhoneNumber={handleInputValue}
                                selectedCountry={selectedCountry}
                                onChangeSelectedCountry={handleSelectedCountry}
                                defaultCountry="IN"
                                phoneInputStyles={{

                                    container: {
                                        backgroundColor: 'transparent',
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                        borderColor: 'transparent',
                                        borderBottomWidth: 2,


                                    },

                                    input: {
                                        marginLeft: 15
                                    },

                                    flag: {
                                        marginLeft: -12

                                    },
                                    caret: {
                                        color: 'black',
                                        fontSize: 16,
                                    },
                                    divider: {
                                        // display: 'none',
                                    },


                                }}

                            />

                            <View className="flex-row  space-x-5">
                                <View style={{ height: 2, backgroundColor: '#DBDBDB', width: '34%' }} />

                                <View style={{ height: 2, backgroundColor: '#DBDBDB', width: '55%' }} />
                            </View>

                        </View>

                        {error && <Text className="text-red-500 ">
                            Mobile Number Not Registered Sign Up Please
                        </Text>}


                    </View>


                </View>

                <View style={{ position: 'absolute', gap: 5, left: 0, right: 0, bottom: 10 }}>

                    <View>

                        <TouchableOpacity className="bg-orange-600  px-6 py-3 rounded-xl mb-5 w-[90%] flex-row justify-center m-auto" onPress={handelLogin}>
                            <Text className="text-white text-center text-lg " style={{ fontFamily: 'Poppins_400Regular' }}>
                                LOGIN
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                        <Text className="text-[15px] text-gray-400" style={{ fontFamily: 'Poppins_400Regular' }}>
                            don’t have an account
                        </Text>

                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="mx-2">
                            <Text className="text-[15px] text-orange-600 " style={{ fontFamily: 'Poppins_400Regular' }}>
                                Signup
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>

        </TouchableWithoutFeedback>
    )
}