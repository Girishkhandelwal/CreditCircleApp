import { View, Text, TouchableOpacity, Platform, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useState, useEffect } from 'react'
import { TextInput } from 'react-native-paper';
import { setFormData } from '../globalStates/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { INSERT_LEAD_ROUTE } from '../utils/apiRoutes';

export default function PlFormOne({ navigation }) {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.data.formData);
    const [selectedGender, setSelectedGender] = useState(1);
    const [selectedProfession, setSelectedProfession] = useState(1);
    const [error, setError] = useState({})
    const userDetails = useSelector((state) => state.data.userDetails)

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleChange = (field, value) => {

        let errorMessage = '';

        switch (field) {
            case 'LoanAmountRequired':
                errorMessage = !value ? 'Loan amount is required' : (parseInt(value) < 50000 ? 'Loan amount must be at least 50,000' : '');
                break;
            case 'Email':

                errorMessage = !value ? 'Email is required' : (!isValidEmail(value) ? 'Enter a valid email' : '');
                break;
            case 'Pancard':
                errorMessage = !value ? 'PAN card number is required' : (!isValidPAN(value) ? 'Enter a valid PAN card number' : '');
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
            Profession: selectedProfession,
            Gender: selectedGender,
            LoanType: 1,
            MobileNumber: userDetails.mobile
        }));



    }, [selectedGender, selectedProfession])


    function handelNext() {

        // Check if all fields are valid
        const isLoanAmountValid = !!formData.LoanAmountRequired && parseInt(formData.LoanAmountRequired) >= 50000;
        const isEmailValid = !!formData.Email && isValidEmail(formData.Email);
        const isPancardValid = !!formData.Pancard && isValidPAN(formData.Pancard);

        if (!isLoanAmountValid || !isEmailValid || !isPancardValid) {
            // Display error messages for invalid fields
            setError(
                {
                    LoanAmountRequiredError: !isLoanAmountValid ? 'Loan amount is required and must be at least 50,000' : '',
                    EmailError: !isEmailValid ? 'Enter a valid email' : '',
                    PancardError: !isPancardValid ? 'Enter a valid PAN card number' : ''
                }
            )
            return; // Stop execution if any field is invalid
        }

        axios.post(INSERT_LEAD_ROUTE, formData).then((res) => {

            console.log(res.data.leadId)

            if (res.data.leadId) {

                navigation.navigate('PlFormTwo')
            }

        }).catch((error) => {

            if (error.response && error.response.data && error.response.data.error) {
                console.log("Error:", error.response.data.error);
            } else {
                console.log("Unknown Error");
            }

        })
    }

    const isValidEmail = (email) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const isValidPAN = (pan) => {

        const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
        return panRegex.test(pan);
    };




    return (

        <>

            <TouchableWithoutFeedback onPress={dismissKeyboard}>

                <View
                    className="h-screen bg-white">

                    <View>
                        <Image className="absolute -top-24 right-10" source={require('../../assets/forms/Ellipse 237.png')} />
                        <Image className="absolute -top-20 left-0" source={require('../../assets/forms/Ellipse 236.png')} />
                        <Image className="absolute -top-36 right-0" source={require('../../assets/forms/Ellipse 235.png')} />
                        <Image className="absolute -top-32 left-10" source={require('../../assets/forms/Ellipse 234.png')} />
                        <Image className="absolute -top-20 left-24 -z-10" source={require('../../assets/forms/Ellipse 231.png')} />

                    </View>


                    <View className="p-5 mt-5">

                        <Image className="h-32 w-32" source={require('../../assets/appIcon.png')} />

                        <View className="flex-row  items-center mb-5 ">

                            <View>
                                <Image className="w-6 h-6" source={require('../../assets/forms/dots.png')} />
                            </View>

                            <Text className="text-xl px-5 font-bold text-blue-900">
                                Enter Your Loan Amount And Details
                            </Text>

                        </View>

                        <View

                        >
                            <View className=" ">

                                <TextInput
                                    style={{ fontSize: 12, backgroundColor: 'white' }}
                                    mode='flat'
                                    label="Enter Loan Amount"
                                    value={!formData.LoanAmountRequired ? '' : formData.LoanAmountRequired}
                                    onChangeText={text => handleChange('LoanAmountRequired', text)}
                                    keyboardType='numeric'

                                />

                                {error.LoanAmountRequiredError && <Text className="text-red-500 text-[10px] m-1">
                                    {error.LoanAmountRequiredError}
                                </Text>}

                            </View>

                            <View className="">

                                <TextInput

                                    style={{ fontSize: 12, backgroundColor: 'white' }}
                                    mode='flat'
                                    label="Email"
                                    onChangeText={text => handleChange('Email', text)}

                                />

                                {error.EmailError && <Text className="text-red-500 text-[10px] m-1">
                                    {error.EmailError}
                                </Text>}

                            </View>



                            <View className="mb-5">

                                <TextInput

                                    style={{ fontSize: 12, backgroundColor: 'white' }}
                                    mode='flat'
                                    label="Pan Card"
                                    onChangeText={text => handleChange('Pancard', text)}
                                />
                                {error.PancardError && <Text className="text-red-500 text-[10px] m-1">
                                    {error.PancardError}
                                </Text>}

                            </View>

                            <View className="mb-5">
                                <Text className="text-lg font-bold text-gray-500 mb-2">
                                    Select Gender
                                </Text>

                                <View className="flex-row justify-between items-center">
                                    <TouchableOpacity className={`rounded-3xl ${selectedGender == 1 ? 'py-1' : 'py-2'} px-3 border-[1px] border-gray-300 w-[32%]`} onPress={() => setSelectedGender(1)}>
                                        <View className="flex-row justify-between items-center">
                                            <Text>
                                                Male
                                            </Text>

                                            <View className={`rounded-full ${selectedGender == 1 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                {selectedGender == 1 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity className={`rounded-3xl ${selectedGender == 2 ? 'py-1' : 'py-2'} px-3 border-[1px] border-gray-300 w-[32%]`} onPress={() => setSelectedGender(2)}>
                                        <View className="flex-row justify-between items-center">
                                            <Text>
                                                Female
                                            </Text>

                                            <View className={`rounded-full ${selectedGender == 2 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                {selectedGender == 2 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
                                            </View>

                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity className={`rounded-3xl ${selectedGender == 3 ? 'py-1' : 'py-2'} px-3 border-[1px] border-gray-300 w-[32%]`} onPress={() => setSelectedGender(3)}>
                                        <View className="flex-row justify-between items-center">
                                            <Text>
                                                Other
                                            </Text>

                                            <View className={`rounded-full ${selectedGender == 3 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                {selectedGender == 3 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                </View>

                            </View>

                            <View className="mb-5">
                                <Text className="text-lg font-bold text-gray-500 mb-3">
                                    Select Profession
                                </Text>

                                <View className="flex-row justify-between items-center flex-wrap gap-2">

                                    <TouchableOpacity className={`rounded-3xl ${selectedProfession == 1 ? 'py-1' : 'py-2'}  px-3 border-[1px] border-gray-300 w-[47%] `} onPress={() => setSelectedProfession(1)}>
                                        <View className="flex-row justify-between items-center">
                                            <Text>
                                                Salaried
                                            </Text>

                                            <View className={`rounded-full ${selectedProfession == 1 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                {selectedProfession == 1 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity className={`rounded-3xl ${selectedProfession == 2 ? 'py-1' : 'py-2'}  px-3 border-[1px] border-gray-300 w-[47%] `} onPress={() => setSelectedProfession(2)}>
                                        <View className="flex-row justify-between items-center">
                                            <Text>
                                                Student
                                            </Text>

                                            <View className={`rounded-full ${selectedProfession == 2 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                {selectedProfession == 2 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
                                            </View>

                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity className={`rounded-3xl ${selectedProfession == 3 ? 'py-1' : 'py-2'}  px-3 border-[1px] border-gray-300 w-[47%] `} onPress={() => setSelectedProfession(3)}>
                                        <View className="flex-row justify-between items-center">
                                            <Text>
                                                Self Employed
                                            </Text>

                                            <View className={`rounded-full ${selectedProfession == 3 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                {selectedProfession == 3 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity className={`rounded-3xl ${selectedProfession == 4 ? 'py-1' : 'py-2'}  px-3 border-[1px] border-gray-300 w-[47%] `} onPress={() => setSelectedProfession(4)}>
                                        <View className="flex-row justify-between items-center">
                                            <Text>
                                                Consultant
                                            </Text>

                                            <View className={`rounded-full ${selectedProfession == 4 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                {selectedProfession == 4 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
                                            </View>
                                        </View>
                                    </TouchableOpacity>


                                    <TouchableOpacity className={`rounded-3xl ${selectedProfession == 5 ? 'py-1' : 'py-2'}  px-3 border-[1px] border-gray-300 w-[47%] `} onPress={() => setSelectedProfession(5)}>
                                        <View className="flex-row justify-between items-center">
                                            <Text>
                                                Freelancer
                                            </Text>

                                            <View className={`rounded-full ${selectedProfession == 5 && 'bg-blue-900'}  p-2 border-[1px] border-gray-300`}>
                                                {selectedProfession == 5 && <Image className="w-2 h-2" source={require('../../assets/forms/right.png')} />}
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                </View>

                            </View>

                        </View>

                    </View>


                </View>



            </TouchableWithoutFeedback>

            <TouchableOpacity
                className={`bg-orange-600 px-6 py-2 rounded-xl mx-5 ${Platform.OS == 'ios' && ''}`}
                onPress={handelNext}

                style={{ position: 'absolute', gap: 2, left: 0, right: 0, bottom: 10 }}
            >
                <Text className="text-white text-center text-lg font-bold">
                    Next
                </Text>
            </TouchableOpacity>
        </>


    )
}






