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
          const response = await axios.get('http://192.168.0.13:4000/api/reunion');
          setReunionesList(response.data);
      } catch (error) {
          console.error('Error loading reuniones list:', error);
      }
  };

  const handleSearch = async () => {
      try {
          const response = await axios.get(`http://192.168.0.13:4000/api/reunion/${searchId}`);
          setReunion(response.data);
      } catch (error) {
          console.error('Error searching for meeting:', error);
      }
  };

  const handleDelete = async () => {
      try {
          await axios.delete(`http://192.168.0.13:4000/api/reunion/${reunion._id}`);
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
          await axios.put(`http://192.168.0.13:4000/api/reunion/${reunion._id}`, { [selectedField]: newData });
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
        <View style={{ height: 130, width: 345 ,backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginBottom: 20 }}>
        <Text style={{ color: 'black' }}>Reunión ID:</Text>
            <Picker
            style={[inputStyle, { backgroundColor: '#9ACFE0' }]}
            selectedValue={reunionesList.map(reu => reu._id)}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue) {
                console.log("Reunion seleccionado:", itemValue);
                setSearchId(itemValue);
              } else {
                console.log("Reunion seleccionado es null o undefined");
              }
              
            }}
            mode="multiple"
          >
            {reunionesList.map(reu => (
              <Picker.Item
                key={reu._id}
                label={`${reu.tema} - ${reu._id}`}
                value={reu._id}
              />
            ))}
          </Picker>
          </View>
          <Button color= "#57AEBD" title="Buscar" onPress={handleSearch} />
  
        {reunion && (
          <View style={{ backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginTop:20, marginBottom: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>Información de la Reunión:</Text>
            <Text style={{ color: 'black' }}>ID: {reunion._id}</Text>
            <Text style={{ color: 'black' }}>Proyecto: {reunion.proyecto}</Text>
            <Text style={{ color: 'black' }}>Tema: {reunion.tema}</Text>
            <Text style={{ color: 'black' }}>Medio: {reunion.medio}</Text>
            <Text style={{ color: 'black' }}>Link: {reunion.link}</Text>
            <Text style={{ color: 'black' }}>Fecha: {reunion.fecha}</Text>
            <Text style={{ color: 'black' }}>Duración en Horas: {reunion.duracionHoras}</Text>
            <Text style={{ color: 'black' }}>Colaboradores: {reunion.colaboradores.join(', ')}</Text>
            <Button color="#57AEBD" title="Eliminar" onPress={handleDelete} />
            <View style={{ marginTop: 20 }}>
              <Picker
                selectedValue={selectedField}
                onValueChange={value => setSelectedField(value)}
                style={[inputStyle, { backgroundColor: '#BCCDE0', marginTop: 20 }]}
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
              style={inputStyle}
              value={newData}
              onChangeText={setNewData}
            />
              <Button color="#4EBC7B" title="Actualizar" onPress={handleUpdate} />
            </View>
          </View>
        )}
  
      </View>
    </ScrollView>
  );
};

const inputStyle = {
  padding: 10,
  marginBottom: 10,
  color: 'black',
  borderWidth: 1,
  backgroundColor: '#f0f0f0', // Gris super claro
  borderColor: 'lightgray',
  borderRadius: 5,
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 3,
};

export default ConsultaReuPro;