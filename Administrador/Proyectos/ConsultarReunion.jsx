// ConsultarReunion.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView,  Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';


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

const ConsultaReuPro = () => {
  const [searchId, setSearchId] = useState('');
  const [reunion, setReunion] = useState(null);
  const [reunionesList, setReunionesList] = useState([]);

  const [selectedField, setSelectedField] = useState('');
  const [newData, setNewData] = useState('');

  useEffect(() => {
      loadReunionesList();
  }, []);

  const loadReunionesList = async () => {
      try {
          const response = await axios.get('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/reunion');
          setReunionesList(response.data);
      } catch (error) {
          console.error('Error loading reuniones list:', error);
      }
  };

  const handleSearch = async () => {
      try {
          const response = await axios.get(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/reunion/${searchId}`);
          setReunion(response.data);
      } catch (error) {
          console.error('Error searching for meeting:', error);
      }
  };

  const handleDelete = async () => {
      try {
          await axios.delete(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/reunion/${reunion._id}`);
          setSearchId('');
          setReunion(null);
          loadReunionesList();
      } catch (error) {
          console.error('Error deleting meeting:', error);
      }
  };

  const handleUpdate = async () => {
      try {
          if (!selectedField) {
              console.error('No field selected for update');
              return;
          }
          if (!newData) {
              console.error('No new data provided');
              return;
          }
          await axios.put(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/reunion/${reunion._id}`, { [selectedField]: newData });
          setSearchId('');
          setReunion(null);
          loadReunionesList();
      } catch (error) {
          console.error('Error updating meeting:', error);
      }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', padding: 20 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>Consulta y modificación de reuniones</Text>
        <TextInput
          style={{ backgroundColor: 'lightgray', width: '100%', padding: 10, marginBottom: 10, color: 'black' }}
          placeholder="Buscar por ID"
          value={searchId}
          onChangeText={setSearchId}
        />
        <Button
          title="Buscar"
          onPress={handleSearch}
          color="#1D8CE0"
          style={{ marginBottom: 20 }}
        />
  
        {reunion && (
          <View style={{ backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>Información de la Reunión:</Text>
            <Text style={{ color: 'black' }}>ID: {reunion._id}</Text>
            <Text style={{ color: 'black' }}>Proyecto: {reunion.proyecto}</Text>
            <Text style={{ color: 'black' }}>Tema: {reunion.tema}</Text>
            <Text style={{ color: 'black' }}>Medio: {reunion.medio}</Text>
            <Text style={{ color: 'black' }}>Link: {reunion.link}</Text>
            <Text style={{ color: 'black' }}>Fecha: {reunion.fecha}</Text>
            <Text style={{ color: 'black' }}>Duración en Horas: {reunion.duracionHoras}</Text>
            <Text style={{ color: 'black' }}>Colaboradores: {reunion.colaboradores.join(', ')}</Text>
            <Button
              title="Eliminar"
              onPress={handleDelete}
              color="#FA1946"
              style={{ marginTop: 10 }}
            />
            <View style={{ marginTop: 20 }}>
              <Picker
                selectedValue={selectedField}
                onValueChange={value => setSelectedField(value)}
                style={{ backgroundColor: 'lightgray', marginBottom: 10, color: 'black' }}
              >
                <Picker.Item label="Proyecto" value="proyecto" />
                <Picker.Item label="Tema" value="tema" />
                <Picker.Item label="Medio" value="medio" />
                <Picker.Item label="Link" value="link" />
                <Picker.Item label="Fecha" value="fecha" />
                <Picker.Item label="Duración en Horas" value="duracionHoras" />
                <Picker.Item label="Colaboradores" value="colaboradores" />
              </Picker>
              <TextInput
  style={{
    backgroundColor: 'lightgray',
    padding: 10,
    marginBottom: 10,
    color: 'black',
    borderWidth: 1, // Añade un borde para resaltar el TextInput
    borderColor: '#6886E0', // Color del borde
    borderRadius: 5, // Bordes redondeados
    shadowColor: 'black', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 2, // Radio de la sombra
    elevation: 3, // Elevación de la sombra en dispositivos Android
  }}
  value={newData}
  onChangeText={setNewData}
/>
              <Button
                title="Actualizar"
                onPress={handleUpdate}
                color="#1D8CE0"
              />
            </View>
          </View>
        )}
  
        <View>
          <Text style={{ fontWeight: 'bold', marginBottom: 10, color: 'darkgray' }}>Reuniones disponibles:</Text>
          {reunionesList.map(reunion => (
            <Text key={reunion._id} style={{ marginBottom: 5, color: 'darkgray' }}>{reunion._id} - {reunion.tema}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
  
  
  
  
};

export default ConsultaReuPro;