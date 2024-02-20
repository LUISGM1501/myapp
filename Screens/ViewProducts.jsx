import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getProducts } from './Products'; // Importa la función para obtener los productos
import styles from './Styles';

const AllProductsScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Obtener los productos al cargar la pantalla
    const fetchData = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.Subtittletext}>Todos los Productos:</Text>
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

export default AllProductsScreen;
