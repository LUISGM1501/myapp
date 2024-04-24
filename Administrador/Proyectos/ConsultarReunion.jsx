// ConsultarReunion.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const ConsultarReunion = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ConsultarReunion</Text>
      <Button
        title="Abrir Menú"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

export default ConsultarReunion;