// CrearProyecto.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView,  Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const CrearProyecto = () => {
  const [nombre, setNombre] = useState('');
  const [recursos, setRecursos] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState([]);
  const [estado, setEstado] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [responsable, setResponsable] = useState('');
  const [colaboradoresDisponibles, setColaboradoresDisponibles] = useState([]);
  const [responsablesDisponibles, setResponsablesDisponibles] = useState([]);
  const [datosGuardados, setDatosGuardados] = useState(null);

  const [fecha_inicio, setFecha_inicio] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const [isOpen,setIsOpen] = useState(false);


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
    setFecha_inicio(selectedDate);
    setShow(false);
  };

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  const handleGuardar = () => {
    // Check if any field is undefined
    if (!nombre || !recursos || !presupuesto || !colaboradores || !estado || !descripcion ||
        !fecha_inicio || !responsable    ) {
      alert('Por favor, completa todos los campos antes de guardar.');
      // Si todos los campos están completos, imprimir los datos
      
      return; // Exit the function early
    }
  
    const datos = { nombre, recursos, presupuesto, colaboradores, estado, descripcion, fecha_inicio, responsable };
    setDatosGuardados(datos);
    console.log('Nombre:', nombre);
    console.log('Recursos:', recursos);
    console.log('Presupuesto:', presupuesto);
    console.log('Colaboradores:', colaboradores);
    console.log('Estado:', estado);
    console.log('Descripción:', descripcion);
    console.log('Fecha:', fecha_inicio.toLocaleDateString());
    console.log('Responsable:', responsable);
    // Enviar los datos al servidor para crear el proyecto
    axios.post('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/proyecto/', datos)
      .then(response => {
        console.log('Proyecto creado exitosamente:', response.data);
      })
      .catch(error => {
        console.error('Error al crear el proyecto:', error);
        console.log('Detalles del error:', error.response);
      });
  };
  ;

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
      <DropDownPicker
          items={colaboradoresDisponibles.map(colaborador => ({ label: colaborador.nombre, value: colaborador._id }))}
          open = {isOpen} 
          setOpen ={() => setIsOpen(!isOpen)}
          value = {colaboradores}
          setValue = {(val) => setColaboradores(val)}
          
          containerStyle={{ height: 40, width: 200 }}
          maxHeight={200}
          autoScroll
          
          placeholder='Seleccionar Colabs'
          searchable={true}
          searchablePlaceholder="Buscar colaboradores"
          showTickIcon = {true}
          showArrowIcon = {true}
          
          multiple = {true}
          onChangeItem={item => setColaboradores(item.value)}
          min ={1}
          mode = "BADGE"
          badgeColors={['black']}
          badegeDotColor = {['white']}
          badgeTextStyle ={{color: 'white'}}
          
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
            value={fecha_inicio}
            mode= {mode}// Aquí corregimos el valor de la prop mode
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <Text>Fecha seleccionada: {fecha_inicio.toLocaleString()}</Text>
      </SafeAreaView>
    </View>
    <View style={{ marginBottom: 20 }}>
        <Text>Responsable:</Text>
        <Picker
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
        selectedValue={responsablesDisponibles.map(responsable => responsable._id)}
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue) {
            console.log("esponsable seleccionado:", itemValue);
          } else {
            console.log("responsable seleccionado es null o undefined");
          }
          setResponsable(itemValue);
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