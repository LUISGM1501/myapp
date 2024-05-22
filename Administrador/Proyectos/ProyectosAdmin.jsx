// ProyectosAdmin.jsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProyectosAdmin = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName); // Navegar a la pantalla deseada
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', width: 345 ,backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginBottom: 20 }}>
        <View style={styles.buttonContainer}>
          <Button
            color = "#57AEBD"
            title="Consultar Proyecto"
            onPress={() => navigateToScreen('ConsultarProyecto')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color = "#8CBBE0"
            title="Crear Proyecto"
            onPress={() => navigateToScreen('CrearProyecto')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color = "#57AEBD"
            title="Consultar Reunion"
            onPress={() => navigateToScreen('ConsultarReunion')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color = "#8CBBE0"
            title="Crear Reunion"
            onPress={() => navigateToScreen('CrearReunion')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color = "#57AEBD"
            title="Tareas Proyectos"
            onPress={() => navigateToScreen('TareasProyectos')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color = "#8CBBE0"
            title="Seguimiento Proyecto"
            onPress={() => navigateToScreen('SeguimientoProyecto')}
          />
        </View>
      </View>
    </View>
  );
};
// Define los estilos
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

export default ProyectosAdmin;
