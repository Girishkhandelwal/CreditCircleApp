import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { MenuIcon } from '../../../assets/Header';
import { useNavigation } from '@react-navigation/native';

export default function Header({ title }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container} className="pb-2 ">
            {/* Logo with names on the left */}
            <TouchableOpacity style={styles.logoContainer} className="aboslute top-2">
                <Image style={styles.logo} source={require('../../../assets/Home/logo3.png')} />
                <View style={styles.logoTextContainer}>
                    <Text className="font-bold text-blue-500" style={[styles.logoText, ]}>CREDIT</Text>
                    <Text className="font-bold" style={[styles.logoText, { color: '#FF9800' }]}>CIRCLE</Text>
                </View>
            </TouchableOpacity>

            {/* Centered title */}
            <Text style={styles.title}>{title}</Text>

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
        alignItems: 'flex-end',
        height: 100, // Adjust height as needed
        backgroundColor: '#222C7A',
        paddingHorizontal: 20,
        // paddingTop: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 100,
        
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
        marginTop: '2px'
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        width: '50%', // Adjust width as needed
    },
    menuIconContainer: {
        width: '20%',
        alignItems: 'flex-end',
    },
});
