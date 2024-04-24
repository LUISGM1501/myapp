// ProyectosAdmin.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProyectosAdmin = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName); // Navegar a la pantalla deseada
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Mi Proyecto</Text>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Consultar Proyecto"
          onPress={() => navigateToScreen('ConsultarProyecto')}
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Crear Proyecto"
          onPress={() => navigateToScreen('CrearProyecto')}
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Consultar Reunion"
          onPress={() => navigateToScreen('ConsultarReunion')}
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Crear Reunion"
          onPress={() => navigateToScreen('CrearReunion')}
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Tareas Proyectos"
          onPress={() => navigateToScreen('TareasProyectos')}
        />
      </View>
    </View>
  );
};

export default ProyectosAdmin;
