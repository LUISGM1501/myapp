import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import OptionsScreen from '../Screens/OptionsScreen';
import AddProduct from '../Screens/AddProduct';
import ConsultScreen from '../Screens/ConsultProducts';
import DeleteProductScreen from '../Screens/DeleteProduct';
import ModifyProductScreen from '../Screens/ModifyProduct';
import AllProductsScreen from '../Screens/ViewProducts';

const Stack = createStackNavigator();

const Ferreteria = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">

      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Ferreteria el Cielo', headerTitleStyle: {
        fontSize: 30, // Tamaño del texto
        color: '#000', // Color del texto
      }, }} />
      
      <Stack.Screen name="OptionsScreen" component={OptionsScreen} options={{ title: 'Opciones', headerTitleStyle: {
        fontSize: 30, // Tamaño del texto
        color: '#000', // Color del texto
      },  }} />

      <Stack.Screen name="DeleteProduct" component={DeleteProductScreen} options={{ title: 'Eliminar Producto', headerTitleStyle: {
        fontSize: 30, // Tamaño del texto
        color: '#000', // Color del texto
      },  }} />

      <Stack.Screen name="ModifyProduct" component={ModifyProductScreen} options={{ title: 'Modificar', headerTitleStyle: {
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

      <Stack.Screen name="ViewAllProducts" component={AllProductsScreen} options={{ title: 'Productos', headerTitleStyle: {
        fontSize: 30, // Tamaño del texto
        color: '#000', // Color del texto
      },  }} />

    </Stack.Navigator>
  );
};

export default Ferreteria;
