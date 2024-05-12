// CrearReunion.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView,  Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

import DropDownPicker from 'react-native-dropdown-picker';

import axios from 'axios';

const CrearReunion = () => {
  const [proyectoId, setProyectoId] = useState('');
  const [tema, setTema] = useState('');
  const [medio, setMedio] = useState('');
  const [link, setLink] = useState('');

  const [fecha, setFecha] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [hora, setHora] = useState(new Date());

  const [duracionHoras, setDuracionHoras] = useState('');
  const [colaboradores, setColaboradores] = useState([]);
  const [administradores, setAdministradores] = useState([]);
  const [proyectosList, setProyectosList] = useState([]);
  const [colaboradoresDisponibles, setColaboradoresDisponibles] = useState([]);
  const [administradoresDisponibles, setAdministradoresDisponibles] = useState([]);
  const [datosGuardados, setDatosGuardados] = useState(null);

  const [isOpen,setIsOpen] = useState(false);
  const [isOpenAdmin,setIsOpenAdmin] = useState(false);

  useEffect(() => {
    loadProyectosList();
    loadColaboradoresDisponibles();
    loadAdministradoresDisponibles();
  }, []);

  const loadProyectosList = async () => {
    try {
      const response = await axios.get('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/proyecto');
      setProyectosList(response.data);
    } catch (error) {
      console.error('Error loading projects list:', error);
    }
  };

  const loadColaboradoresDisponibles = async () => {
    try {
      const response = await axios.get('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/colaborador');
      setColaboradoresDisponibles(response.data);
    } catch (error) {
      console.error('Error loading available collaborators:', error);
    }
  };

  const loadAdministradoresDisponibles = async () => {
    try {
      const response = await axios.get('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/Admin');
      setAdministradoresDisponibles(response.data);
    } catch (error) {
      console.error('Error loading available administrators:', error);
    }
  };
  
  
  const onChangeDate = (event, selectedDate) => {
    setFecha(selectedDate);
    setShow(false);
  };

  const onChangeTime = (event, selectedTime) => {
    setShow(false); // Ocultar el selector de hora
    if (selectedTime) {
      // Si se seleccionó una hora, actualiza el estado de fecha con la hora seleccionada
      const horaSeleccionada = selectedTime.getHours();
      const minutosSeleccionados = selectedTime.getMinutes();
       // Restar 6 horas
      const nuevaHora =horaSeleccionada >= 6 ? horaSeleccionada - 6 : horaSeleccionada + 18;
    
    // Crear una nueva fecha con la hora restada
      const nuevaFecha = new Date(fecha);
      nuevaFecha.setHours(nuevaHora, minutosSeleccionados, 0);
      setFecha(nuevaFecha);
    }
  };

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  const handleCrearReunion = async () => {
    if (!proyectoId.trim() || !tema || !medio || !link || !fecha || !colaboradores || !administradores || !duracionHoras) {
      alert('Por favor, completa todos los campos antes de guardar.');
      return; // Salir de la función temprano si falta algún campo
    }
  
    const colaboradoresSeleccionados = colaboradores.concat(administradores);
    const correosColaboradores = colaboradoresSeleccionados.map(colaborador => colaborador.correo);

    const datos = {
      proyecto: proyectoId.trim(),
      tema,
      medio,
      link,
      fecha,
      duracionHoras,
      colaboradores: colaboradoresSeleccionados,
    };

    try {
      const response = await axios.get(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/proyecto/${proyectoId}`);
      
      if (!response.data) {
        alert('No se encontró ningún proyecto con el ID proporcionado!');
        return; // Salir de la función temprano si no se encontró el proyecto
      }
      
      alert('Reunión creada.');

      // Crear la reunión en el backend
      console.log('datos: ', datos);
      const posting = await axios.post('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/reunion', datos);
      if (!posting.data) {
        console.log('datos: ', datos);
        return; // Salir de la función temprano si no se encontró el proyecto
      }
      console.log('Reunión creada exitosamente');
      // Limpiar los campos después de crear la reunión
      setProyectoId('');
      setTema('');
      setMedio('');
      setLink('');
      setFecha(new Date());
      setHora(new Date());
      setDuracionHoras('');
      setColaboradores([]);
      setAdministradores([])
    } catch (error) {
      alert('Error en la creacion de la reunion.');
      setProyectoId('');
      setTema('');
      setMedio('');
      setLink('');
      setFecha(new Date()); //seteamos la fecha actual nuevamente
      setHora(new Date()); //seteamos la fecha actual nuevamente
      setDuracionHoras('');
      setColaboradores([]);
      setAdministradores([])
      console.error('Error al crear la reunión:', error.response.data);
    }
  };
  
  // Calcula la fecha con 6 horas adicionales para mostrar en la interfaz
  const fechaMostrada = new Date(fecha);
  fechaMostrada.setHours(fechaMostrada.getHours() + 6);

  return (
    <View style={{ flex: 1 }}>
  <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' , backgroundColor: 'black'}}>
    <Text style={{ fontSize: 20, borderColor: 'white', marginBottom: 10 }}>Crear Reunión de Proyectos</Text>

    <View style={{ marginBottom: 10 }}>
    <Text>Proyecto ID:</Text>
        <Picker
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
        selectedValue={proyectosList.map(proyecto => proyecto._id)}
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue) {
            console.log("Proyecto seleccionado:", itemValue);
            setProyectoId(itemValue);
          } else {
            console.log("Proyecto seleccionado es null o undefined");
          }
          
        }}
        mode="multiple"
      >
        {proyectosList.map(proyecto => (
          <Picker.Item
            key={proyecto._id}
            label={`${proyecto.nombre} - ${proyecto._id}`}
            value={proyecto._id}
          />
        ))}
      </Picker>
    </View>

    <View style={{ marginBottom: 10 }}>
      <Text>Tema:</Text>
      <TextInput
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
        value={tema}
        onChangeText={setTema}
      />
    </View>

    <View style={{ marginBottom: 10 }}>
      <Text>Medio:</Text>
      <TextInput
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
        value={medio}
        onChangeText={setMedio}
      />
    </View>

    <View style={{ marginBottom: 10 }}>
      <Text>Enlace:</Text>
      <TextInput
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
        value={link}
        onChangeText={setLink}
      />
    </View>

    <View style={{ marginBottom: 20 }}>
      <Text>Fecha:</Text>
      <SafeAreaView>
        <Button title="Show date picker!" onPress={() => showMode("date")} />
        <Button title="Show time picker!" onPress={() => showMode("time")} />
        {show && (
          <DateTimePicker
            value={fecha}
            mode= {mode}// Aquí corregimos el valor de la prop mode
            is24Hour={false}
            onChange={mode === 'date' ? onChangeDate : onChangeTime}
          />
        )}
        <Text>Fecha seleccionada: {fechaMostrada.toLocaleString()}</Text>
      </SafeAreaView>
    </View>

    <View style={{ marginBottom: 10 }}>
    <Text>Hora:</Text>
      
    </View>

    <View style={{ marginBottom: 10 }}>
      <Text>Duración en Horas:</Text>
      <TextInput
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
        value={duracionHoras}
        onChangeText={setDuracionHoras}
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

    <View style={{ marginBottom: 10 }}>
      <Text>Administradores:</Text>
      <DropDownPicker
          items={administradoresDisponibles.map(administrador => ({ label: administrador.nombre, value: administrador._id }))}
          open = {isOpenAdmin} 
          setOpen ={() => setIsOpenAdmin(!isOpenAdmin)}
          value = {administradores}
          setValue = {(val) => setAdministradores(val)}
          
          containerStyle={{ height: 40, width: 200 }}
          maxHeight={200}
          autoScroll
          
          placeholder='Seleccionar Admins'
          searchable={true}
          searchablePlaceholder="Buscar administradores"
          showTickIcon = {true}
          showArrowIcon = {true}
          
          multiple = {true}
          onChangeItem={item => setAdministradores(item.value)}
          min ={1}
          mode = "BADGE"
          badgeColors={['black']}
          badegeDotColor = {['white']}
          badgeTextStyle ={{color: 'white'}}
          
        />
    </View>

    <Button
      title="Crear Reunión"
      onPress={handleCrearReunion}
    />

    

    {datosGuardados && (
      <View>
        <Text style={{ fontSize: 16, marginTop: 10 }}>Datos guardados:</Text>
        <Text>{JSON.stringify(datosGuardados, null, 2)}</Text>
      </View>
    )}
  </ScrollView>
</View>


  );
};

export default CrearReunion;