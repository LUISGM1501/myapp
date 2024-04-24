// ForoFoUs.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const ForoFoUs = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Foro de colaboradores</Text>
      <Button
        title="Abrir Menú"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

export default ForoFoUs;

