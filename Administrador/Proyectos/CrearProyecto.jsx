// CrearProyecto.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const CrearProyecto = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>CrearProyecto</Text>
      <Button
        title="Abrir Menú"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

export default CrearProyecto;