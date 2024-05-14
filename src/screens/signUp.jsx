import { View, Text, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native'
import { useEffect, useState } from 'react'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '../utils/apiRoutes';
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../globalStates/dataSlice';
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


export default function SignUp({ navigation }) {
    const userDetails = useSelector((state) => state.data.userDetails)
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const dispatch = useDispatch()
    const [error, setError] = useState({})

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    function handelSignUp() {

        // Check if all fields are valid
        const isFirstNameValid = !!userDetails.firstName;
        const isLastNameValid = !!userDetails.lastName;
        const isMobileNumberValid = !!userDetails.mobile && isValidMobileNumber(userDetails.mobile);
        const isEmailValid = !!userDetails.email && isValidEmail(userDetails.email);;
        const isPanCardValid = !!userDetails.panCard && isValidPAN(userDetails.panCard);;
        const isPincodeValid = !!userDetails.pincode && isValidPincode(userDetails.pincode);;


        if (!isFirstNameValid || !isLastNameValid || !isMobileNumberValid || !isEmailValid || !isPanCardValid || !isPincodeValid) {
            // Display error messages for invalid fields

            setError(
                {
                    firstNameError: !isFirstNameValid ? 'First Name is required ' : '',
                    lastNameError: !isLastNameValid ? 'Last Name  is required' : '',
                    mobileError: !isMobileNumberValid ? 'Enter a valid Mobile Number ' : '',
                    emailError: !isEmailValid ? 'Email is required' : '',
                    panCardError: !isPanCardValid ? 'PanCard is required' : '',
                    pincodeError: !isPincodeValid ? 'Pin Code required' : '',
                }
            )
            return; // Stop execution if any field is invalid
        }


        axios.post(SIGNUP_ROUTE, { ...userDetails, LoanType: 0 }).then((res) => {


            if (res.data.status != 'Exist') {

                axios.post(LOGIN_ROUTE, { MobileNumber: userDetails.mobile }).then((res) => {

                    if (res.data) {

                        dispatch(setUserDetails({
                            ...userDetails,
                            otp: res.data.otp,
                            login: false
                        }))

                        navigation.navigate('OtpScreen')
                    }

                }).catch((error) => {

                    if (error.response && error.response.data && error.response.data.error) {
                        console.log("Error:", error.response.data.error);
                    } else {
                        console.log("Unknown Error");
                    }
                })
            } else if (res.data.status == 'Exist') {

                console.log('Exist')

                setError({
                    ...error,
                    mobileError: 'Mobile Number Already Exist '
                })

            } else {

                console.log("Error")
            }

        }).catch((error) => {

            if (error.response && error.response.data && error.response.data.error) {
                console.log("Error:", error.response.data.error);
            } else {
                console.log("Unknown Error");
            }
        })
    }



    const handleChange = (field, value) => {


        let errorMessage = '';

        switch (field) {
            case 'firstName':
                errorMessage = !value ? 'First Name is required' : '';
                break;
            case 'lastName':

                errorMessage = !value ? 'Last is required' : '';
                break;
            case 'mobile':
                errorMessage = !value ? 'Mobile Number is required' : (!isValidMobileNumber(value) ? 'Enter a valid Mobile number' : '');
                break;

            case 'email':
                errorMessage = !value ? 'Email is required' : (!isValidEmail(value) ? 'Enter a valid Email' : '');
                break;


            case 'panCard':
                errorMessage = !value ? 'Pan Card Number is required' : (!isValidPAN(value) ? 'Enter a valid Pan Card number' : '');
                break;

            case 'pincode':
                errorMessage = !value ? 'Pincode is required' : (!isValidPincode(value) ? 'Enter a valid Pincode number' : '');
                break;

            default:
                break;
        }

        dispatch(setUserDetails({
            ...userDetails,
            [field]: value
        }));

        setError({ [`${field}Error`]: errorMessage })


    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardStatus(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardStatus(false);
            }
        );

        // Clean up listeners
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const isValidMobileNumber = (mobileNumber) => {
        // Regular expression for mobile number validation (assuming 10-digit Indian mobile numbers)
        const mobileRegex = /^[6-9]\d{9}$/;
        return mobileRegex.test(mobileNumber);
    };


    const isValidEmail = (email) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPincode = (pincode) => {
        // Regular expression for pincode validation (assuming 6 digit pincode)
        const pincodeRegex = /^[1-9][0-9]{5}$/;
        return pincodeRegex.test(pincode);
    };

    const isValidPAN = (pan) => {

        const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
        return panRegex.test(pan);
    };

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

            <KeyboardAvoidingView className="h-screen bg-white" style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>

                <View>

                    <View className={`${!keyboardStatus && 'h-screen'} flex-col justify-center p-4 `}>

                        {!keyboardStatus && <View>

                            <View style={{ position: 'absolute', left: 10, right: 0, top: 50 }}>
                                <Image className="h-32 w-32" source={require('../../assets/appIcon.png')} />

                            </View>

                            <Image className="absolute  -top-20 -z-10" source={require('../../assets/forms/Ellipse 237.png')} />
                            <Image className="absolute  -top-20" source={require('../../assets/forms/Ellipse 236.png')} />
                            <Image className="absolute  -top-20 right-20 -z-10" source={require('../../assets/forms/Ellipse 235.png')} />
                            <Image className="absolute  -top-20 right-24 -z-10" source={require('../../assets/forms/Ellipse 234.png')} />
                            <Image className="absolute  -top-10 -right-24 -z-10" source={require('../../assets/forms/Ellipse 231.png')} />

                        </View>}



                        <View className="h-[50%] m-auto ">

                            <View className="mb-5">

                                <Text className="text-4xl  " style={{ fontFamily: 'Poppins_300Light' }}>
                                    Welcome
                                </Text>

                            </View>

                            <View className="mb-5 px-2">
                                <Text className="text-[15px] mb-1 text-gray-400" style={{ fontFamily: 'Poppins_400Regular' }}>
                                    Sign Up to our platform
                                </Text>

                                <Text className="text-xl font-semibold text-blue-900" style={{ fontFamily: 'Poppins_400Regular' }}>
                                    Lets Start With Your Details
                                </Text>
                            </View>

                            <View className="">
                                <View className="flex-row gap-2 mb-5">

                                    <View className="w-[47%]">
                                        <TextInput
                                            style={{ fontSize: 12, backgroundColor: 'white' }}
                                            mode='flat'
                                            label="First Name"

                                            onChangeText={text => handleChange('firstName', text)}

                                        />

                                        {error.firstNameError && <Text className="text-red-500 text-[10px] m-1">
                                            {error.firstNameError}
                                        </Text>}

                                    </View>


                                    <View className="w-[47%]">
                                        <TextInput
                                            style={{ fontSize: 12, backgroundColor: 'white' }}
                                            mode='flat'
                                            label="Last Name"

                                            onChangeText={text => handleChange('lastName', text)}

                                        />

                                        {error.lastNameError && <Text className="text-red-500 text-[10px] m-1">
                                            {error.lastNameError}
                                        </Text>}

                                    </View>


                                </View>

                                <View className="mb-5">


                                    <TextInput
                                        style={{ fontSize: 12, backgroundColor: 'white' }}
                                        mode='flat'
                                        label="Mobile Number"
                                        onChangeText={text => handleChange('mobile', text)}
                                    />

                                    {error.mobileError && <Text className="text-red-500 text-[10px] m-1">
                                        {error.mobileError}
                                    </Text>}

                                </View>

                                <View className="mb-5">


                                    <TextInput
                                        style={{ fontSize: 12, backgroundColor: 'white' }}
                                        mode='flat'
                                        label="Email"
                                        onChangeText={text => handleChange('email', text)}
                                    />

                                    {error.emailError && <Text className="text-red-500 text-[10px] m-1">
                                        {error.emailError}
                                    </Text>}

                                </View>



                                <View className="mb-5 flex-row gap-2">

                                    <View className="w-[47%]">
                                        <TextInput

                                            style={{ fontSize: 12, backgroundColor: 'white' }}
                                            mode='flat'
                                            label="Pan Card"

                                            onChangeText={text => handleChange('panCard', text)}
                                        />

                                        {error.panCardError && <Text className="text-red-500 text-[10px] m-1">
                                            {error.panCardError}
                                        </Text>}

                                    </View>

                                    <View className="w-[47%]">
                                        <TextInput
                                            style={{ fontSize: 12, backgroundColor: 'white' }}
                                            mode='flat'
                                            label="Pin Code"

                                            onChangeText={text => handleChange('pincode', text)}
                                        />

                                        {error.pincodeError && <Text className="text-red-500 text-[10px] m-1">
                                            {error.pincodeError}
                                        </Text>}


                                    </View>

                                </View>


                            </View>


                        </View>


                    </View>


                    {!keyboardStatus && (<View style={{ position: 'absolute', gap: 5, left: 0, right: 0, bottom: 20 }}>

                        <View>

                            <TouchableOpacity className="bg-orange-600  px-6 py-3 rounded-xl mb-5 w-[90%] flex-row justify-center m-auto" onPress={handelSignUp}>
                                <Text className="text-white text-center text-lg font-bold" style={{ fontFamily: 'Poppins_400Regular' }}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                            <Text className="text-lg text-gray-400" style={{ fontFamily: 'Poppins_400Regular' }}>
                                Already have an account
                            </Text>

                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} className="mx-2">
                                <Text className="text-lg  text-orange-600 " style={{ fontFamily: 'Poppins_400Regular' }}>
                                    Login
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>)
                    }
                </View>

            </KeyboardAvoidingView>




        </TouchableWithoutFeedback>

    )
}