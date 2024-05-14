import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import SplashScreen from './SplashScreen';
import CustomDrawerContent from './Drawer';
import HomeScreen from '../../screens/home';
import LoanOffersScreen from '../../screens/loanOffers';
import OffersListScreen from '../../screens/offersList';
import OfferScreen from '../../screens/offer';
import PartnersScreen from '../../screens/partners';
import SignUpScreen from '../../screens/signUp';
import SignInScreen from '../../screens/signIn';
import OtpScreen from '../../screens/otpScreen';
import PlFormTwoScreen from '../../screens/plFormTwo';
import PlFormOneScreen from '../../screens/plFormOne';
import PlFormThreeScreen from '../../screens/plFormThree';
import ThankyouScreen from '../../screens/thankyou';
import EMICalcultorScreen from '../../screens/emiCalculator';
import ProfileScreen from '../../screens/profile';
import PrivacyPolicyScreen from '../../screens/privacyPolicy';
import FaqScreen from '../../screens/faq';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppNavigator() {
  const [splashVisible, setSplashVisible] = useState(false);
  const isLogin = useSelector((state) => state.data.isLogin);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSplashVisible(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <NavigationContainer>
      {splashVisible ? (
        <>
          {isLogin ? (
            <Drawer.Navigator
              initialRouteName="Home"
              drawerContent={(props) => <CustomDrawerContent {...props} />}
              screenOptions={{
                drawerLabel: () => null,
              }}
              drawerStyle={{
                backgroundColor: 'transparent',
                paddingVertical: 0,
              }}
            >
              <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="LoanOffers" component={LoanOffersScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="Offer" component={OfferScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="Partners" component={PartnersScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="PlFormOne" component={PlFormOneScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="PlFormTwo" component={PlFormTwoScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="PlFormThree" component={PlFormThreeScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="Thankyou" component={ThankyouScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="EMICalculator" component={EMICalcultorScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="Faq" component={FaqScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="OffersList" component={OffersListScreen} options={{ headerShown: false }} />
            </Drawer.Navigator>
         ) : ( 
              <Stack.Navigator initialRouteName="SignIn">
              <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
              <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="PlFormOne" component={PlFormOneScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="PlFormTwo" component={PlFormTwoScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="PlFormThree" component={PlFormThreeScreen} options={{ headerShown: false }} />
              <Drawer.Screen name="Thankyou" component={ThankyouScreen} options={{ headerShown: false }} />

            
            </Stack.Navigator>
           )} 
        </>
      ) : (
        <SplashScreen />
      )}
    </NavigationContainer>
  );
}

export default AppNavigator;
