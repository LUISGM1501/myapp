// app.jsx

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import OptionsScreen from './Screens/OptionsScreen';
import AddProduct from './Screens/AddProduct';
import ConsultScreen from './Screens/ConsultProducts';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">

        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Inicio', headerTitleStyle: {
          fontSize: 30, // Tamaño del texto
          color: '#000', // Color del texto
        }, }} />
        
        <Stack.Screen name="OptionsScreen" component={OptionsScreen} options={{ title: 'Opciones', headerTitleStyle: {
          fontSize: 30, // Tamaño del texto
          color: '#000', // Color del texto
        },  }} />

        <Stack.Screen name="DeleteProduct" component={OptionsScreen} options={{ title: 'FALTA', headerTitleStyle: {
          fontSize: 30, // Tamaño del texto
          color: '#000', // Color del texto
        },  }} />

        <Stack.Screen name="ModifyProduct" component={OptionsScreen} options={{ title: 'FALTA', headerTitleStyle: {
          fontSize: 30, // Tamaño del texto
          color: '#000', // Color del texto
        },  }} />

        <Stack.Screen name="ConsultProduct" component={ConsultScreen} options={{ title: 'Consultas', headerTitleStyle: {
          fontSize: 30, // Tamaño del texto
          color: '#000', // Color del texto
        },  }} />

        <Stack.Screen name="AddProduct" component={AddProduct} options={{ title: 'Agregar', headerTitleStyle: {
          fontSize: 30, // Tamaño del texto
          color: '#000', // Color del texto
        },  }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;