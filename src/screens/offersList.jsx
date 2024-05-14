import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Header from '../components/Home/Header';
import Footer from '../components/common/Footer';
import DashedLine from 'react-native-dashed-line';
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

export default function OffersList({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');

    // Define an array of offer objects
    const offers = [
        {
            id: 1,
            title: "Get upto 5% Interest on your Account Balance with kotak 811.",
            description: "Open an Account today and increase your chance of getting a Personal Loan",
            category: "Personal Loan",
            imageUrl: require('../../assets/offerList/offer1.png'),
            linkText: "Click Here"
        },

        {
            id: 2,
            title: "Get upto 5% Interest on your Account Balance with kotak 811.",
            description: "Open an Account today and increase your chance of getting a Personal Loan",
            category: "Personal Loan",
            imageUrl: require('../../assets/offerList/offer1.png'),
            linkText: "Click Here"
        },

        {
            id: 3,
            title: "Get upto 5% Interest on your Account Balance with kotak 811.",
            description: "Open an Account today and increase your chance of getting a Personal Loan",
            category: "Personal Loan",
            imageUrl: require('../../assets/offerList/offer1.png'),
            linkText: "Click Here"
        },

        {
            id: 4,
            title: "Get upto 5% Interest on your Account Balance with kotak 811.",
            description: "Open an Account today and increase your chance of getting a Personal Loan",
            category: "Personal Loan",
            imageUrl: require('../../assets/offerList/offer1.png'),
            linkText: "Click Here"
        },
        // Add more offer objects as needed
    ];
    
    
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
            <Header title="Offer Listing" />

            <View className="h-screen bg-white">

                <View className={`p-4`}>
                    <ScrollView className="h-[85%]"
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >

                        <View className="border-[1px] border-gray-300 mb-2" style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 12 }}>
                            <TextInput
                                style={{ flex: 1, fontSize: 16, marginRight: 8, fontFamily: 'OpenSans_400Regular' }}
                                placeholder="Search"
                                onChangeText={setSearchQuery}
                                value={searchQuery}
                            />
                            <TouchableOpacity style={{ padding: 8 }}>
                                <Image source={require('../../assets/offerList/searchIcon.png')} style={{ width: 24, height: 24 }} />
                            </TouchableOpacity>
                        </View>

                        {offers.map((offer) => (
                            <View
                                key={offer.id}
                                className="border-[1px] border-gray-300 rounded-xl mb-3 p-2"
                                style={{
                                    shadowColor: '#000000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 1
                                    },
                                    shadowRadius: 1,
                                    shadowOpacity: 0.2
                                }}

                            >
                                <View className="flex-row mb-2 items-center">
                                    <Image className="h-20 w-20" source={offer.imageUrl} />
                                    <View className="w-[90%] mx-2 ">
                                        <Text className="text-[12px] text-blue-700  mb-2 w-[80%]" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                            {offer.title}
                                        </Text>
                                        <Text className="text-gray-500 text-[12px] w-[80%]" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                            {offer.description}
                                        </Text>
                                    </View>
                                </View>
                                <DashedLine dashLength={5} className="mb-3" dashColor='#E6E6E6' dashThickness={1} />
                                <View className="flex-row justify-between items-center">
                                    <View className="flex-row">
                                        <Text className="text-orange-600">
                                            Category :
                                        </Text>
                                        <Text className="mx-2 text-blue-700 " style={{  fontFamily: 'OpenSans_400Regular' }}>
                                            {offer.category}
                                        </Text>
                                    </View>
                                    <TouchableOpacity className="p-2 bg-[#273283] rounded flex-row items-center justify-between w-[30%]">
                                        <Text className="text-white text-[12px]" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                            {offer.linkText}
                                        </Text>
                                        <Image className="h-2 w-4" source={require('../../assets/offerList/Arrow1.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                </View>
            </View>
            <Footer />
        </>
    );
}
