// Foros.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Foros = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName); // Navegar a la pantalla deseada
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Mi Proyecto</Text>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Foro de Colaboradores"
          onPress={() => navigateToScreen('ForoColab')}
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Foro de Administradores"
          onPress={() => navigateToScreen('ForoAdmin')}
        />
      </View>
    </View>
  );
};

export default Foros;
