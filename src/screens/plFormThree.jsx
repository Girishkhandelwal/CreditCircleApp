import { View, Text, TouchableOpacity, Platform, Image, TouchableWithoutFeedback, Keyboard, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { useEffect, useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'

import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../globalStates/dataSlice';
import axios from 'axios';
import { GET_CITY_BY_PINCODE_ROUTE, INSERT_LEAD_ROUTE } from '../utils/apiRoutes';

import {
    useFonts,
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

export default function PlFormOne({ navigation }) {
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.data.formData);
    const [slectedBusinessOwership, setSelectedBusinessOwership] = useState(1);
    const [error, setError] = useState({})


    const dismissKeyboard = () => {
        Keyboard.dismiss(); // Function to dismiss the keyboard

    };

    useEffect(() => {
        
        if (formData.CompanyPincode && formData.CompanyPincode.toString().length === 6) {
            axios.post(GET_CITY_BY_PINCODE_ROUTE, { pincode: formData.CompanyPincode }).then((res) => {
                console.log(res.data);

                console.log(res.data.city)

                if (res.data) {
                    dispatch(setFormData({
                        ...formData,
                        CompanyCity: res.data.city,
                    }));
                }
            }).catch((error) => {
                console.log("Error fetching city by pincode:", error);
            });
        }

    }, [formData.CompanyPincode]);


    const handleChange = (field, value) => {

        let errorMessage = '';

        switch (field) {
            case 'CompanyName':
                errorMessage = !value ? 'Business Name is required' : '';
                break;
            case 'CompanyType':

                errorMessage = !value ? 'CompanyType is required' : '';
                break;
            case 'Gst':
                errorMessage = !value ? 'Gst is required' : (!isValidGstNumber(value) ? 'Enter a valid Gst number' : '');
                break;

            case 'CompanyTurnover':
                errorMessage = !value ? 'Business Turnover is required' : '';
                break;


            case 'CompanyPincode':
                errorMessage = !value ? 'Pincode is required' : (!isValidPincode(value) ? 'Enter a valid Pincode number' : '');
                break;

            case 'BusinessAgeInYears':
                errorMessage = !value ? 'Business Age In Years is required' : '';
                break;

            case 'CompanyAddress':
                errorMessage = !value ? 'Business Address is required' : '';
                break;

            case 'CompanyCity':
                errorMessage = !value ? 'City is required' : '';
                break;
            default:
                break;
        }


        dispatch(setFormData({
            ...formData,
            [field]: value
        }));


        setError({ [`${field}Error`]: errorMessage })
    };

    useEffect(() => {


        dispatch(setFormData({
            ...formData,
            BusinessOwnership: slectedBusinessOwership,

        }));

    }, [slectedBusinessOwership])

    console.log(formData)

    function handelSubmit() {

       
        // Check if all fields are valid
        const isCompanyNameValid = !!formData.CompanyName;
        const isCompanyTypeValid = !!formData.CompanyType;
        const isGstValid = !!formData.Gst && isValidGstNumber(formData.Gst);
        const isCompanyTurnoverValid = !!formData.CompanyTurnover;
        const isCompanyPincodeValid = !!formData.CompanyPincode && isValidPincode(formData.CompanyPincode);;
        const isBusinessAgeInYears2Valid = !!formData.BusinessAgeInYears;
        const isCompanyAddressValid = !!formData.CompanyAddress;
        const isCompanyCityValid = !!formData.CompanyCity;

        if (!isCompanyNameValid || !isCompanyTypeValid || !isGstValid || !isCompanyTurnoverValid || !isCompanyPincodeValid || !isBusinessAgeInYears2Valid || !isCompanyAddressValid || !isCompanyCityValid) {
            // Display error messages for invalid fields

            setError(
                {
                    CompanyNameError: !isCompanyNameValid ? 'Business Name Name is required ' : '',
                    CompanyTypeError: !isCompanyTypeValid ? 'Business Type  is required' : '',
                    GstError: !isGstValid ? 'Enter a valid Gst Number ' : '',
                    CompanyTurnoverError: !isCompanyTurnoverValid ? 'Business Turnover is required' : '',
                    CompanyPincodeError: !isCompanyPincodeValid ? 'Pincode is required' : '',
                    BusinessAgeInYearsError: !isBusinessAgeInYears2Valid ? 'Business Age In Years is required' : '',
                    CompanyAddressError: !isCompanyAddressValid ? 'Business Address is required' : '',
                    CompanyCityError: !isCompanyCityValid ? 'City is required' : '',
                }
            )
            return; // Stop execution if any field is invalid
        }

       

        axios.post(INSERT_LEAD_ROUTE, formData).then((res) => {

            console.log(res.data.leadId)

            if (res.data.leadId) {

                dispatch(setFormData({}))

                navigation.navigate('Thankyou')
            }

        }).catch((error) => {

            if (error.response && error.response.data && error.response.data.error) {
                console.log("Error:", error.response.data.error);
            } else {
                console.log("Unknown Error");
            }

        })


    }

    const emojisWithIcons = [
        { title: 'Proprietorship', value: 1 },
        { title: 'Partnership', value: 2 },
        { title: 'Private Limited Company', value: 3 },
        { title: 'LLP', value: 4 },

    ];

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardStatus(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardStatus(false);
            }
        );

        // Clean up listeners
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const isValidPincode = (pincode) => {
        // Regular expression for pincode validation (assuming 6 digit pincode)
        const pincodeRegex = /^[1-9][0-9]{5}$/;
        return pincodeRegex.test(pincode);
    };

    const isValidGstNumber = (gstNumber) => {
        // Regular expression for GST number validation
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
        return gstRegex.test(gstNumber);
    };


    let [fontsLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_100Thin_Italic,
        Poppins_200ExtraLight,
        Poppins_200ExtraLight_Italic,
        Poppins_300Light,
        Poppins_300Light_Italic,
        Poppins_400Regular,
        Poppins_400Regular_Italic,
        Poppins_500Medium,
        Poppins_500Medium_Italic,
        Poppins_600SemiBold,
        Poppins_600SemiBold_Italic,
        Poppins_700Bold,
        Poppins_700Bold_Italic,
        Poppins_800ExtraBold,
        Poppins_800ExtraBold_Italic,
        Poppins_900Black,
        Poppins_900Black_Italic,
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }


    return (

        <>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>

                <KeyboardAvoidingView className="h-screen bg-white" style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                    <View
                        className="">

                        {!keyboardStatus && <View>


                            <Image className="absolute  -top-20 -z-10" source={require('../../assets/forms/Ellipse 237.png')} />
                            <Image className="absolute  -top-20" source={require('../../assets/forms/Ellipse 236.png')} />
                            <Image className="absolute  -top-20 right-20 -z-10" source={require('../../assets/forms/Ellipse 235.png')} />
                            <Image className="absolute  -top-20 right-24 -z-10" source={require('../../assets/forms/Ellipse 234.png')} />
                            <Image className="absolute  -top-10 -right-24 -z-10" source={require('../../assets/forms/Ellipse 231.png')} />

                        </View>}


                        <View className="h-full m-auto flex-col mt-5 p-5">

                        <Image className="h-32 w-32" source={require('../../assets/appIcon.png')} />

                            <View className="flex-row  items-center  ">

                                <View>
                                    <Image className="w-6 h-6" source={require('../../assets/forms/dots.png')} />
                                </View>

                                <Text className="text-xl px-5 text-blue-900" style={{ fontFamily: 'Poppins_400Regular' }}>
                                    Enter Business Detail
                                </Text>

                            </View>

                            <View

                            >
                                <View className="">

                                    <TextInput
                                        className="p-0"
                                        style={{ fontSize: 12, backgroundColor: 'white' }}
                                        mode='flat'
                                        label="Business Name"
                                        onChangeText={text => handleChange('CompanyName', text)}
                                    />

                                    {error.CompanyNameError && <Text className="text-red-500 text-[10px] m-1">
                                        {error.CompanyNameError}
                                    </Text>}


                                </View>

                                <View className="">

                                    <SelectDropdown
                                        data={emojisWithIcons}
                                        onSelect={(selectedItem, index) => {

                                            handleChange('CompanyType', selectedItem.value)
                                        }}
                                        renderButton={(selectedItem, isOpened) => {
                                            return (
                                                <View style={styles.dropdownButtonStyle}>

                                                    <Text style={styles.dropdownButtonTxtStyle}>
                                                        {(selectedItem && selectedItem.title) || 'Select Business Type'}
                                                    </Text>

                                                </View>
                                            );
                                        }}
                                        renderItem={(item, index, isSelected) => {
                                            return (
                                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>

                                                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                                </View>
                                            );
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        dropdownStyle={styles.dropdownMenuStyle}
                                    />

                                    {error.CompanyTypeError && <Text className="text-red-500 text-[10px] m-1">
                                        {error.CompanyTypeError}
                                    </Text>}

                                </View>

                                <View className="">

                                    <TextInput

                                        style={{ fontSize: 12, backgroundColor: 'white' }}
                                        mode='flat'
                                        label="GST No."
                                        onChangeText={text => handleChange('Gst', text)}
                                    />

                                    {error.GstError && <Text className="text-red-500 text-[10px] m-1">
                                        {error.GstError}
                                    </Text>}

                                </View>


                                <View className=" flex-row gap-2">

                                    <View className="w-[47%]">

                                        <TextInput
                                            style={{ fontSize: 12, backgroundColor: 'white' }}
                                            mode='flat'
                                            label="Business Turnover"
                                            onChangeText={text => handleChange('CompanyTurnover', text)}
                                            keyboardType='numeric'
                                        />

                                        {error.CompanyTurnoverError && <Text className="text-red-500 text-[10px] m-1">
                                            {error.CompanyTurnoverError}
                                        </Text>}

                                    </View>

                                    <View className="w-[47%]">

                                        <TextInput
                                            style={{ fontSize: 12, backgroundColor: 'white' }}
                                            mode='flat'
                                            label="Pincode"
                                            onChangeText={text => handleChange('CompanyPincode', text)}
                                        />

                                        {error.CompanyPincodeError && <Text className="text-red-500 text-[10px] m-1">
                                            {error.CompanyPincodeError}
                                        </Text>}

                                    </View>

                                </View>


                                <View className="">


                                    <TextInput
                                        style={{ fontSize: 12, backgroundColor: 'white' }}
                                        mode='flat'
                                        label="How Old Is Your Business(in Yrs)"
                                        onChangeText={text => handleChange('BusinessAgeInYears', text)}
                                        keyboardType='numeric'
                                    />

                                    {error.BusinessAgeInYearsError && <Text className="text-red-500 text-[10px] m-1">
                                        {error.BusinessAgeInYearsError}
                                    </Text>}


                                </View>


                                <View className="">


                                    <TextInput
                                        style={{ fontSize: 12, backgroundColor: 'white' }}
                                        mode='flat'
                                        label="Business Address"
                                        onChangeText={text => handleChange('CompanyAddress', text)}
                                    />

                                    {error.CompanyAddressError && <Text className="text-red-500 text-[10px] m-1" >
                                        {error.CompanyAddressError}
                                    </Text>}


                                </View>


                                <View className="mb-3">
                                    <TextInput
                                        style={{ fontSize: 12, backgroundColor: 'white' }}
                                        mode='flat'
                                        label="City"
                                        value={formData.CompanyCity}
                                        onChangeText={text => handleChange('CompanyCity', text)}
                                    />

                                    {error.CompanyCityError && <Text className="text-red-500 text-[10px] m-1">
                                        {error.CompanyCityError}
                                    </Text>}

                                </View>


                                <View className="">
                                    <Text className="text-gray-500 mb-3" style={{ fontFamily: 'Poppins_700Bold' }}>
                                        Select Business Owenership
                                    </Text>

                                    <View className="flex-row  items-center flex-wrap gap-2">
                                        <TouchableOpacity className={`rounded-3xl ${slectedBusinessOwership == 1 ? 'py-1' : 'py-2'}  px-3 border-[1px] border-gray-300 w-[47%] `} onPress={() => setSelectedBusinessOwership(1)}>
                                            <View className="flex-row justify-between items-center ">
                                                <Text style={{ fontFamily: 'Poppins_400Regular' }}>
                                                    Owned
                                                </Text>

                                                <View className={`rounded-full ${slectedBusinessOwership == 1 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                    {slectedBusinessOwership == 1 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity className={`rounded-3xl ${slectedBusinessOwership == 2 ? 'py-1' : 'py-2'}  px-3 border-[1px] border-gray-300 w-[47%] `} onPress={() => setSelectedBusinessOwership(2)}>
                                            <View className="flex-row justify-between items-center ">
                                                <Text style={{ fontFamily: 'Poppins_400Regular' }}>
                                                    Rented
                                                </Text>

                                                <View className={`rounded-full ${slectedBusinessOwership == 2 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                    {slectedBusinessOwership == 2 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
                                                </View>

                                            </View>
                                        </TouchableOpacity>


                                    </View>

                                </View>


                            </View>

                        </View>


                    </View>

                </KeyboardAvoidingView>


            </TouchableWithoutFeedback>

            {!keyboardStatus && <View className=""
                style={{ position: 'absolute', gap: 2, left: 50, right: 50, bottom: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >

                <TouchableOpacity className={`bg-orange-600  px-6 py-2 rounded w-[60%]  ${Platform.OS == 'ios' && ''}`} onPress={() => navigation.navigate('PlFormTwo')}>
                    <Text className="text-white text-center text-lg " style={{ fontFamily: 'Poppins_400Regular' }}>
                        Previous
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity className={`bg-orange-600  px-6 py-2 rounded w-[60%] ${Platform.OS == 'ios' && ''}`} onPress={handelSubmit}>
                    <Text className="text-white text-center text-lg " style={{ fontFamily: 'Poppins_400Regular' }}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>}


        </>


    )
}


const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        borderStyle: 'solid',

    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 12,
        fontWeight: '500',
        color: 'gray',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});