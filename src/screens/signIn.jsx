import { View, Text, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useEffect, useState } from 'react'
import PhoneInput from 'react-native-international-phone-number';
import { LOGIN_ROUTE } from '../utils/apiRoutes';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin, setUserDetails } from '../globalStates/dataSlice';



export default function SignIn({ navigation }) {

    const dispatch = useDispatch()
    const userDetails = useSelector((state)=> state.data.userDetails)

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

            }else if( res.data.status == "Not Found"){
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

                            <Text className="text-3xl  mb-2">
                                Welcome back!
                            </Text>

                        </View>

                        <View className="mb-10 px-2">
                            <Text className="text-[15px] mb-1 text-gray-300">
                                Login in to our platform
                            </Text>

                            <Text className="text-xl font-semibold text-blue-900">
                                Lets Start with your mobile Number
                            </Text>
                        </View>

                        <View className="mb-2">
                            <PhoneInput
                                value={inputValue}
                                onChangePhoneNumber={handleInputValue}
                                selectedCountry={selectedCountry}
                                onChangeSelectedCountry={handleSelectedCountry}
                                defaultCountry="IN"
                                phoneInputStyles={{

                                    flag: {},
                                    caret: {
                                        color: '#F3F3F3',
                                        fontSize: 16,
                                    },
                                    divider: {
                                        display: 'none',
                                    },

                                    caret: {
                                        display: 'none'
                                    },

                                }}

                            />

                        </View>

                       {error && <Text className="text-red-500 ">
                            Mobile Number Not Registered Sign Up Please
                        </Text>}


                    </View>


                </View>

                <View style={{ position: 'absolute', gap: 5, left: 0, right: 0, bottom: 10 }}>

                    <View>

                        <TouchableOpacity className="bg-orange-600  px-6 py-3 rounded-xl mb-5 w-[90%] flex-row justify-center m-auto" onPress={handelLogin}>
                            <Text className="text-white text-center text-lg font-bold">
                                Sign In
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                        <Text className="text-lg ">
                            don’t have an account
                        </Text>

                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="mx-2">
                            <Text className="text-lg font-bold text-orange-600 ">
                                Sign Up
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>


        </TouchableWithoutFeedback>
    )
}