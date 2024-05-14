import { View, Text, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ApprovedIcon, CalenderIcon, ClockIcon } from '../../assets/offers'
import DashedLine from 'react-native-dashed-line';
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../components/Home/Header'
import Footer from '../components/common/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { GET_OFFERS_ROUTE } from '../utils/apiRoutes'
import axios from 'axios'
import { setOfferList } from '../globalStates/dataSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export default function LoanOffers({ navigation }) {
    const [imageCache, setImageCache] = useState({});
    const offerList = useSelector((state) => state.data.offerList)
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.data.userDetails)



    useEffect(() => {

        axios.post(GET_OFFERS_ROUTE, { UserMobileNumber: userDetails.mobile, Campaign: "", Status: "" }).then((res) => {


            if (Array.isArray(res.data)) {
                dispatch(setOfferList(res.data))

            }
        })

    }, [])

    useEffect(() => {

        offerList.forEach((offer) => {
            const { CampaignImg } = offer;

            if (CampaignImg && !imageCache[CampaignImg]) {

                AsyncStorage.getItem(CampaignImg)
                    .then((imageData) => {
                        if (imageData) {

                            setImageCache(prevCache => ({
                                ...prevCache,
                                [CampaignImg]: imageData
                            }));
                        } else {

                            fetchImageFromNetwork(CampaignImg);
                        }
                    })
                    .catch((error) => {
                        console.error('Error reading image from local storage:', error);
                    });
            }
        });
    }, [offerList]);

    const fetchImageFromNetwork = (imageName) => {
        axios.get(`https://www.creditcircle.in/images/${imageName}`, { responseType: 'blob' })
            .then((response) => {
                const imageBlob = response.data;
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageData = reader.result;

                    AsyncStorage.setItem(imageName, imageData)
                        .then(() => {

                            setImageCache(prevCache => ({
                                ...prevCache,
                                [imageName]: imageData
                            }));
                        })
                        .catch((error) => {
                            console.error('Error storing image in local storage:', error);
                        });
                };
                reader.readAsDataURL(imageBlob);
            })
            .catch((error) => {
                console.error('Error fetching image from network:', error);
            });
    };

    function separateDateAndTime(dateTimeString) {
        const dateObj = new Date(dateTimeString);


        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[dateObj.getMonth()];
        const date = dateObj.getDate();
        const year = dateObj.getFullYear();


        const addLeadingZero = (value) => {
            return value < 10 ? '0' + value : value;
        };


        const hours = addLeadingZero(dateObj.getHours());
        const minutes = addLeadingZero(dateObj.getMinutes());
        const seconds = addLeadingZero(dateObj.getSeconds());


        const formattedDate = `${month}, ${date}, ${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        return { date: formattedDate, time: formattedTime };
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
            <Header title="Loan Offer's" />

            <View
                className="h-screen bg-white ">


                <View className={` p-4`}>

                    <ScrollView className="h-[95%]" showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>

                        {offerList.length > 0 && offerList.map((offer, index) => {

                            const { date, time } = separateDateAndTime(offer.applicationDate);

                            const statusImage = offer.applicationStatus == 'success' ? require('../../assets/offer/Approved.png') : offer.applicationStatus == 'pending' ? require('../../assets/offer/Pending.png') : require('../../assets/offer/Reject.png');


                            return (<View key={index} className="bg-white p-5 border-[1px]  border-gray-300 rounded-xl  mb-2"
                                style={{

                                    shadowColor: '#000000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 1
                                    },
                                    shadowRadius: 1,
                                    shadowOpacity: 0.2

                                }}

                                elevation={2}
                            >

                                <View className=" border-1  flex-row justify-between mb-1">

                                    <View>
                                        {imageCache[offer.CampaignImg] ? (
                                            <Image source={{ uri: imageCache[offer.CampaignImg] }} style={{ width: 50, height: 50 }} />
                                        ) : null}
                                    </View>


                                    <View className="flex-row items-center gap-2">

                                        <View>
                                            <View className="flex-row items-center gap-1 mb-1">
                                                <CalenderIcon />
                                                <Text className="text-[12px] text-blue-700" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                                    {date}
                                                </Text>
                                            </View>

                                            <View className="flex-row items-center gap-1">
                                                <ClockIcon />
                                                <Text className="text-[12px] text-blue-700 " style={{  fontFamily: 'OpenSans_700Bold' }}>
                                                    {time}
                                                </Text>
                                            </View>
                                        </View>

                                        <View>

                                            <Image className="h-10 w-10" source={statusImage} />

                                        </View>

                                    </View>

                                </View>

                                <DashedLine dashLength={5} className="mb-3 " dashColor='#E6E6E6' />

                                <View className="flex-row justify-between mb-2">

                                    <View className="w-[30%] flex-col">

                                        <Text className=" text-gray-500" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                            Requested Loan Amount
                                        </Text>

                                        <Text className=" text-blue-700" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                            {offer.LoanAmountRequired || '-'}
                                        </Text>

                                    </View>


                                    <View className="w-[30%]">

                                        <Text className=" text-gray-500" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                            Approved Loan Amount
                                        </Text>

                                        <Text className=" font-bold text-blue-700">
                                            {offer.approvedLimit || '-'}
                                        </Text>

                                    </View>


                                    <View className="w-[20%]">

                                        <Text className=" text-gray-500 mb-4" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                            Other
                                        </Text>

                                        <Text className="font-bold text-blue-700">
                                            {'-'}
                                        </Text>

                                    </View>


                                </View>

                                <View className="flex-row justify-between items-center">

                                    <View>

                                        <Text className="text-gray-500" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                            Remark
                                        </Text>

                                        <Text style={{  fontFamily: 'OpenSans_400Regular' }}>
                                            Customer Lead Updated
                                        </Text>

                                    </View>

                                    <TouchableOpacity className="p-2 bg-orange-600 rounded">

                                        <Text className="text-white " style={{  fontFamily: 'OpenSans_400Regular' }}>
                                            Click Here
                                        </Text>
                                    </TouchableOpacity>

                                </View>

                            </View>)

                        }
                        )}
                    </ScrollView>

                </View>

            </View>

            <Footer />
        </>
    )
}