// app.jsx

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { create } from 'react-test-renderer';
import Ferreteria from './Pages/Ferreteria';
import GoogleMaps from './Pages/GoogleMaps';

const Menu = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>

      <Menu.Navigator>
        <Menu.Screen name="Ferreteria el cielo" component={Ferreteria} />
        <Menu.Screen name="Google Maps" component={GoogleMaps} />

      </Menu.Navigator>

    </NavigationContainer>
  );
}