import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { HomeIcon, OfferListIcon, PlusIcon, ProfileIcon, SearchIcon } from '../../../assets/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setScreenName } from '../../globalStates/dataSlice';


export default function Footer() {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const screenName = useSelector((state)=> state.data.screenName)


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
          <HomeIcon />

        </View>

        <Text className={`${screenName == 'Home' ? 'text-orange-600' : 'text-gray-500'} `}>Home</Text>

      </TouchableOpacity>

      <TouchableOpacity className="w-[23%] flex-col items-center mr-5" onPress={() => {
        // dispatch(setScreenName('Home'))
        // navigation.navigate('Home')
      }}>

        <View
          className="mb-1"

        >
          <SearchIcon />

        </View>

        <Text className={`${screenName == 'Search' ? 'text-orange-600' : 'text-gray-500'} `}>Search</Text>

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
          <OfferListIcon />

        </View>

        <Text className={`${screenName == 'OffersList' ? 'text-orange-600' : 'text-gray-500'} `}>Offer List</Text>

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
          <ProfileIcon />

        </View>

        <Text className={`${screenName == 'ProfileScreen' ? 'text-orange-600' : 'text-gray-500'} `}>Profile</Text>

      </TouchableOpacity>


    </View>

  );
}
