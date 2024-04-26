// TareasProyectos.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView,  Button, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const TareasProyectos = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>TareasProyectos</Text>
      <Button
        title="Abrir Menú"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

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
    <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Asignación de tareas de los proyectos</Text>
  
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, padding: 5 }}
        placeholder="Search by ID"
        value={searchId}
        onChangeText={(text) => setSearchId(text)}
      />
      <Button title="Search" onPress={handleSearch} />
  
      {proyecto && (
        <View>
          <Text style={{ fontSize: 16, marginTop: 10 }}>Información del Proyecto:</Text>
          <Text>ID: {proyecto._id}</Text>
          <Text>Nombre: {proyecto.nombre}</Text>
          <Text>Recursos: {proyecto.recursos}</Text>
          <Text>Presupuesto: {proyecto.presupuesto}</Text>
          <Text>Colaboradores: {proyecto.colaboradores.join(', ')}</Text>
          <Text>Tareas:</Text>
          <FlatList
            data={tareasProyecto}
            renderItem={({ item }) => (
              <View>
                <Text>Nombre: {item.nombre}</Text>
                <Text>Descripción: {item.descripcion}</Text>
                <Text>Responsable: {item.responsable}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text>Estado: {proyecto.estado}</Text>
          <Text>Descripción: {proyecto.descripcion}</Text>
          <Text>Fecha de Inicio: {proyecto.fecha_inicio}</Text>
          <Text>Responsable: {proyecto.responsable}</Text>
  
          <View style={{ marginTop: 10 }}>
            <Text>Agregar Tarea:</Text>
            <TextInput
              style={{ marginBottom: 5, borderWidth: 1, padding: 5 }}
              placeholder="Nombre"
              value={newTaskName}
              onChangeText={(text) => setNewTaskName(text)}
            />
            <TextInput
              style={{ marginBottom: 5, borderWidth: 1, padding: 5 }}
              placeholder="Descripción"
              value={newTaskDescription}
              onChangeText={(text) => setNewTaskDescription(text)}
            />
            <Picker
              selectedValue={selectedTaskAssignee}
              onValueChange={(itemValue) => setSelectedTaskAssignee(itemValue)}
              style={{ marginBottom: 5 }}
            >
              <Picker.Item label="Seleccionar encargado" value="" />
              {colaboradoresList.map((colaborador) => (
                <Picker.Item key={colaborador._id} label={colaborador.nombre} value={colaborador._id} />
              ))}
            </Picker>
            <Button title="Agregar Tarea" onPress={handleAddTask} />
          </View>
        </View>
      )}
  
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Proyectos disponibles:</Text>
        <ScrollView>
          {proyectosList.map((proyecto) => (
            <Text key={proyecto._id}>{proyecto._id} - {proyecto.nombre}</Text>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  </View>
  
  );
};

export default TareasProAd;