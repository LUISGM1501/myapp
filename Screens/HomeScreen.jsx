// HomeScreen.tsx

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './Styles'; // Asegúrate de importar tus estilos

const HomeScreen = () => {
  const navigation = useNavigation();

  const goToOptions = () => {
    navigation.navigate('OptionsScreen');
  };


  return (
    <View style={styles.mainContainer}>
      <View style={styles.Container}>
        <Text style={styles.Regulartext}>¡Bienvenido a la pantalla de inicio!</Text>
      </View>

      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={goToOptions}>
          <Text style={styles.whiteText}>Ver opciones</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 'auto' }}>
        <Text style={styles.Subtittletext}>Responsables:</Text>
        <Text style={styles.text}> 1 - Luis Gerardo Urbina Salazar </Text>
        <Text style={styles.text}> carne 2023156802 </Text>
        <Text style={styles.text}> 2 - Josi Marin Jimenez </Text>
        <Text style={styles.text}> carne 2022182201 </Text>
      </View>
    </View>
  );
};

export default HomeScreen;
