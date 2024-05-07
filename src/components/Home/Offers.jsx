import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setFormData, setScreenName } from '../../globalStates/dataSlice';

export default function Offers({ navigation }) {
    // Define an array of offerings
    const offerings = [
        { title: 'Personal Loans', screen: 'PlFormOne', icon: <Image className="h-8 w-8" source={require('../../../assets/Home/offer/img (3).png')} /> },
        { title: 'Credit Card', screen: 'PlFormOne', icon: <Image className="h-8 w-8" source={require('../../../assets/Home/offer/img (1).png')} /> },
        { title: 'Business Loan', screen: 'PlFormOne', icon: <Image className="h-8 w-8" source={require('../../../assets/Home/offer/img (2).png')} /> },
        { title: 'Income Plan', screen: 'PlFormOne', icon: <Image className="h-8 w-8" source={require('../../../assets/Home/offer/img (4).png')} /> },
        { title: 'Gold Loan', screen: 'PlFormOne', icon: <Image className="h-8 w-8" source={require('../../../assets/Home/offer/img (6).png')} /> },
        { title: 'Emi Calculator', screen: 'EMICalculator', icon: <Image className="h-10 w-8" source={require('../../../assets/Home/offer/img (8).png')} /> },
    ];

    const dispatch = useDispatch()

    function offer(screen) {

        dispatch(setFormData({}))
        dispatch(setScreenName(screen))
        navigation.navigate(screen)

    }

    
    return (
        <>

            <View className="p-3 mb-[5%]">

                <View className="flex-row  flex-wrap gap-2 justify-between">

                    {offerings.map((offering, index) => (
                        <React.Fragment key={index}>

                            <TouchableOpacity className="rounded-lg  bg-white flex-col justify-center items-center space-y-3 p-3 w-[32%]"
                                onPress={() => offer(offering.screen)}
                            >

                                {offering.icon}

                                <Text className="font-bold text-[11px]">
                                    {offering.title}
                                </Text>


                            </TouchableOpacity>


                        </React.Fragment>

                    ))}

                    <Image className="absolute top-[44%]" source={require('../../../.../../assets/Home/offer/Line.png')} />
                    <Image className="absolute left-[32%] h-[100%] top-0" source={require('../../../.../../assets/Home/offer/Line2.png')} />
                    <Image className="absolute right-[32%] h-[100%] top-0" source={require('../../../.../../assets/Home/offer/Line2.png')} />

                </View>

            </View>

        </>
    )
}
