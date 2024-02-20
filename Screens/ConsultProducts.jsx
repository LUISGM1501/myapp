import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getProducts } from './Products'; // Importa la función para obtener los productos
import styles from './Styles';

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
      case 'id':
        filtered = products.filter(product => product.id.toLowerCase().includes(searchCriteria.toLowerCase()));
        break;
      default:
        break;
    }
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.Subtittletext}>Consulta de productos:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Ingrese criterio de búsqueda"
        value={searchCriteria}
        onChangeText={setSearchCriteria}
      />
      <Button title="Buscar" onPress={filterProducts} />

      <Text style={styles.Subtittletext}>Filtrar por:</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Nombre"
          onPress={() => setFilterType('name')}
          color={filterType === 'name' ? 'blue' : 'gray'}
        />
        <Button
          title="ID"
          onPress={() => setFilterType('id')}
          color={filterType === 'id' ? 'blue' : 'gray'}
        />
        <Button
          title="Precio Venta"
          onPress={() => setFilterType('price')}
          color={filterType === 'price' ? 'blue' : 'gray'}
        />
        <Button
          title="Cantidad"
          onPress={() => setFilterType('quantity')}
          color={filterType === 'quantity' ? 'blue' : 'gray'}
        />
        <Button
          title="Cantidad Vendida"
          onPress={() => setFilterType('soldQuantity')}
          color={filterType === 'soldQuantity' ? 'blue' : 'gray'}
        />
      </View>

      <Text style={styles.Subtittletext} >Productos:</Text>

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name}</Text>
            <Text># {item.id}</Text>
            <Text>Precio: ${item.sellingPrice}</Text>

            <View style={styles.Container}>
              <Text>Cantidad: {item.quantity}</Text>
              <Text>Vendidos: {item.soldQuantity}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default ConsultScreen;
