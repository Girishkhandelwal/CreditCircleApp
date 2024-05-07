// App.js
import React from 'react';
import AppNavigator from './src/components/common/Navigation';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./src/globalStates/store";
import { PaperProvider, MD3LightTheme as DefaultTheme,} from 'react-native-paper';
import { Platform, StatusBar } from 'react-native';

const theme = {
  ...DefaultTheme,

  myOwnProperty: true,
 
  colors: {
    ...DefaultTheme.colors,
    background: '#303030', 
    myOwnColor: '#455A64',
  },
};


function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider theme={theme}>
         <StatusBar  translucent backgroundColor="#273283" barStyle={`light-content`} />
            <AppNavigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
