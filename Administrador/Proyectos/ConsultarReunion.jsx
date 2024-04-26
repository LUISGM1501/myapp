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
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: 'black' }}>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>   
      <Text></Text>
      <Text></Text>
      <Text></Text>
              
      <Text>Consulta y modificación de reuniones</Text>
      <TextInput
        placeholder="Search by ID"
        value={searchId}
        onChangeText={setSearchId}
      />
      <Button title="Search" onPress={handleSearch} />

      {reunion && (
        <View>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>

          <Text>Información de la Reunión:</Text>
          <Text>ID: {reunion._id}</Text>
          <Text>Proyecto: {reunion.proyecto}</Text>
          <Text>Tema: {reunion.tema}</Text>
          <Text>Medio: {reunion.medio}</Text>
          <Text>Link: {reunion.link}</Text>
          <Text>Fecha: {reunion.fecha}</Text>
          <Text>Duración en Horas: {reunion.duracionHoras}</Text>
          <Text>Colaboradores: {reunion.colaboradores.join(', ')}</Text>
          <Button title="Delete" onPress={handleDelete} />
          <View>
            <Picker
              selectedValue={selectedField}
              onValueChange={value => setSelectedField(value)}
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
              value={newData}
              onChangeText={setNewData}
            />
            <Button title="Update" onPress={handleUpdate} />
          </View>
        </View>
      )}

      <View>
        <Text>Reuniones disponibles:</Text>
        <ScrollView>
          {reunionesList.map(reunion => (
            <Text key={reunion._id}>{reunion._id} - {reunion.tema}</Text>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ConsultaReuPro;