import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getProducts } from './Products'; // Importa la función para obtener los productos

const ConsultScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [filterType, setFilterType] = useState('name'); // Puedes inicializar con el tipo de filtro que prefieras

  useEffect(() => {
    // Obtener los productos al cargar la pantalla
    const fetchData = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    };
    fetchData();
  }, []);

  const filterProducts = () => {
    let filtered = products;
    switch (filterType) {
      case 'name':
        filtered = products.filter(product => product.name.toLowerCase().includes(searchCriteria.toLowerCase()));
        break;
      case 'price':
        filtered = products.filter(product => product.sellingPrice === parseFloat(searchCriteria));
        break;
      case 'quantity':
        filtered = products.filter(product => product.quantity === parseInt(searchCriteria));
        break;
      case 'soldQuantity':
        filtered = products.filter(product => product.soldQuantity === parseInt(searchCriteria));
        break;
      default:
        break;
    }
    setFilteredProducts(filtered);
  };

  return (
    <View>
      <Text>Consulta de productos</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese criterio de búsqueda"
        value={searchCriteria}
        onChangeText={setSearchCriteria}
      />
      <Button title="Buscar" onPress={filterProducts} />
      <Text>Filtrar por:</Text>
      <Button title="Nombre" onPress={() => setFilterType('name')} />
      <Button title="Precio" onPress={() => setFilterType('price')} />
      <Button title="Cantidad" onPress={() => setFilterType('quantity')} />
      <Button title="Cantidad vendida" onPress={() => setFilterType('soldQuantity')} />

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Precio: {item.sellingPrice}</Text>
            <Text>Cantidad: {item.quantity}</Text>
            <Text>Cantidad vendida: {item.soldQuantity}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default ConsultScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});
