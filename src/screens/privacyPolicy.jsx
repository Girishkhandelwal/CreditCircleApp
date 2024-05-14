import { View, Text } from 'react-native'
import React from 'react'
import Header from '../components/Home/Header'
import Footer from '../components/common/Footer'
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

export default function PrivacyPolicy() {

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
        <View className="h-screen ">
            <Header title={'Privacy Policy'} />
            <View className="p-5 space-y-5">
                <Text className="text-[13px]" style={{lineHeight: 20, fontFamily: 'OpenSans_400Regular'}}>
                    1. Terms and conditions for services These Terms and Conditions govern your use of the Services (including the App and your Account) and are applicable to your use of the App and Services for every Transaction. This is not an agreement between you and any Transaction Entity or Facilities Operator, this is an agreement between you, even if you access certain parts of the Services through a third- party website or app. Our Services are not intended for people under 16. If you become aware that a child is using our Services, please contact the relevant Data Protection Officer listed in Section 15 of the Privacy Policy, and we will take steps to remove and terminate the account as necessary.
                </Text>

                <View>

                    <Text className="text-lg mb-2" style={{fontFamily: 'OpenSans_700Bold'}}>
                        What Personal Information About creditcircle?
                    </Text>

                    <Text className="text-[13px]" style={{lineHeight: 20, fontFamily: 'OpenSans_400Regular'}}>
                        In this agreement, the following terms have the meanings indicated below:
                        Account - The  service account opened by you in the App, on the Site or by calling our Customer Support Centers.
                        ANPR - The automatic number plate recognition feature which (1) identifies an opted-in vehicle, prior to payment, as authorized to park at the participating parking facilities and allows access to the parking facilities without having to perform any action normally required to remove a barrier to entry and (2) automatically records the time of entry and exit from the participating parking facility, calculates the length of stay and the cost of the Parking Session for the purposes of initiating payment.
                    </Text>

                </View>

            </View>
            <Footer />
        </View>
    )
}