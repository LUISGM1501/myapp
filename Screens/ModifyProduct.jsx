import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getProducts, saveProducts } from './Products'; // Importa las funciones para obtener y guardar productos
import styles from './Styles';

const ModifyProductScreen = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar la lista de productos
  const [productId, setProductId] = useState(''); // Estado para almacenar el ID del producto a modificar
  const [costPrice, setCostPrice] = useState(''); // Estado para almacenar el nuevo precio costo
  const [sellingPrice, setSellingPrice] = useState(''); // Estado para almacenar el nuevo precio de venta
  const [quantity, setQuantity] = useState(''); // Estado para almacenar la nueva cantidad

  // Función para cargar los productos al iniciar la pantalla
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };
    fetchData();
  }, []);

  // Función para modificar un producto
  const handleModify = async () => {
    try {
      // Encontrar el producto a modificar por su ID
      const productIndex = products.findIndex(product => product.id === productId);
      if (productIndex !== -1) {
        // Copiar el producto actual
        const modifiedProduct = { ...products[productIndex] };

        // Actualizar los campos modificables
        if (costPrice !== '') {
          modifiedProduct.costPrice = parseFloat(costPrice);
        }
        if (sellingPrice !== '') {
          modifiedProduct.sellingPrice = parseFloat(sellingPrice);
        }
        if (quantity !== '') {
          modifiedProduct.quantity = parseInt(quantity);
        }

        // Actualizar la lista de productos
        const updatedProducts = [...products];
        updatedProducts[productIndex] = modifiedProduct;

        // Guardar la lista actualizada de productos
        await saveProducts(updatedProducts);
        console.log('Producto modificado correctamente');

        // Actualizar el estado de los productos
        setProducts(updatedProducts);

        // Limpiar los campos de entrada
        setProductId('');
        setCostPrice('');
        setSellingPrice('');
        setQuantity('');
      } else {
        console.log('No se encontró ningún producto con el ID proporcionado');
      }
    } catch (error) {
      console.error('Error al modificar el producto:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.Subtittletext}>Modificar Producto:</Text>

      <TextInput
        style={styles.textInput}
        placeholder="ID del Producto"
        placeholderTextColor="gray"
        value={productId}
        onChangeText={setProductId}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Nuevo Precio Costo"
        placeholderTextColor="gray"
        value={costPrice}
        onChangeText={setCostPrice}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.textInput}
        placeholder="Nuevo Precio Venta"
        placeholderTextColor="gray"
        value={sellingPrice}
        onChangeText={setSellingPrice}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.textInput}
        placeholder="Nueva Cantidad"
        placeholderTextColor="gray"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <Button title="Modificar Producto" onPress={handleModify} />

      {/* Lista de productos */}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}># {item.id}</Text>
            
            <View style={styles.Container}>
                <Text style={styles.text}>Precio: ${item.sellingPrice}</Text>
                <Text style={styles.text}>Costo: ${item.costPrice}</Text>
            </View>

            <View style={styles.Container}>
              <Text style={styles.text}>Cantidad: {item.quantity}</Text>
              <Text style={styles.text}>Vendidos: {item.soldQuantity}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default ModifyProductScreen;
