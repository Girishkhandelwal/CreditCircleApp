// SplashScreen.jsx
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const SplashScreen = () => {
    return (
        
        <View style={styles.container}>
            {/* Your splash screen image */}
            <Image className="absolute  -top-8 -z-10" source={require('../../../assets/forms/Ellipse 237.png')} />
            <Image className="absolute  -top-8" source={require('../../../assets/forms/Ellipse 236.png')} />
            <Image className="absolute  -top-8 right-20 -z-10" source={require('../../../assets/forms/Ellipse 235.png')} />
            <Image className="absolute  -top-8 right-24 -z-10" source={require('../../../assets/forms/Ellipse 234.png')} />
            <Image className="absolute  top-0 -right-24 -z-10" source={require('../../../assets/forms/Ellipse 231.png')} />

            <Image
                className="h-32 w-32"
                source={require('../../../assets/splash.png')}
                style={styles.image}
            />

            <View style={{ position: 'absolute', left: '35%', right: 0, bottom: 20 }}>
                <Text className="underline decoration-orange-600" >
                    www.creditCircle.in
                </Text>
            </View>


            <Image className="absolute  bottom-0 right-0 " source={require('../../../assets/splash/Ellipse 238.png')} />
            <Image className="absolute  bottom-0 right-0 -z-10" source={require('../../../assets/splash/Ellipse 239.png')} />
            <Image className="absolute  bottom-0 left-0  -z-10" source={require('../../../assets/splash/Ellipse 240.png')} />
            <Image className="absolute  bottom-0 left-0 -z-10" source={require('../../../assets/splash/Ellipse 241.png')} />
            <Image className="absolute  bottom-0  -z-10" source={require('../../../assets/splash/Ellipse 242.png')} />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // Set the background color to match your splash screen image
    },
    image: {
        resizeMode: 'contain',
        width: '100%', // Adjust the width as needed
    },
});

export default SplashScreen;
