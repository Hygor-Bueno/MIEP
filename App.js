import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';
import Route from './src/route/Route';
import ShopDepartmentContextProvider from './src/context/ShopDepartmentContext';
import GridContextProvider from './src/context/GridContext';
import ProductProvider from './src/context/ProductContext';
import {StatusBar} from 'react-native';

// const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    // LogBox.ignoreLogs(['Setting a timer']);
    StatusBar.setHidden(true);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ProductProvider>
          <GridContextProvider>
            <ShopDepartmentContextProvider>
              <Route />
            </ShopDepartmentContextProvider>
          </GridContextProvider>
        </ProductProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
