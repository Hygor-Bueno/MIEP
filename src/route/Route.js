import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import MenuPage from '../pages/MenuPage';
import InitialPage from '../pages/InitialPage';
import PayloadPage from '../pages/PayloadPage';

const Stack = createStackNavigator();

export default () => (

  <Stack.Navigator initialRouteName="Payload" screenOptions={{headerShown:false}}>
  {/* // <Stack.Navigator  screenOptions={{headerShown:false}}> */}
    <Stack.Screen name="Payload" component={PayloadPage}/>
    <Stack.Screen name="Login" component={InitialPage}/>
    <Stack.Screen name="Main" component={MenuPage}/>
  </Stack.Navigator>
);
