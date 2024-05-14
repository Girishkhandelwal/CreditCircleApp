import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { HomeIcon, OfferListIcon, PlusIcon, ProfileIcon, SearchIcon } from '../../../assets/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setScreenName } from '../../globalStates/dataSlice';
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


export default function Footer() {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const screenName = useSelector((state)=> state.data.screenName)
  
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
    <View className={` bg-[#222C7A] ${Platform.OS == 'android' ? 'p-1' : 'p-3'}`}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        // Adjust height as needed
        backgroundColor: '#222C7A',
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0
      }}
    >
      <TouchableOpacity className="w-[20%] flex-col items-center " onPress={() => {
        dispatch(setScreenName('Home'))
        navigation.navigate('Home')
      }}>

        <View
          className="mb-1"

        >
          <HomeIcon color={screenName == 'Home' ? 'orange' : 'white'}/>

        </View>

        <Text className={`${screenName == 'Home' ? 'text-orange-600' : 'text-white'}  `} style={{  fontFamily: 'OpenSans_400Regular' }}>Home</Text>

      </TouchableOpacity>

      <TouchableOpacity className="w-[23%] flex-col items-center mr-5" onPress={() => {
        dispatch(setScreenName('OffersList'))
        navigation.navigate('OffersList')
      }}>

        <View
          className="mb-1"

        >
          <SearchIcon color={screenName == 'OffersList' ? 'orange' : 'white'}/>

        </View>

        <Text className={`${screenName == 'OffersList' ? 'text-orange-600' : 'text-white'}  `} style={{  fontFamily: 'OpenSans_400Regular' }}>Search</Text>

      </TouchableOpacity>

      <View className={`absolute ${Platform.ios == 'android' ? 'left-[50%]' : ' right-[46%]'} -top-5 `}>
        <TouchableOpacity
          className={`bg-[#FF4800] p-2 rounded-full ${Platform.OS == 'android' && '-mx-2'} `}

        >
          <PlusIcon />

        </TouchableOpacity>

      </View>

      <TouchableOpacity className="w-[20%] flex-col items-center ml-8"

        onPress={() => {
          dispatch(setScreenName('OffersList'))
          navigation.navigate('OffersList')
        }}

      >

        <View
          className=" mb-1  "

        >
          <OfferListIcon color={screenName == 'OffersList' ? 'orange' : 'white'}/>

        </View>

        <Text className={`${screenName == 'OffersList' ? 'text-orange-600' : 'text-white'}  `} style={{  fontFamily: 'OpenSans_400Regular' }}>Offer List</Text>

      </TouchableOpacity>

      <TouchableOpacity className="w-[20%] flex-col items-center "

        onPress={() => {
          dispatch(setScreenName('ProfileScreen'))
          navigation.navigate('ProfileScreen')
        }}
      >

        <View
          className=" mb-1  "

        >
          <ProfileIcon  color={screenName == 'ProfileScreen' ? 'orange' : 'white'}/>

        </View>

        <Text className={`${screenName == 'ProfileScreen' ? 'text-orange-600' : 'text-white'}  `} style={{  fontFamily: 'OpenSans_400Regular' }}>Profile</Text>

      </TouchableOpacity>

    </View>

  );
}
