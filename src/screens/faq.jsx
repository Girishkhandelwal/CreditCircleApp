import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { List, Text } from 'react-native-paper';
import Header from '../components/Home/Header';
import Footer from '../components/common/Footer';
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

export default function Faq() {
    const [expanded, setExpanded] = useState(1);

    const handlePress = (a) => setExpanded(a);


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
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title={'Faq'} />

            <View className=" bg-white px-4">

                <List.Section  >
                    
                    <List.Accordion
                        title="How can I apply for a personal loan?"
                        expanded={expanded == 1}
                        onPress={() => handlePress(1)}
                        className="bg-white"
                    >
                        <View className="p-4 bg-orange-600 rounded-lg">

                            <Text className="text-white" style={{ lineHeight: 20, fontFamily: 'OpenSans_400Regular' }}>
                                Visit our website and navigate to the Personal Loans section to explore our loan options and find the one that suits your needs.
                                If you have any further questions or need assistance during the application process, feel free to contact our team.
                            </Text>

                        </View>
                    </List.Accordion>

                    <List.Accordion
                        title="How to check personal loan eligibility criteria?"
                        expanded={expanded == 2}
                        onPress={() => handlePress(2)}
                        className="bg-white"
                    >
                        <View className="p-4 bg-orange-600 rounded-lg">

                            <Text className="text-white" style={{ lineHeight: 20, fontFamily: 'OpenSans_400Regular' }}>
                                To check the eligibility criteria for a personal loan, you can visit the following link:
                            </Text>

                        </View>
                    </List.Accordion>

                    <List.Accordion
                        title="What is the interest rate and repayment terms on personal loans?"
                        expanded={expanded == 3}
                        onPress={() => handlePress(3)}
                        className="bg-white"
                    >
                        <View className="p-4 bg-orange-600 rounded-lg">

                            <Text className="text-white" style={{ lineHeight: 20, fontFamily: 'OpenSans_400Regular' }}>
                                Use our online loan calculator to estimate the loan amount, interest rates, and repayment terms. This tool will give you a clear understanding of your approximate monthly payments.
                            </Text>

                        </View>
                    </List.Accordion>


                </List.Section>

            </View>
            <Footer />
        </View>
    );
}
