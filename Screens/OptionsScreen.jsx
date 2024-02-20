// OptionsScreen.tsx

import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './Styles';

const OptionsScreen = () => {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('HomeScreen'); 
  };
  
  const goToAddProduct = () => {
    navigation.navigate('AddProduct');
  };

  const goToConsultProducts = () => {
    navigation.navigate('ConsultProduct'); 
  };

  const goToModifyProduct = () => {
    // Navegar a la pantalla para modificar productos
  };

  const goToDeleteProduct = () => { 
    navigation.navigate('DeleteProduct'); 
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.Container}>
        <Text style={styles.Regulartext}>Opciones disponibles:</Text>
      </View>

      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={goToHome}>
          <Text style={styles.whiteText}>Volver a inicio</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={goToAddProduct}>
          <Text style={styles.whiteText}>Agregar Producto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={goToConsultProducts}>
          <Text style={styles.whiteText}>Consultar Productos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={goToModifyProduct}>
          <Text style={styles.whiteText}>Modificar Producto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={goToDeleteProduct}>
          <Text style={styles.whiteText}>Eliminar Producto</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default OptionsScreen;
