// Colaboradores.jsx
import React from 'react';
import { View, Text, Button, StyleSheet  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Colaboradores = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName); // Navegar a la pantalla deseada
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', width: 345 ,backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginBottom: 20 }}>
      <View style={styles.buttonContainer}>
        <Button
          color = "#57AEBD"
          title="Consultar"
          onPress={() => navigateToScreen('ConsultarColab')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color = "#8CBBE0"
          title="Crear Colaborador"
          onPress={() => navigateToScreen('CrearColab')}
        />
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'gray',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '90%',
    marginVertical: 10,
  },
});

export default Colaboradores;
