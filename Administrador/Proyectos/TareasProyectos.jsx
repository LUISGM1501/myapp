// TareasProyectos.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView,  Button, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';


const TareasProAd = () => {
  const [searchId, setSearchId] = useState('');
  const [proyecto, setProyecto] = useState(null);
  const [tareasProyecto, setTareasProyecto] = useState([]);
  const [proyectosList, setProyectosList] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [selectedTaskAssignee, setSelectedTaskAssignee] = useState('');
  const [colaboradoresList, setColaboradoresList] = useState([]);

  const handleSearch = async () => {
      try {
          const response = await axios.get(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/proyecto/${searchId}`);
          setProyecto(response.data);

          // Cargar tareas del proyecto con detalles de los responsables
          const tareas = await Promise.all(
              response.data.tareas.map(async (tarea) => {
                  const responsableResponse = await axios.get(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/colaborador/${tarea.responsable}`);
                  return {
                      nombre: tarea.nombre,
                      descripcion: tarea.descripcion,
                      responsable: responsableResponse.data.nombre
                  };
              })
          );
          setTareasProyecto(tareas);
      } catch (error) {
          console.error('Error searching for project:', error);
      }
  };

  const handleAddTask = async () => {
      try {
          const response = await axios.put(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/proyecto/${proyecto._id}/add-task`, {
              nombre: newTaskName,
              descripcion: newTaskDescription,
              responsable: selectedTaskAssignee
          });
          setNewTaskName('');
          setNewTaskDescription('');
          setSelectedTaskAssignee('');
          setProyecto(response.data.proyecto);
          loadProyectosList();
          handleSearch();
      } catch (error) {
          console.error('Error adding task:', error);
      }
  };

  const loadProyectosList = async () => {
      try {
          const response = await axios.get('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/proyecto');
          setProyectosList(response.data);
      } catch (error) {
          console.error('Error loading projects list:', error);
      }
  };

  const loadColaboradoresList = async () => {
      try {
          const response = await axios.get('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/colaborador');
          setColaboradoresList(response.data);
      } catch (error) {
          console.error('Error loading collaborators list:', error);
      }
  };

  useEffect(() => {
      loadProyectosList();
      loadColaboradoresList();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', padding: 20 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>Tareas asignadas</Text>
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
          placeholder="Search by ID"
          value={searchId}
          onChangeText={(text) => setSearchId(text)}
        />
        <Button title="Search" onPress={handleSearch} />
  
        {proyecto && (
        <View style={{ backgroundColor: 'lightgray',  padding: 20, borderRadius: 10, marginBottom: 20}}>
          <Text style={{ fontSize: 15, marginTop: 10 , color: 'black', fontWeight: 'bold', marginBottom: 20}}>Información del Proyecto:</Text>
          <Text style={{ color: 'black' }}>ID: {proyecto._id}</Text>
          <Text style={{ color: 'black' }}>Nombre: {proyecto.nombre}</Text>
          <Text style={{ color: 'black' }}>Recursos: {proyecto.recursos}</Text>
          <Text style={{ color: 'black' }}>Presupuesto: {proyecto.presupuesto}</Text>
          <Text style={{ color: 'black' }}>Colaboradores: {proyecto.colaboradores.join(', ')}</Text>
          <Text  style={{ fontSize: 15, marginTop: 20 , color: 'black', fontWeight: 'bold', marginBottom: 10}}>Tareas:</Text>
          <FlatList
            data={tareasProyecto}
            renderItem={({ item }) => (
              <View>
                <Text style={{ color: 'black' }}>Nombre: {item.nombre}</Text>
                <Text style={{ color: 'black' }}>Descripción: {item.descripcion}</Text>
                <Text style={{ color: 'black' }}>Responsable: {item.responsable}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text style={{ color: 'black' }}>Estado: {proyecto.estado}</Text>
          <Text style={{ color: 'black' }}>Descripción: {proyecto.descripcion}</Text>
          <Text style={{ color: 'black' }}>Fecha de Inicio: {proyecto.fecha_inicio}</Text>
          <Text style={{ color: 'black' }}>Responsable: {proyecto.responsable}</Text>
  
          <View style={{ marginTop: 10 }}>
          <Text  style={{ fontSize: 15, marginTop: 20 , color: 'black', fontWeight: 'bold', marginBottom: 10}}>Agregar tarea:</Text>
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
              placeholder="Nombre"
              value={newTaskName}
              onChangeText={(text) => setNewTaskName(text)}
            />
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
              placeholder="Descripción"
              value={newTaskDescription}
              onChangeText={(text) => setNewTaskDescription(text)}
            />
            <Picker
              selectedValue={selectedTaskAssignee}
              onValueChange={(itemValue) => setSelectedTaskAssignee(itemValue)}
              style={{ marginBottom: 5 }}
            >
              <Picker.Item color = 'black' label="Seleccionar encargado" value="" />
              {colaboradoresList.map((colaborador) => (
                <Picker.Item key={colaborador._id} label={colaborador.nombre} value={colaborador._id} />
              ))}
            </Picker>
            <Button title="Agregar Tarea" onPress={handleAddTask} />
          </View>
        </View>
      )}
  
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>Proyectos disponibles</Text>
          
              {proyectosList.map((proyecto) => (
                <Text style={{ color: 'black' }} key={proyecto._id}>{proyecto._id} - {proyecto.nombre}</Text>
              ))}
            
          </View>
      </View>
      
    </ScrollView>
    
  );
};

export default TareasProAd;