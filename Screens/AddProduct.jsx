import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { saveProducts, Product, getProducts } from './Products'; // Importar las funciones de guardado, obtener productos y la interfaz Product
import styles from './Styles';

const AddProductScreen = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [soldQuantity, setSoldQuantity] = useState('');

  const addProduct = async () => {
    const newProduct = {
      id: productId,
      name: productName,
      quantity: parseInt(quantity),
      costPrice: parseFloat(costPrice),
      sellingPrice: parseFloat(sellingPrice),
      soldQuantity: parseInt(soldQuantity),
    };

    try {
      // Obtener productos existentes
      const existingProducts = await getProducts();
      // Agregar el nuevo producto a la lista
      const updatedProducts = [...existingProducts, newProduct];
      // Guardar la lista actualizada de productos
      await saveProducts(updatedProducts);
      console.log('Producto agregado correctamente');
      // Reiniciar los campos después de agregar el producto
      setProductId('');
      setProductName('');
      setQuantity('');
      setCostPrice('');
      setSellingPrice('');
      setSoldQuantity('');
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.mainContainer}>

        <Text style={styles.Subtittletext}>ID:</Text>
        <TextInput
          style={styles.textInput}
          value={productId}
          onChangeText={setProductId}
          keyboardType="numeric"
        />

        <Text style={styles.Subtittletext}>Nombre:</Text>
        <TextInput
          style={styles.textInput}
          value={productName}
          onChangeText={setProductName}
        />

        <Text style={styles.Subtittletext}>Cantidad:</Text>
        <TextInput
          style={styles.textInput}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        <Text style={styles.Subtittletext}>Precio de costo:</Text>
        <TextInput
          style={styles.textInput}
          value={costPrice}
          onChangeText={setCostPrice}
          keyboardType="numeric"
        />

        <Text style={styles.Subtittletext}>Precio de venta:</Text>
        <TextInput
          style={styles.textInput}
          value={sellingPrice}
          onChangeText={setSellingPrice}
          keyboardType="numeric"
        />

        <Text style={styles.Subtittletext}>Cantidad vendida:</Text>
        <TextInput
          style={styles.textInput}
          value={soldQuantity}
          onChangeText={setSoldQuantity}
          keyboardType="numeric"
        />

        <View style={styles.ButtonContainer}>
            <TouchableOpacity
            style={styles.addButton}
            onPress={addProduct}>
            <Text style={styles.whiteText}>Agregar Producto</Text>
            </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
};

export default AddProductScreen;
