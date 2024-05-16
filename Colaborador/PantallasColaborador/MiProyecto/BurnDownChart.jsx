// SeguimienotoProyecto.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const SeguimienotoProyecto = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SeguimienotoProyecto</Text>
      <Button
        title="Abrir Menú"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

export default SeguimienotoProyecto;