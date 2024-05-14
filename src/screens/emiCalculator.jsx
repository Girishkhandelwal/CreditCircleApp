import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { useEffect, useState } from 'react'
import { BackIcon } from '../../assets/Header'
import DashedLine from 'react-native-dashed-line'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
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


export default function EmiCalculator({ navigation }) {

    const [loanAmount, setLoanAmount] = useState(50000);
    const [tenure, setTenure] = useState(12);
    const [interestRate, setInterestRate] = useState(20);
    const [emi, setEmi] = useState(0);
    const [totalPayable, setTotalPayable] = useState(0);
    const [principalAmount, setPrincipalAmount] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0)

    const calculateEmi = () => {
        // Formula to calculate EMI
        const principal = loanAmount;
        const rate = interestRate / 1200;
        const time = tenure;
        const emiValue = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
        const totalAmount = emiValue * time;
        const totalInterest = totalAmount - principal;
        setTotalInterest(totalInterest);
        setEmi(emiValue.toFixed(2));
        setTotalPayable(totalAmount.toFixed(2));
        setPrincipalAmount(principal.toFixed(2));
    };

    useEffect(() => {

        calculateEmi()

    }, [])

    // Function to handle loan amount slider change
    const handleLoanAmountChange = (values) => {
        setLoanAmount(values[0]);
        calculateEmi();
    };

    // Function to handle tenure slider change
    const handleTenureChange = (values) => {
        setTenure(values[0]);
        calculateEmi();
    };

    // Function to handle interest rate slider change
    const handleInterestRateChange = (values) => {
        setInterestRate(values[0]);
        calculateEmi();
    };

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
        <>
            <Header title={'EMI Calculator'} />

            <View className="h-screen bg-white -z-10">


                <View className={` p-5`}>

                    <View className="mb-5">
                        <Text style={{  fontFamily: 'OpenSans_400Regular' }}>
                            Total EMI
                        </Text>

                        <Text className="text-xl  text-blue-900" style={{  fontFamily: 'OpenSans_700Bold' }}>
                            INR {emi} / Month
                        </Text>
                    </View>

                    <View className="mb-4">
                        <View className="flex-row justify-between">

                            <Text className="" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                Total Payable Amount
                            </Text>

                            <Text className="" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                INR {totalPayable}
                            </Text>
                        </View>
                    </View>

                    <DashedLine dashLength={10} className="mb-3 " dashColor='gray' />

                    <View className="mb-4">
                        <View className="flex-row justify-between">
                            <View className="flex-row items-center gap-2">

                                <View className="bg-orange-600 h-4 w-4 rounded-full">

                                </View>

                                <Text className="" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                    Principal Loan Amount
                                </Text>
                            </View>

                            <Text className="" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                {loanAmount}
                            </Text>
                        </View>
                    </View>

                    <View className="mb-4">
                        <View className="flex-row justify-between">
                            <View className="flex-row items-center gap-2">

                                <View className="bg-blue-900 h-4 w-4 rounded-full">

                                </View>

                                <Text className="" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                    Total Interest
                                </Text>
                            </View>

                            <Text className="">
                                {totalInterest.toFixed(2)}
                            </Text>
                        </View>
                    </View>


                </View>

                <View className="p-5 bg-blue-900 h-full rounded-3xl">

                    <View className="p-2 ">

                        <View className=" flex-row justify-between items-center mb-2">

                            <Text className="text-white" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                Loan Amount
                            </Text>

                            <View className="flex-row gap-2 w-[50%]">

                                <View className="bg-white py-2 px-5  rounded w-[50%]">
                                    <Text className=" font-bold text-center text-[12px]" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                        ₹
                                    </Text>
                                </View>

                                <View className="bg-white p-2 rounded w-[50%]">
                                    <Text className=" font-bold text-center text-[12px]" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                        {loanAmount}
                                    </Text>

                                </View>
                            </View>

                        </View>

                        <View>

                            <View className="flex-row justify-between">
                                <Text className="text-white" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                    From ₹ 50,000
                                </Text>
                                <Text className="text-white"  style={{  fontFamily: 'OpenSans_400Regular' }}>
                                    To ₹ 5,00,000
                                </Text>
                            </View>

                            <View className="flex-row justify-center  -mt-2">

                                <MultiSlider
                                    values={[loanAmount]}
                                    min={50000}
                                    max={500000}
                                    onValuesChange={handleLoanAmountChange}
                                    sliderLength={320}
                                    step={1000}

                                />

                            </View>


                        </View>

                    </View>


                    <View className="p-2 ">

                        <View className=" flex-row justify-between items-center mb-2">
                            <Text className="text-white"  style={{  fontFamily: 'OpenSans_700Bold' }}>
                                Tenure
                            </Text>

                            <View className="flex-row gap-2 w-[50%]">

                                <View className="bg-white py-2 px-5 rounded w-[50%]">
                                    <Text className=" font-bold text-center text-[12px]" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                        Month
                                    </Text>
                                </View>

                                <View className="bg-white p-2 rounded w-[50%]">
                                    <Text className=" font-bold text-center text-[12px]" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                        {tenure}
                                    </Text>

                                </View>
                            </View>

                        </View>

                        <View>

                            <View className="flex-row justify-between ">
                                <Text className="text-white" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                    From 1 Month
                                </Text>
                                <Text className="text-white" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                    To 60 Month
                                </Text>
                            </View>


                            <View className="flex-row justify-center -mt-2">

                                <MultiSlider
                                    values={[tenure]}
                                    min={1}
                                    max={60}
                                    onValuesChange={handleTenureChange}
                                    sliderLength={320}
                                    step={1}
                                />


                            </View>



                        </View>


                    </View>

                    <View className="p-2 ">

                        <View className=" flex-row justify-between items-center mb-2" >
                            <Text className="text-white" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                Interest Size
                            </Text>

                            <View className="flex-row gap-2 w-[50%]">

                                <View className="bg-white py-2 px-5 rounded w-[50%]">
                                    <Text className=" font-bold text-center text-[12px]" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                        %
                                    </Text>
                                </View>

                                <View className="bg-white p-2 rounded w-[50%]">
                                    <Text className=" font-bold text-center text-[12px]" style={{  fontFamily: 'OpenSans_700Bold' }}>
                                        {interestRate}
                                    </Text>

                                </View>
                            </View>

                        </View>

                        <View>

                            <View className="flex-row justify-between ">
                                <Text className="text-white" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                    From % 0
                                </Text>
                                <Text className="text-white" style={{  fontFamily: 'OpenSans_400Regular' }}>
                                    To 20
                                </Text>
                            </View>


                            <View className="flex-row justify-center -mt-2">

                                <MultiSlider
                                    values={[interestRate]}
                                    min={0}
                                    max={20}
                                    onValuesChange={handleInterestRateChange}
                                    sliderLength={320}
                                    step={1}
                                />

                            </View>

                        </View>

                    </View>

                </View>

            </View>
            <Footer />
        </>
    )
}