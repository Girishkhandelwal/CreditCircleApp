import { View, Text, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { BackIcon } from '../../assets/Header'
import DashedLine from 'react-native-dashed-line'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Header from '../components/Home/Header';
import Footer from '../components/common/Footer';


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

    useEffect(()=>{
         
        calculateEmi()

    },[])

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
    return (
        <>
            <Header title={'EMI Calculator'} />

            <View className="h-screen bg-white -z-10">



                <View className="p-5 mb-2 mt-28 ">

                    <View className="mb-5">
                        <Text>
                            Total EMI
                        </Text>

                        <Text className="text-xl font-bold text-blue-900">
                            INR {emi} / Month
                        </Text>
                    </View>

                    <View className="mb-4">
                        <View className="flex-row justify-between">

                            <Text className="font-bold">
                                Total Payable Amount
                            </Text>

                            <Text className="font-bold">
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

                                <Text className="">
                                    Principal Loan Amount
                                </Text>
                            </View>

                            <Text className="">
                                {loanAmount}
                            </Text>
                        </View>
                    </View>

                    <View className="mb-4">
                        <View className="flex-row justify-between">
                            <View className="flex-row items-center gap-2">

                                <View className="bg-blue-900 h-4 w-4 rounded-full">

                                </View>

                                <Text className="">
                                    Total Interest
                                </Text>
                            </View>

                            <Text className="">
                                {totalInterest.toFixed(2)}
                            </Text>
                        </View>
                    </View>


                </View>

                <View className="p-5 bg-blue-900 h-full rounded-2xl">

                    <View className="p-2 ">

                        <View className=" flex-row justify-between items-center mb-2">

                            <Text className="text-white">
                                Loan Amount
                            </Text>

                            <View className="flex-row gap-2 w-[50%]">

                                <View className="bg-white py-2 px-5  rounded-lg w-[50%]">
                                    <Text className=" font-bold text-center">
                                        ₹
                                    </Text>
                                </View>

                                <View className="bg-white p-2 rounded-lg w-[50%]">
                                    <Text className=" font-bold text-center">
                                        {loanAmount}
                                    </Text>

                                </View>
                            </View>

                        </View>

                        <View>

                            <View className="flex-row justify-between ">
                                <Text className="text-white">
                                    From ₹ 50,000
                                </Text>
                                <Text className="text-white">
                                    To ₹ 5,00,000
                                </Text>
                            </View>

                            <View className="flex-row justify-center -mt-2">

                                <MultiSlider
                                    values={[loanAmount]}
                                    min={50000}
                                    max={500000}
                                    onValuesChange={handleLoanAmountChange}
                                    sliderLength={330}
                                    step={1000}


                                />

                            </View>

                        </View>


                    </View>

                    <View className="p-2 ">

                        <View className=" flex-row justify-between items-center mb-2">
                            <Text className="text-white">
                                Tenure
                            </Text>

                            <View className="flex-row gap-2 w-[50%]">

                                <View className="bg-white py-2 px-5 rounded-lg w-[50%]">
                                    <Text className=" font-bold text-center">
                                        Month
                                    </Text>
                                </View>

                                <View className="bg-white p-2 rounded-lg w-[50%]">
                                    <Text className=" font-bold text-center">
                                        {tenure}
                                    </Text>

                                </View>
                            </View>

                        </View>

                        <View>

                            <View className="flex-row justify-between ">
                                <Text className="text-white">
                                    From 1 Month
                                </Text>
                                <Text className="text-white">
                                    To 60 Month
                                </Text>
                            </View>


                            <View className="flex-row justify-center -mt-2">

                                <MultiSlider
                                    values={[tenure]}
                                    min={1}
                                    max={60}
                                    onValuesChange={handleTenureChange}
                                    sliderLength={330}
                                    step={1}
                                />


                            </View>



                        </View>


                    </View>

                    <View className="p-2 ">

                        <View className=" flex-row justify-between items-center mb-2">
                            <Text className="text-white">
                                Interest Size
                            </Text>

                            <View className="flex-row gap-2 w-[50%]">

                                <View className="bg-white py-2 px-5 rounded-lg w-[50%]">
                                    <Text className=" font-bold text-center">
                                        %
                                    </Text>
                                </View>

                                <View className="bg-white p-2 rounded-lg w-[50%]">
                                    <Text className=" font-bold text-center">
                                        {interestRate}
                                    </Text>

                                </View>
                            </View>

                        </View>

                        <View>

                            <View className="flex-row justify-between ">
                                <Text className="text-white">
                                    From % 0
                                </Text>
                                <Text className="text-white">
                                    To 20
                                </Text>
                            </View>


                            <View className="flex-row justify-center -mt-2">

                                <MultiSlider
                                    values={[interestRate]}
                                    min={0}
                                    max={20}
                                    onValuesChange={handleInterestRateChange}
                                    sliderLength={330}
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