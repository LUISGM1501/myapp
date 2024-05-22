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
    axios.get('https://requebackend-da0aea993398.herokuapp.com/api/colaborador')
      .then(response => {
        setColaboradoresDisponibles(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los colaboradores:', error);
      });

    // Obtener la lista de responsables disponibles
    axios.get('https://requebackend-da0aea993398.herokuapp.com/api/Admin')
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
    axios.post('https://requebackend-da0aea993398.herokuapp.com/api/proyecto/', datos)
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
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', padding: 20 }}>
      <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>Ingreso de información:</Text>
      <View style={{ backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginBottom: 20 }}>
      <View style={{ marginBottom: 20 }}>
      <Text style={{ color: 'black' }}>Nombre:</Text>
        <TextInput
          style={inputStyle}
          value={nombre}
          onChangeText={setNombre}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
      <Text style={{ color: 'black' }}>Recursos:</Text>
        <TextInput
          style={inputStyle}
          value={recursos}
          onChangeText={setRecursos}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
      <Text style={{ color: 'black' }}>Presupuesto:</Text>
        <TextInput
          style={inputStyle}
          value={presupuesto}
          onChangeText={setPresupuesto}
          keyboardType="numeric"
        />
      </View>
      <View style={{ marginBottom: 10 }}>
      <Text style={{ color: 'black' }}>Colaboradores:</Text>
      <DropDownPicker
          items={colaboradoresDisponibles.map(colaborador => ({ label: colaborador.nombre, value: colaborador._id }))}
          open = {isOpen} 
          setOpen ={() => setIsOpen(!isOpen)}
          value = {colaboradores}
          setValue = {(val) => setColaboradores(val)}
          
          containerStyle={{ height: 40, width: 300 }}
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
          style={[inputStyle, { backgroundColor: '#9ACFE0' }]}
        />
    </View>
      <View style={{ marginBottom: 20 }}>
      <Text style={{ color: 'black' }}>Estado:</Text>
        <TextInput
          style={inputStyle}
          value={estado}
          onChangeText={setEstado}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
      <Text style={{ color: 'black' }}>Descripción:</Text>
        <TextInput
          multiline
          style={inputStyle}
          value={descripcion}
          onChangeText={setDescripcion}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
      <Text style={{ color: 'black' }}>Fecha de Inicio:</Text>
      <SafeAreaView>
        <Button color="#8CBBE0" title="Seleccionar Fecha" onPress={() => showMode("date")} />
        {show && (
          <DateTimePicker
            value={fecha_inicio}
            mode= {mode}// Aquí corregimos el valor de la prop mode
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <Text style={{ color: 'gray' }}>Fecha seleccionada: {fecha_inicio.toLocaleString()}</Text>
      </SafeAreaView>
    </View>
    <View style={{ marginBottom: 20 }}>
    <Text style={{ color: 'black' }}>Responsable:</Text>
        <Picker
        style={[inputStyle, { backgroundColor: '#9ACFE0' }]}
        selectedValue={responsablesDisponibles.map(responsable => responsable._id)}
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue) {
            console.log("Responsable seleccionado:", itemValue);
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
      </View>
      <Button color = '#4EBC7B' title="Guardar" onPress={handleGuardar} />
      {datosGuardados && (
        <View>
          <Text>Datos guardados:</Text>
          <Text>{JSON.stringify(datosGuardados, null, 2)}</Text>
        </View>
      )}
      </View>

      <View>
        <Text style={{ color: 'black' }}>Colaboradores:</Text>
        {colaboradoresDisponibles.map(colaborador => (
          <Text key={colaborador._id} style={{color:'black'}}>{colaborador.nombre}</Text>
        ))}
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

export default CrearProyecto;