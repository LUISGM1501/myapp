import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { deleteProducts, getProducts } from './Products'; // Importar las funciones de productos
import styles from './Styles';

const DeleteProductScreen = () => {
  const [identifier, setIdentifier] = useState(''); // Estado para almacenar el nombre o ID del producto
  const [byName, setByName] = useState(true); // Estado para indicar si se eliminará por nombre o ID
  const [products, setProducts] = useState([]); // Estado para almacenar la lista de productos

  // Función para cargar los productos al iniciar la pantalla
  const loadProducts = async () => {
    try {
      const allProducts = await getProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  // Función para eliminar un producto
  const handleDelete = async () => {
    try {
      await deleteProducts(identifier, byName);
      // Recargar la lista de productos después de eliminar
      await loadProducts();
      // Reiniciar el campo de entrada después de eliminar el producto
      setIdentifier('');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  // Cargar los productos al cargar la pantalla
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <View style={styles.mainContainer}>      
      <Text style={styles.Subtittletext}>Nombre o ID del Producto:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Ingrese nombre o ID"
        placeholderTextColor="gray"
        value={identifier}
        onChangeText={setIdentifier}
      />

      <View >
        <Text style={styles.Subtittletext}>Eliminar por:</Text>
        <View >
          <View >
            <Button title="Nombre" onPress={() => setByName(true)} color={byName ? 'blue' : 'gray'} />
          </View>

          <View>
            <Button title="ID" onPress={() => setByName(false)} color={!byName ? 'blue' : 'gray'} />
          </View>
        </View>
      </View>

      <View >
        <Button title="Eliminar Producto" onPress={handleDelete} />
      </View>

      <Text style={styles.Subtittletext}>Lista de Productos:</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}># {item.id}</Text>
            <Text style={styles.text}>Precio: ${item.sellingPrice}</Text>

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

export default DeleteProductScreen;
