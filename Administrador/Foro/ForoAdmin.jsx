// ForoAdmin.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const ForoAdmin = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ForoAdmin</Text>
      <Button
        title="Abrir Menú"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

export default ForoAdmin;