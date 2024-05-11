// CrearProyecto.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView,  Button, StatusBar } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import MultiSelectBox from 'react-native-multi-selectbox';


import axios from 'axios';

const CrearProyecto = () => {
  const [nombre, setNombre] = useState('');
  const [recursos, setRecursos] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState(null);
  const [estado, setEstado] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  const [responsable, setResponsable] = useState('');
  const [colaboradoresDisponibles, setColaboradoresDisponibles] = useState([]);
  const [responsablesDisponibles, setResponsablesDisponibles] = useState([]);
  const [datosGuardados, setDatosGuardados] = useState(null);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  

  useEffect(() => {
    // Obtener la lista de colaboradores disponibles
    axios.get('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/colaborador')
      .then(response => {
        setColaboradoresDisponibles(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los colaboradores:', error);
      });

    // Obtener la lista de responsables disponibles
    axios.get('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/Admin')
      .then(response => {
        setResponsablesDisponibles(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los responsables:', error);
      });
  }, []);

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  const handleGuardar = () => {
    // Check if any field is undefined
    if (!nombre || !recursos || !presupuesto || !colaboradores || !estado || !descripcion ||
        !date || !responsable    ) {
      alert('Por favor, completa todos los campos antes de guardar.');
      // Si todos los campos están completos, imprimir los datos
      console.log('Nombre:', nombre);
      console.log('Recursos:', recursos);
      console.log('Presupuesto:', presupuesto);
      console.log('Colaboradores:', colaboradores);
      console.log('Estado:', estado);
      console.log('Descripción:', descripcion);
      console.log('Fecha:', date.toLocaleDateString());
      console.log('Responsable:', responsable);
      return; // Exit the function early
    }
  
    const datos = { nombre, recursos, presupuesto, colaboradores, estado, descripcion, date, responsable };
    setDatosGuardados(datos);
  
    // Enviar los datos al servidor para crear el proyecto
    axios.post('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/proyecto/', datos)
      .then(response => {
        console.log('Proyecto creado exitosamente:', response.data);
      })
      .catch(error => {
        console.error('Error al crear el proyecto:', error);
      });
  };
  


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center'  , backgroundColor: 'black'}}>
      <Text>Pantalla de Crear Proyectos de Administradores</Text>
      <View style={{ marginBottom: 20 }}>
        <Text>Nombre:</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
          value={nombre}
          onChangeText={setNombre}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text>Recursos:</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
          value={recursos}
          onChangeText={setRecursos}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text>Presupuesto:</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
          value={presupuesto}
          onChangeText={setPresupuesto}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>Colaboradores:</Text>
        <MultiSelectBox
          label="Selecciona colaboradores"
          items={colaboradoresDisponibles.map(colaborador => ({
            id: colaborador._id,
            label: colaborador.nombre,
          }))}
          selectedItems={colaboradores}
          onSelectedItemsChange={setColaboradores}
          searchPlaceholder="Buscar colaboradores"
          searchEmptyText="No hay resultados"
          searchNoResultsText="No hay resultados"
          onTapClose={() => console.log('Se cerró el selector')}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text>Estado:</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
          value={estado}
          onChangeText={setEstado}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text>Descripción:</Text>
        <TextInput
          multiline
          style={{ borderWidth: 1, borderColor: 'white', borderRadius: 5, padding: 5, width: 200, height: 100 }}
          value={descripcion}
          onChangeText={setDescripcion}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
      <Text>Fecha de Inicio:</Text>
      <SafeAreaView>
        <Button title="Show date picker!" onPress={() => showMode("date")} />
        {show && (
          <DateTimePicker
            value={date}
            mode= {mode}// Aquí corregimos el valor de la prop mode
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <Text>Fecha seleccionada: {date.toLocaleString()}</Text>
      </SafeAreaView>
    </View>
      <View style={{ marginBottom: 20 }}>
        <Text>Responsable:</Text>
        <Picker
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
        selectedValue={responsablesDisponibles.map(responsable => responsable._id)}
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue) {
            console.log("responsable seleccionado:", itemValue);
          } else {
            console.log("responsable seleccionado es null o undefined");
          }
          setColaboradorSeleccionado(itemValue);
        }}
        mode="multiple"
      >
        {responsablesDisponibles.map(responsable => (
          <Picker.Item
            key={responsable._id}
            label={`${responsable.nombre} - ${responsable._id}`}
            value={responsable._id}
          />
        ))}
      </Picker>
      </View>
      <Button title="Guardar" onPress={handleGuardar} />
      {datosGuardados && (
        <View>
          <Text>Datos guardados:</Text>
          <Text>{JSON.stringify(datosGuardados, null, 2)}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default CrearProyecto;