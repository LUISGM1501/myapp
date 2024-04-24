// MiProyecto.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MiProyecto = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName); // Navegar a la pantalla deseada
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Mi Proyecto</Text>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Ver BurnDownChart"
          onPress={() => navigateToScreen('BurnDownChart')}
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Ver Informe"
          onPress={() => navigateToScreen('InformeProyecto')}
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Ver Tareas"
          onPress={() => navigateToScreen('TareasProyecto')}
        />
      </View>
    </View>
  );
};

export default MiProyecto;
