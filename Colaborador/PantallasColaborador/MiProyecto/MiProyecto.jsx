// MiProyecto.jsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MiProyecto = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName); // Navegar a la pantalla deseada
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      <View style={{ alignItems: 'center', width: 345 ,backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginBottom: 20 }}>
      <Text style={{color:'black', fontWeight: 'bold', fontSize: 15}} >Reportes</Text>
      <View style={styles.buttonContainer}>
        <Button
          color = "#57AEBD"
          title="Ver Informe"
          onPress={() => navigateToScreen('InformeProyecto')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color = "#8CBBE0"
          title="Ver Tareas"
          onPress={() => navigateToScreen('TareasProyecto')}
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

export default MiProyecto;
