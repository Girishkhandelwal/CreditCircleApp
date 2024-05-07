import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { CalculatorIcon, FaqIcon, HomeIcon, LogOut, LogOutIcon, PPCicon, PeopleIcon } from '../../../assets/sidebar';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin, setScreenName, setUserDetails } from '../../globalStates/dataSlice';
import { Avatar } from 'react-native-paper';

export default function CustomDrawerContent({ ...props }) {

    const userDetails = useSelector((state) => state.data.userDetails)
    const dispatch = useDispatch()
    const screenName = useSelector((state) => state.data.screenName)
    const navigation = useNavigation()

    function handelLogOut() {
        dispatch(setUserDetails({}))
        dispatch(setIsLogin(false))
        navigation.navigate('SignIn')


    }

    return (
        <>

            <DrawerContentScrollView className="h-screen" {...props}>

                <View >

                    <View className="bg-[#F6F0ED] p-5">
                        <View className="flex-row items-center" >

                            <TouchableOpacity className=" rounded-full " onPress={() => navigation.navigate('ProfileScreen')}>

                                <Avatar.Image size={50} source={require('../../../assets/Home/man2.png')} />

                            </TouchableOpacity>

                            <View className="mx-2">

                                <Text className=" font-bold text-[15px] text-orange-600">
                                    {userDetails.mobile}
                                </Text>

                                <Text className="font-bold text-gray-400">
                                    {userDetails.firstName}
                                </Text>
                            </View>

                        </View>
                    </View>

                    <View className="">

                        <TouchableOpacity className={`${screenName == 'Home' && 'bg-[#222C7A]'} p-5 flex-row items-center justify-between gap-x-3`} onPress={() => { dispatch(setScreenName('Home')); navigation.navigate('Home') }}>

                            <View className="flex-row items-center ">
                                <HomeIcon />

                                <Text className={`${screenName == 'Home' ? 'text-white' : 'text-gray-500'} font-semibold mx-2`}>
                                    Home
                                </Text>

                            </View>

                            {screenName == 'Home' && <Image className="h-3 w-3" source={require('../../../.../../assets/Home/offer/arrow.png')} />}

                        </TouchableOpacity>

                        <Image className="w-[90%] m-auto" source={require('../../../.../../assets/Home/offer/Line.png')} />

                        <TouchableOpacity className={`${screenName == 'EMICalculator' && 'bg-[#222C7A]'}  p-5 flex-row items-center justify-between gap-x-3`} onPress={() => { dispatch(setScreenName('EMICalculator')); navigation.navigate('EMICalculator') }}>
                            <View className="flex-row items-center ">
                                <CalculatorIcon />
                                <Text className={`${screenName == 'EMICalculator' ? 'text-white' : 'text-gray-500'} font-semibold mx-2`}>
                                    EMI Calculator
                                </Text>

                            </View>

                            {screenName == 'EMICalculator' && <Image className="h-3 w-3" source={require('../../../.../../assets/Home/offer/arrow.png')} />}

                        </TouchableOpacity>

                        <Image className="w-[90%] m-auto" source={require('../../../.../../assets/Home/offer/Line.png')} />

                        <TouchableOpacity className={`${screenName == 'Faq' && 'bg-[#222C7A]'}  p-5 flex-row items-center justify-between gap-x-3`} onPress={() => { dispatch(setScreenName('Faq')); navigation.navigate('Faq') }}>
                            <View className="flex-row items-center ">
                                <FaqIcon />
                                <Text className={`${screenName == 'Faq' ? 'text-white' : 'text-gray-500'} font-semibold mx-2`}>
                                    FAQ
                                </Text>

                            </View>

                            {screenName == 'Faq' && <Image className="h-3 w-3" source={require('../../../.../../assets/Home/offer/arrow.png')} />}

                        </TouchableOpacity>

                        <Image className="w-[90%] m-auto" source={require('../../../.../../assets/Home/offer/Line.png')} />




                        <TouchableOpacity className={`${screenName == 'PrivacyPolicy' && 'bg-[#222C7A]'} p-5 flex-row items-center justify-between gap-x-3`} onPress={() => { dispatch(setScreenName('PrivacyPolicy')); navigation.navigate('PrivacyPolicy') }}>

                            <View className="flex-row items-center ">
                                <PPCicon />
                                <Text className={`${screenName == 'PrivacyPolicy' ? 'text-white' : 'text-gray-500'} font-semibold mx-2`}>
                                    Privacy Policy
                                </Text>

                            </View>

                            {screenName == 'PrivacyPolicy' && <Image className="h-3 w-3" source={require('../../../.../../assets/Home/offer/arrow.png')} />}

                        </TouchableOpacity>




                    </View>




                </View>



            </DrawerContentScrollView>

            <TouchableOpacity className=" p-5 flex-row bg-orange-600" style={{

                position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0
            }} onPress={handelLogOut}>

                <LogOutIcon />
                <Text className="text-white font-semibold  mx-3">
                    Log out
                </Text>
            </TouchableOpacity>
        </>
    );
}