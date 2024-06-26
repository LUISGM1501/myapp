// ConsultarReunion.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const ConsultaReuPro = () => {
  const [searchId, setSearchId] = useState('');
  const [reunion, setReunion] = useState(null);
  const [reunionesList, setReunionesList] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [newData, setNewData] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar la visibilidad del DateTimePicker
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para la fecha seleccionada
  const [mostrarBoton, setMostrarBoton] = useState(false);

  useEffect(() => {
    loadReunionesList();
  }, []);


  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const modifiedDate = new Date(currentDate); // Crear una nueva instancia de Date
    modifiedDate.setDate(modifiedDate.getDate()); // Restar un día
  
    setNewData(modifiedDate);
    setSelectedDate(currentDate);
    setShowDatePicker(false);
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate());
    return result;
  };

  const loadReunionesList = async () => {
    try {
      const response = await axios.get('https://requebackend-da0aea993398.herokuapp.com/api/reunion');
      setReunionesList(response.data);
    } catch (error) {
      console.error('Error loading reuniones list:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://requebackend-da0aea993398.herokuapp.com/api/reunion/${searchId}`);
      setReunion(response.data);
    } catch (error) {
      console.error('Error searching for meeting:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://requebackend-da0aea993398.herokuapp.com/api/reunion/${reunion._id}`);
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
      await axios.put(`https://requebackend-da0aea993398.herokuapp.com/api/reunion/${reunion._id}`, { [selectedField]: newData });
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
        <View style={{ height: 130, width: 345, backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginBottom: 20 }}>
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
        <Button color="#57AEBD" title="Buscar" onPress={handleSearch} />

        {reunion && (
          <View style={{ backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginTop: 20, marginBottom: 20 }}>
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
              style={[inputStyle, { backgroundColor: '#BCCDE0', marginTop: 20 }]}
              selectedValue={selectedField}
              onValueChange={(itemValue) => {
                setSelectedField(itemValue);
                if (itemValue === 'fecha_inicio') {
                  setMostrarBoton(true); // Mostrar el botón solo cuando se selecciona "Fecha"
                } else {
                  setMostrarBoton(false); // Ocultar el botón para otros valores seleccionados
                }
              }}
            >
                <Picker.Item label="Tema" value="tema" />
                <Picker.Item label="Medio" value="medio" />
                <Picker.Item label="Link" value="link" />
                <Picker.Item label="Duración en Horas" value="duracionHoras" />
                <Picker.Item label="Fecha" value="fecha" />
              </Picker>
              {selectedField === 'fecha' ? (
              <View>
                <Button onPress={() => setShowDatePicker(true)} title="Seleccionar Fecha" />
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                  />
                )}
                <Text style={{ color: 'gray' }}>Fecha seleccionada: {newData && addDays(newData, 1).toLocaleString()}</Text>

              </View>
            ) : (
              <TextInput
                placeholder='Nuevo Valor'
                placeholderTextColor='gray'
                style={inputStyle}
                value={newData}
                onChangeText={setNewData}
                keyboardType={selectedField === 'duracionHoras' ? 'numeric' : 'default'} 
              />
            )}
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
