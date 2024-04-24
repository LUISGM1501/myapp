// CrearReunion.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const CrearReunion = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>CrearReunion</Text>
      <Button
        title="Abrir Menú"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

export default CrearReunion;