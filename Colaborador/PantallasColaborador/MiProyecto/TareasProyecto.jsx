import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const TareasProyecto = () => {
  const [tareas, setTareas] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [projectsList, setProjectsList] = useState([]);
  const [responsablesMap, setResponsablesMap] = useState({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://requebackend-da0aea993398.herokuapp.com/api/proyecto');
      console.log('Proyectos obtenidos:', response.data);
      setProjectsList(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchResponsableName = async (responsableId) => {
    try {
      const response = await axios.get(`https://requebackend-da0aea993398.herokuapp.com/api/colaborador/${responsableId}`);
      const responsable = response.data;
      return responsable.nombre;
    } catch (error) {
      console.error('Error fetching responsable:', error);
      return 'Desconocido';
    }
  };

  const handleProjectSelect = async () => {
    if (!selectedProjectId) {
      // Si no se ha seleccionado un proyecto, mostrar alerta y salir de la función
      alert('Selecciona un proyecto');
      return;
    }
    try {
      console.log('Proyecto seleccionado:', selectedProjectId);
      const response = await axios.get(`https://requebackend-da0aea993398.herokuapp.com/api/proyecto/${selectedProjectId}`);
      console.log('Respuesta del servidor:', response.data);
      const project = response.data;
      setTareas(project.tareas);
      console.log('Tareas del proyecto:', project.tareas);
  
      const uniqueResponsableIds = new Set(project.tareas.map(tarea => tarea.responsable));
      const newResponsablesMap = {};
      for (const responsableId of uniqueResponsableIds) {
        newResponsablesMap[responsableId] = await fetchResponsableName(responsableId);
      }
      setResponsablesMap(newResponsablesMap);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas de un Proyecto</Text>
      <View style={styles.selectContainer}>
        <Text style={{color:'black'}}>Selecciona un proyecto:</Text>
        <Picker
          selectedValue={selectedProjectId}
          style={[inputStyle, { backgroundColor: '#9ACFE0', marginBottom:20, marginTop:10}]}
          
          onValueChange={(itemValue, itemIndex) => setSelectedProjectId(itemValue)}
        >
          <Picker.Item label="Selecciona un proyecto" value="" style={{color:'black'}}/>
          {projectsList.map(project => (
            <Picker.Item key={project._id} label={project.nombre} value={project._id} />
          ))}
        </Picker>
        <Button color = '#57AEBD' title="Seleccionar" onPress={handleProjectSelect} />
      </View>
      <ScrollView horizontal>
        <View style={styles.taskStateContainer}>
          <Text style={styles.taskHeader}>Pendiente</Text>
          {tareas.filter(tarea => tarea.estado === 'Pendiente').map((tarea, index) => (
            <View key={index} style={styles.taskItem}>
              <Text style={styles.taskTitle}>{tarea.nombre}</Text>
              <Text style={{color:'black'}}><Text style={styles.boldText}>Descripción:</Text > {tarea.descripcion}</Text>
              <Text style={{color:'black'}}><Text style={styles.boldText}>Responsable:</Text> {responsablesMap[tarea.responsable]}</Text>
            </View>
          ))}
        </View>
        <View style={styles.taskStateContainer}>
          <Text style={styles.taskHeader}>En Progreso</Text>
          {tareas.filter(tarea => tarea.estado === 'En Progreso').map((tarea, index) => (
            <View key={index} style={styles.taskItem}>
              <Text style={styles.taskTitle}>{tarea.nombre}</Text>
              <Text><Text style={styles.boldText}>Descripción:</Text> {tarea.descripcion}</Text>
              <Text><Text style={styles.boldText}>Responsable:</Text> {responsablesMap[tarea.responsable]}</Text>
            </View>
          ))}
        </View>
        <View style={styles.taskStateContainer}>
          <Text style={styles.taskHeader}>Terminada</Text>
          {tareas.filter(tarea => tarea.estado === 'Terminada').map((tarea, index) => (
            <View key={index} style={styles.taskItem}>
              <Text style={styles.taskTitle}>{tarea.nombre}</Text>
              <Text><Text style={styles.boldText}>Descripción:</Text> {tarea.descripcion}</Text>
              <Text><Text style={styles.boldText}>Responsable:</Text> {responsablesMap[tarea.responsable]}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:  'black', 
  },
  selectContainer: {
    marginBottom: 20,
  },
  taskStateContainer: {
    marginRight: 20, // Espacio entre cada contenedor de estado
  },
  taskHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  taskItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    minWidth: 250, // Ancho mínimo para cada tarea
  },
  taskTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black'
  },
  boldText: {
    fontWeight: 'bold',
    color:'black'
  },
});

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

export default TareasProyecto;
