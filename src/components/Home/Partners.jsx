import { View, Text, TouchableOpacity, Image, Platform } from 'react-native'
import React from 'react'


export default function Partners({navigation}) {
    // Define an array of offerings
    const offerings = [
        { icon: <Image className="h-[75px] w-[75px]" source={require('../../../assets/Home/partner/Rectangle 463.png')} />  },
        { icon: <Image className="h-[75px] w-[75px]" source={require('../../../assets/Home/partner/Rectangle 464.png')} />  },
        { icon:  <Image className="h-[75px] w-[75px]" source={require('../../../assets/Home/partner/Rectangle 465.png')} />  },
        { icon: <Image className="h-[75px] w-[75px]" source={require('../../../assets/Home/partner/Rectangle 466.png')} />  },
        { icon: <Image className="h-[75px] w-[75px]" source={require('../../../assets/Home/partner/Rectangle 467.png')} />  },
        { icon: <Image className="h-[75px] w-[75px]" source={require('../../../assets/Home/partner/Rectangle 468.png')} />  },
        { icon:  <Image className="h-[75px] w-[75px]" source={require('../../../assets/Home/partner/Rectangle 469.png')} />  },
        { icon: <Image className="h-[75px] w-[75px]" source={require('../../../assets/Home/partner/Rectangle 470.png')} />  },
    ];

    return (

        <View className="bg-[#EAECFA] rounded-xl px-2 py-3">

            <Text className="text-lg font-bold mb-3 text-[#7D83AA] px-3">Top Partners</Text>

            <View className={`flex-row flex-wrap  justify-center items-center gap-2 ${Platform.OS == 'android' ? '' : ''} `} >
                {offerings.map((offering, index) => (
                     <TouchableOpacity key={index} className="rounded-lg bg-white border-2 border-gray-300 w-[22%] " 
                    //  onPress={()=>navigation.navigate('Partners')}
                     >

                     <View className="">
                      {offering.icon}

                     </View>


                    </TouchableOpacity>
                ))}
            </View>

        </View>
    )
}
