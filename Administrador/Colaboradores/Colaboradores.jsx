// Colaboradores.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Colaboradores = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName); // Navegar a la pantalla deseada
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Mi Proyecto</Text>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Consultar"
          onPress={() => navigateToScreen('ConsultarColab')}
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Crear Colaborador"
          onPress={() => navigateToScreen('CrearColab')}
        />
      </View>
    </View>
  );
};

export default Colaboradores;
