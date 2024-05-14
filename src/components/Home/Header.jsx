import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Platform } from 'react-native';
import { MenuIcon } from '../../../assets/Header';
import { useNavigation } from '@react-navigation/native';
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

export default function Header({ title }) {
    const navigation = useNavigation();

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

        <View style={[styles.container, Platform.OS === 'ios' && styles.containerIOS]}>
            {/* Logo with names on the left */}
            <TouchableOpacity style={styles.logoContainer} className="">
                <Image style={styles.logo} source={require('../../../assets/Home/logo3.png')} />
                <View style={styles.logoTextContainer}>
                    <Text className="font-bold text-blue-500" style={[styles.logoText,]}>CREDIT</Text>
                    <Text className="font-bold" style={[styles.logoText, { color: '#FF9800' }]}>CIRCLE</Text>
                </View>
            </TouchableOpacity>

            {/* Centered title */}
            <Text style={styles.title} >{title}</Text>

            {/* Menu icon on the right */}
            <TouchableOpacity style={styles.menuIconContainer} onPress={() => navigation.openDrawer()}>
                <View onPress={() => navigation.openDrawer()}>

                    <Image className="h-4 w-4" source={require('../../../assets/header/sidebarIcon.png')} />
                </View>
            </TouchableOpacity>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50, // Default height
        backgroundColor: '#222C7A',
        paddingHorizontal: 20,
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: 0,
        zIndex: 999,
    },
    containerIOS: {
        alignItems: 'flex-end',
        height: 100,
        top: 0,
        paddingBottom: 10
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        height: 42,
        width: 42,
        marginRight: 2,
        marginTop: 10
    },
    logoTextContainer: {
        flexDirection: 'column',
    },
    logoText: {
        fontSize: 10,
        marginTop: 2
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        width: '50%', // Adjust width as needed
        fontFamily: 'OpenSans_400Regular'
    },
    menuIconContainer: {
        width: '20%',
        alignItems: 'flex-end',
    },
    menuIcon: {
        height: 24,
        width: 24,
    },
});