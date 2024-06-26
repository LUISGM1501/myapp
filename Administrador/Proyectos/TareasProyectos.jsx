// TareasProyectos.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Button, FlatList } from 'react-native';
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
  const [estado, setEstado] = useState('Pendiente');
  const [recursosEconomicos, setRecursosEconomicos] = useState('');
  const [tiempoEstimado, setTiempoEstimado] = useState('');
  const [storyPoints, setStoryPoints] = useState('');
  const [colaboradoresList, setColaboradoresList] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://requebackend-da0aea993398.herokuapp.com/api/proyecto/${searchId}`);
      const proyectoData = response.data;

      // Ensure colaboradores is always an array
      if (!Array.isArray(proyectoData.colaboradores)) {
        proyectoData.colaboradores = [];
      }

      setProyecto(proyectoData);

      // Cargar tareas del proyecto con detalles de los responsables
      const tareas = await Promise.all(
        proyectoData.tareas.map(async (tarea) => {
          const responsableResponse = await axios.get(`https://requebackend-da0aea993398.herokuapp.com/api/colaborador/${tarea.responsable}`);
          return {
            nombre: tarea.nombre,
            descripcion: tarea.descripcion,
            responsable: responsableResponse.data.nombre,
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
      const response = await axios.put(`https://requebackend-da0aea993398.herokuapp.com/api/proyecto/${proyecto._id}/add-task`, {
        nombre: newTaskName,
        descripcion: newTaskDescription,
        responsable: selectedTaskAssignee,
        estado: estado,
        recursosEconomicos: parseInt(recursosEconomicos),
        tiempoEstimado: parseInt(tiempoEstimado),
        storyPoints: parseInt(storyPoints),
      });

      // Resto del código para limpiar los campos y actualizar las listas
      setNewTaskName('');
      setNewTaskDescription('');
      setSelectedTaskAssignee('');
      setEstado('Pendiente');
      setRecursosEconomicos('');
      setTiempoEstimado('');
      setStoryPoints('');
      setProyecto(response.data.proyecto);
      loadProyectosList();
      handleSearch();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const loadProyectosList = async () => {
    try {
      const response = await axios.get('https://requebackend-da0aea993398.herokuapp.com/api/proyecto');
      setProyectosList(response.data);
    } catch (error) {
      console.error('Error loading projects list:', error);
    }
  };

  const loadColaboradoresList = async () => {
    try {
      const response = await axios.get('https://requebackend-da0aea993398.herokuapp.com/api/colaborador');
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
      <View style={{ height: 130, width: 345, backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginBottom: 20 }}>
        <Text style={{ color: 'black' }}>Proyecto ID:</Text>
        <Picker
          style={[inputStyle, { backgroundColor: '#9ACFE0' }]}
          selectedValue={searchId}
          onValueChange={(itemValue) => {
            if (itemValue) {
              console.log("Proyecto seleccionado:", itemValue);
              setSearchId(itemValue);
            } else {
              console.log("Proyecto seleccionado es null o undefined");
            }
          }}
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
      <Button color="#57AEBD" title="Buscar" onPress={handleSearch} />

      {proyecto && (
        <View style={{ backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginBottom: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 15, marginTop: 10, color: 'black', fontWeight: 'bold', marginBottom: 20 }}>Información del Proyecto:</Text>
          <Text style={{ color: 'black' }}>ID: {proyecto._id}</Text>
          <Text style={{ color: 'black' }}>Nombre: {proyecto.nombre}</Text>
          <Text style={{ color: 'black' }}>Recursos: {proyecto.recursos}</Text>
          <Text style={{ color: 'black' }}>Presupuesto: {proyecto.presupuesto}</Text>
          {proyecto.colaboradores && Array.isArray(proyecto.colaboradores) ? (
            <Text style={{ color: 'black' }}>Colaboradores: {proyecto.colaboradores.join(', ')}</Text>
          ) : (
            <Text style={{ color: 'black' }}>Colaboradores: N/A</Text>
          )}
          <Text style={{ fontSize: 15, marginTop: 20, color: 'black', fontWeight: 'bold', marginBottom: 10 }}>Tareas:</Text>
          <FlatList
            data={tareasProyecto}
            renderItem={({ item }) => (
              <View>
                <Text style={{ color: 'black' }}>Nombre: {item.nombre}</Text>
                <Text style={{ color: 'black' }}>Descripción: {item.descripcion}</Text>
                <Text style={{ color: 'black' }}>Responsable: {item.responsable}</Text>
                <Text style={{ color: 'black' }}>  </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text style={{ color: 'black' }}>Estado: {proyecto.estado}</Text>
          <Text style={{ color: 'black' }}>Descripción: {proyecto.descripcion}</Text>
          <Text style={{ color: 'black' }}>Fecha de Inicio: {proyecto.fecha_inicio}</Text>
          <Text style={{ color: 'black' }}>Responsable: {proyecto.responsable}</Text>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 15, marginTop: 20, color: 'black', fontWeight: 'bold', marginBottom: 10 }}>Agregar tarea:</Text>
            <TextInput
              style={inputStyle}
              placeholder="Nombre"
              placeholderTextColor={'black'}
              value={newTaskName}
              onChangeText={(text) => setNewTaskName(text)}
            />
            <TextInput
              style={inputStyle}
              placeholder="Descripción"
              placeholderTextColor={'black'}
              value={newTaskDescription}
              onChangeText={(text) => setNewTaskDescription(text)}
            />
            <TextInput
              style={inputStyle}
              placeholder="Recursos Económicos"
              placeholderTextColor={'black'}
              value={recursosEconomicos}
              onChangeText={(text) => setRecursosEconomicos(text)}
              keyboardType="numeric"
            />
            <TextInput
              style={inputStyle}
              placeholder="Tiempo Estimado en horas"
              placeholderTextColor={'black'}
              value={tiempoEstimado}
              onChangeText={(text) => setTiempoEstimado(text)}
              keyboardType="numeric"
            />
            <TextInput
              style={inputStyle}
              placeholder="Story Points"
              placeholderTextColor={'black'}
              value={storyPoints}
              onChangeText={(text) => setStoryPoints(text)}
              keyboardType="numeric"
            />
            <Picker
              selectedValue={selectedTaskAssignee}
              onValueChange={(itemValue) => setSelectedTaskAssignee(itemValue)}
              style={[inputStyle, { backgroundColor: '#BCCDE0', marginTop: 5, marginBottom: 25 }]}
            >
              <Picker.Item color='black' label="Seleccionar encargado" value="" />
              {colaboradoresList.map((colaborador) => (
                <Picker.Item key={colaborador._id} label={colaborador.nombre} value={colaborador._id} />
              ))}
            </Picker>
            <Button color="#57AEBD" title="Agregar tarea" onPress={handleAddTask} />
          </View>
        </View>
      )}
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

export default TareasProAd;
