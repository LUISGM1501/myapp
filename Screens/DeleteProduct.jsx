import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { deleteProducts } from './Products'; // Importar la función de eliminar productos
import styles from './Styles';

const DeleteProduct = () => {
  const [identifier, setIdentifier] = useState(''); // Estado para almacenar el nombre o ID del producto
  const [byName, setByName] = useState(true); // Estado para indicar si se eliminará por nombre o ID

  const handleDelete = () => {
    // Llamar a la función de eliminar productos
    deleteProducts(identifier, byName);
    // Reiniciar el campo de entrada después de eliminar el producto
    setIdentifier('');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.mainContainer}>
        <Text style={styles.Subtittletext}>Nombre o ID del Producto:</Text>
        <TextInput
          style={styles.textInput}
          value={identifier}
          onChangeText={setIdentifier}
        />

        <View style={styles.radioButtonContainer}>
          <Text style={styles.Subtittletext}>Eliminar por Nombre:</Text>
          <TouchableOpacity onPress={() => setByName(true)}>
            <View style={[styles.radioButton, byName && styles.radioButtonSelected]} />
          </TouchableOpacity>
          <Text style={styles.Subtittletext}>Eliminar por ID:</Text>
          <TouchableOpacity onPress={() => setByName(false)}>
            <View style={[styles.radioButton, !byName && styles.radioButtonSelected]} />
          </TouchableOpacity>
        </View>

        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}>
            <Text style={styles.whiteText}>Eliminar Producto</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DeleteProduct;
