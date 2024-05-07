import { View, Text, TouchableOpacity, Platform, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import { useEffect, useState } from 'react'

import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../globalStates/dataSlice';
import { GET_CITY_BY_PINCODE_ROUTE, INSERT_LEAD_ROUTE } from '../utils/apiRoutes';
import axios from 'axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function PlFormOne({ navigation }) {
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.data.formData);
    const [selectedMaritalStatus, setSelectedMaritalStatus] = useState(1);
    const [error, setError] = useState({})
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);



    const dismissKeyboard = () => {
        Keyboard.dismiss(); // Function to dismiss the keyboard

    };

    const handleChange = (field, value) => {

        let errorMessage = '';

        switch (field) {
            case 'FirstName':
                errorMessage = !value ? 'FirstName is required' : '';
                break;
            case 'LastName':

                errorMessage = !value ? 'LastName is required' : '';
                break;
            case 'Dob':
                errorMessage = !value ? 'Dob is required' : '';
                break;

            case 'CurrentPincode':
                errorMessage = !value ? 'PAN card number is required' : (!isValidPincode(value) ? 'Enter a valid Pincode number' : '');
                break;


            case 'CurrentAddress':
                errorMessage = !value ? 'CurrentAddress is required' : '';
                break;

            case 'CurrentAddress2':
                errorMessage = !value ? 'Area is required' : '';
                break;

            case 'Landmark':
                errorMessage = !value ? 'Landmark is required' : '';
                break;

            case 'CurrentCity':
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
            MaritalStatus: selectedMaritalStatus,

        }));

    }, [selectedMaritalStatus])


    useEffect(() => {

        if (formData.CurrentPincode && formData.CurrentPincode.toString().length === 6) {
            axios.post(GET_CITY_BY_PINCODE_ROUTE, { pincode: formData.CurrentPincode }).then((res) => {
                console.log(res.data);

                console.log(res.data.city)

                if (res.data) {
                    dispatch(setFormData({
                        ...formData,
                        CurrentCity: res.data.city,
                    }));
                }
            }).catch((error) => {
                console.log("Error fetching city by pincode:", error);
            });
        }

    }, [formData.CurrentPincode]);


    function handelNext() {

        // Check if all fields are valid
        const isFirstNameValid = !!formData.FirstName;
        const isLastNameValid = !!formData.LastName;
        const isPincodeValid = !!formData.CurrentPincode && isValidPincode(formData.CurrentPincode);
        const isDobValid = !!formData.Dob;
        const isCurrentAddressValid = !!formData.CurrentAddress;
        const isCurrentAddress2Valid = !!formData.CurrentAddress2;
        const isLandmarkValid = !!formData.Landmark;
        const isCityValid = !!formData.CurrentCity;

        if (!isFirstNameValid || !isLastNameValid || !isPincodeValid || !isDobValid || !isCurrentAddressValid || !isCurrentAddress2Valid || !isLandmarkValid || !isCityValid) {
            // Display error messages for invalid fields
            setError(
                {
                    FirstNameError: !isFirstNameValid ? 'First Name is required ' : '',
                    LastNameError: !isLastNameValid ? 'Last Name is required' : '',
                    CurrentPincodeError: !isPincodeValid ? 'Enter a valid Pincode ' : '',
                    DobError: !isDobValid ? 'Dob is required' : '',
                    CurrentAddressError: !isCurrentAddressValid ? 'Address is required' : '',
                    CurrentAddress2Error: !isCurrentAddress2Valid ? 'Area is required' : '',
                    LandmarkError: !isLandmarkValid ? 'Landmark is required' : '',
                    CurrentCityError: !isCityValid ? 'City is required' : '',
                }
            )
            return; // Stop execution if any field is invalid
        }

        axios.post(INSERT_LEAD_ROUTE, formData).then((res) => {

            console.log(res.data.leadId)

            if (res.data.leadId) {

                navigation.navigate('PlFormThree')
            }

        }).catch((error) => {

            if (error.response && error.response.data && error.response.data.error) {
                console.log("Error:", error.response.data.error);
            } else {
                console.log("Unknown Error");
            }

        })

    }

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

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {

        dispatch(setFormData({
            ...formData,
            Dob: extractDate(date)
        }))
        hideDatePicker();
    };



    function separateDateAndTime(dateTimeString) {
        const dateObj = new Date(dateTimeString);


        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[dateObj.getMonth()];
        const date = dateObj.getDate();
        const year = dateObj.getFullYear();


        const formattedDate = `${month}, ${date}, ${year}`;


        return formattedDate
    }

    function extractDate(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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


                        <View className="p-5 h-full m-auto flex-col mt-5">

                            <Image className="h-32 w-32" source={require('../../assets/appIcon.png')} />

                            <View className="flex-row  items-center mb-5 ">

                                <View>
                                    <Image className="w-6 h-6" source={require('../../assets/forms/dots.png')} />
                                </View>

                                <Text className="text-xl px-5 font-bold text-blue-900">
                                    Enter Your Details
                                </Text>

                            </View>

                            <View

                            >

                                <View className=" flex-row gap-2">

                                    <View className="w-[47%]">

                                        <TextInput
                                            style={{ fontSize: 12, backgroundColor: 'white' }}
                                            mode='flat'
                                            label="First Name"
                                            onChangeText={text => handleChange('FirstName', text)}
                                        />

                                        {error.FirstNameError && <Text className="text-red-500 text-[10px] m-1">
                                            {error.FirstNameError}
                                        </Text>}

                                    </View>


                                    <View className="w-[47%]">

                                        <TextInput
                                            style={{ fontSize: 12, backgroundColor: 'white' }}
                                            mode='flat'
                                            label="Last name"
                                            onChangeText={text => handleChange('LastName', text)}
                                        />

                                        {error.LastNameError && <Text className="text-red-500 text-[10px] m-1">
                                            {error.LastNameError}
                                        </Text>}

                                    </View>

                                </View>


                                <View className=" flex-row gap-2" >



                                    <TouchableOpacity className="py-5 px-3 rounded-lg  border-b-[0.5px] border-gray-400 w-[47%]" onPress={showDatePicker}>



                                        <DateTimePickerModal
                                            isVisible={isDatePickerVisible}
                                            mode="date"
                                            onConfirm={handleConfirm}
                                            onCancel={hideDatePicker}
                                        />
                                        {!isDatePickerVisible && <Text className="text-[12px] text-gray-600"> {formData && formData.Dob ? separateDateAndTime(formData.Dob) : 'Select Date'}</Text>}


                                    </TouchableOpacity>





                                    <View className="w-[47%]">

                                        <TextInput
                                            style={{ fontSize: 12, backgroundColor: 'white' }}
                                            mode='flat'
                                            label="Current Pincode"
                                            onChangeText={text => handleChange('CurrentPincode', text)}

                                        />

                                        {error.CurrentPincodeError && <Text className="text-red-500 text-[10px] m-1">
                                            {error.CurrentPincodeError}
                                        </Text>}

                                    </View>

                                </View>

                                <View className="">


                                    <TextInput
                                        style={{ fontSize: 12, backgroundColor: 'white' }}
                                        mode='flat'
                                        label="House / Flat NO."
                                        onChangeText={text => handleChange('CurrentAddress', text)}
                                    />

                                    {error.CurrentAddressError && <Text className="text-red-500 text-[10px] m-1">
                                        {error.CurrentAddressError}
                                    </Text>}


                                </View>





                                <View className="">

                                    <TextInput

                                        style={{ fontSize: 12, backgroundColor: 'white' }}
                                        mode='flat'
                                        label="Street Address / Area "
                                        onChangeText={text => handleChange('CurrentAddress2', text)}
                                    />

                                    {error.CurrentAddress2Error && <Text className="text-red-500 text-[10px] m-1">
                                        {error.CurrentAddress2Error}
                                    </Text>}

                                </View>

                                <View className="">

                                    <TextInput

                                        style={{ fontSize: 12, backgroundColor: 'white' }}
                                        mode='flat'
                                        label="Landmark"
                                        onChangeText={text => handleChange('Landmark', text)}
                                    />

                                    {error.LandmarkError && <Text className="text-red-500 text-[10px] m-1">
                                        {error.LandmarkError}
                                    </Text>}

                                </View>


                                <View className="mb-5">


                                    <TextInput
                                        style={{ fontSize: 12, backgroundColor: 'white' }}
                                        mode='flat'
                                        label="City"
                                        value={formData.CurrentCity}
                                        onChangeText={text => handleChange('CurrentCity', text)}
                                    />

                                    {error.CurrentCityError && <Text className="text-red-500 text-[10px] m-1">
                                        {error.CurrentCityError}
                                    </Text>}

                                </View>


                                <View className="mb-5">
                                    <Text className="text-lg font-bold text-gray-500 mb-3">
                                        Select Marital Status
                                    </Text>

                                    <View className="flex-row  items-center flex-wrap gap-2">
                                        <TouchableOpacity className={`rounded-3xl ${selectedMaritalStatus == 1 ? 'py-1' : 'py-2'}  px-3 border-[1px] border-gray-300 w-[30%] `} onPress={() => setSelectedMaritalStatus(1)}>
                                            <View className="flex-row justify-between items-center gap-x-1">
                                                <Text>
                                                    Single
                                                </Text>

                                                <View className={`rounded-full ${selectedMaritalStatus == 1 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                    {selectedMaritalStatus == 1 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity className={`rounded-3xl ${selectedMaritalStatus == 2 ? 'py-1' : 'py-2'}  px-3 border-[1px] border-gray-300 w-[30%] `} onPress={() => setSelectedMaritalStatus(2)}>
                                            <View className="flex-row justify-between items-center gap-x-1">
                                                <Text>
                                                    Married
                                                </Text>

                                                <View className={`rounded-full ${selectedMaritalStatus == 2 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                    {selectedMaritalStatus == 2 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
                                                </View>

                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity className={`rounded-3xl ${selectedMaritalStatus == 3 ? 'py-1' : 'py-2'}  px-3 border-[1px] border-gray-300 w-[30%] `} onPress={() => setSelectedMaritalStatus(3)}>
                                            <View className="flex-row justify-between items-center gap-x-1">
                                                <Text>
                                                    Widow
                                                </Text>

                                                <View className={`rounded-full ${selectedMaritalStatus == 3 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                    {selectedMaritalStatus == 3 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity className={`rounded-3xl ${selectedMaritalStatus == 4 ? 'py-1' : 'py-2'}  px-3 border-[1px] border-gray-300 w-[30%] `} onPress={() => setSelectedMaritalStatus(4)}>
                                            <View className="flex-row justify-between items-center gap-x-1">
                                                <Text>
                                                    Divorced
                                                </Text>

                                                <View className={`rounded-full ${selectedMaritalStatus == 4 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                    {selectedMaritalStatus == 4 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
                                                </View>
                                            </View>
                                        </TouchableOpacity>


                                        <TouchableOpacity className={`rounded-3xl ${selectedMaritalStatus == 5 ? 'py-1' : 'py-2'}  px-3 border-[1px] border-gray-300 w-[30%] `} onPress={() => setSelectedMaritalStatus(5)}>
                                            <View className="flex-row justify-between items-center gap-x-1">
                                                <Text>
                                                    Sperated
                                                </Text>

                                                <View className={`rounded-full ${selectedMaritalStatus == 5 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                    {selectedMaritalStatus == 5 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
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

                <TouchableOpacity className={`bg-orange-600  px-6 py-2 rounded-xl w-[60%]  ${Platform.OS == 'ios' && 'mb-5'}`} onPress={() => navigation.navigate('PlFormOne')}>
                    <Text className="text-white text-center text-lg font-bold">
                        Previous
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity className={`bg-orange-600  px-6 py-2 rounded-xl w-[60%] ${Platform.OS == 'ios' && 'mb-5'}`} onPress={handelNext}>
                    <Text className="text-white text-center text-lg font-bold">
                        Next
                    </Text>
                </TouchableOpacity>
            </View>}
        </>


    )
}


