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
    </View>
  );
};

export default HomeScreen;
