import { View, Text, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useEffect, useState } from 'react'

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin, setUserDetails } from '../globalStates/dataSlice';
import { LOGIN_ROUTE } from '../utils/apiRoutes';
import axios from 'axios';
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

const CELL_COUNT = 6;
const OTP_EXPIRY_TIME = 29

export default function SignIn({ navigation }) {

    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.data.userDetails)
    const isLogin = useSelector((state) => state.data.isLogin)
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const [timer, setTimer] = useState(OTP_EXPIRY_TIME);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [error, setError] = useState(false)


    const dismissKeyboard = () => {
        Keyboard.dismiss(); // Function to dismiss the keyboard

    };

    function handelVerify() {

        if (value == userDetails.otp && !isLogin) {

            navigation.navigate('PlFormOne')
            dispatch(setIsLogin(true))

        } else if (value == userDetails.otp && isLogin) {

            navigation.navigate('Home')
            dispatch(setIsLogin(true))

        }

        else {

            console.log('Invalid OTP')
            setError(true)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0 && isTimerRunning) {
                setTimer((prevTimer) => prevTimer - 1);
            } else {
                setIsResendDisabled(false);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, isTimerRunning]);


    const handleResend = () => {

        axios.post(LOGIN_ROUTE, {
            MobileNumber: userDetails.mobile,
        }).then((res) => {


            if (res.data.otp) {

                dispatch(setUserDetails({
                    ...userDetails,
                    otp: res.data.otp,

                }))

                setIsResendDisabled(true);
                setTimer(OTP_EXPIRY_TIME);
                setIsTimerRunning(true);


                console.log('otp resend successfully')

            } else {

                console.log('otp resend error')
            }

        }).catch((error) => {

            if (error.response && error.response.data && error.response.data.error) {
                console.log("Error:", error.response.data.error);
            } else {
                console.log("Unknown Error");
            }
        })
    };


    useEffect(()=>{

        if (value.length < 6) {
            setError(false)
        }

    },[value])


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

            <View className="">

                <View className="h-screen flex-col justify-center p-4">

                    <View style={{ position: 'absolute', left: 20, right: 0, top: 80 }}>
                        <Image className="h-32 w-32" source={require('../../assets/appIcon.png')} />

                    </View>

                    <Image className="absolute  -top-10 -z-10" source={require('../../assets/forms/Ellipse 237.png')} />
                    <Image className="absolute  -top-10" source={require('../../assets/forms/Ellipse 236.png')} />
                    <Image className="absolute  -top-10 right-20 -z-10" source={require('../../assets/forms/Ellipse 235.png')} />
                    <Image className="absolute  -top-10 right-24 -z-10" source={require('../../assets/forms/Ellipse 234.png')} />
                    <Image className="absolute  top-0 -right-24 -z-10" source={require('../../assets/forms/Ellipse 231.png')} />


                    <View className="flex-col justify-center px-2">

                        <View className="mb-5">

                            <Text className="text-4xl  mb-2" style={{ fontFamily: 'Poppins_300Light' }} >
                                Verification
                            </Text>

                        </View>

                        <View className="mb-10 ">
                            <Text className="text-[15px] mb-1 text-gray-400" style={{ fontFamily: 'Poppins_400Regular' }}>
                                Login in to our platform
                            </Text>

                            <Text className="text-xl font-semibold text-blue-900" style={{ fontFamily: 'Poppins_400Regular' }}>
                                Please enter the OTP
                            </Text>
                        </View>

                        <View className="">

                            <Text className="text-gray-400 mb-5 " style={{ fontFamily: 'Poppins_400Regular' }}>
                                Please enter the OTP here
                            </Text>

                            {error && value.length == 6 &&
                                <View className="">

                                    <Text className="text-red-500" style={{ fontFamily: 'Poppins_400Regular' }}>
                                        OTP Invalid
                                    </Text>

                                </View>

                            }

                            <CodeField
                                ref={ref}
                                {...props}
                                value={value}
                                onChangeText={setValue}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                renderCell={({ index, symbol, isFocused }) => (
                                    <View
                                        // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                                        onLayout={getCellOnLayoutHandler(index)}
                                        key={index}
                                        style={[styles.cellRoot, isFocused && styles.focusCell, { borderBottomColor: error && value.length == 6 ? 'red' : '#ccc'}]}>
                                        <Text style={[styles.cellText, { color: error && value.length == 6 ? 'red' : 'black' }]}>
                                            {symbol || (isFocused ? <Cursor /> : null)}
                                        </Text>
                                    </View>
                                )}
                            />


                            <View className="flex-row justify-between items-center mt-5 ">

                                <Text>
                                    <Text>00:{timer} </Text>
                                </Text>

                                <TouchableOpacity className={`p-2  rounded-lg`} disabled={isResendDisabled} onPress={handleResend}>

                                    <Text className={`${isResendDisabled ? 'text-orange-400' : 'text-orange-600'}`} style={{ fontFamily: 'Poppins_400Regular' }}>
                                        RESEND OTP
                                    </Text>

                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>


                </View>

                <View style={{ position: 'absolute', gap: 5, left: 0, right: 0, bottom: 20 }}>

                    <View>

                        <TouchableOpacity className="bg-orange-600  px-6 py-3 rounded-xl mb-5 w-[90%] flex-row justify-center m-auto" onPress={handelVerify}>
                            <Text className="text-white text-center text-lg font-bold" style={{ fontFamily: 'Poppins_400Regular' }}>
                                LOGIN
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                        <Text className="text-lg text-gray-400" style={{ fontFamily: 'Poppins_400Regular' }}>
                            don't have an account
                        </Text>

                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="mx-2">
                            <Text className="text-lg text-orange-600 " style={{ fontFamily: 'Poppins_400Regular' }}>
                                Signup
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>

        </TouchableWithoutFeedback>

    )
}


const styles = StyleSheet.create({
    codeFieldRoot: {
        marginTop: 20,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cellRoot: {
        width: 30,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    cellText: {
        color: '#000',
        fontSize: 36,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#007AFF',
        borderBottomWidth: 2,
    },
});