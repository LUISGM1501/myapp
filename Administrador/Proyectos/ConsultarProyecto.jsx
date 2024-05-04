// ConsultarProyecto.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView,  Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const ConsultarProyecto = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ConsultarProyecto</Text>
      <Button
        title="Abrir Menú"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};


const ConsultarProAd = () => {
  const [searchId, setSearchId] = useState('');
  const [proyecto, setProyecto] = useState(null);
  const [proyectosList, setProyectosList] = useState([]);
  const [colaboradoresList, setColaboradoresList] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');
  const [editedTaskState, setEditedTaskState] = useState('');
  const [editedTaskDescription, setEditedTaskDescription] = useState('');
  const [editedTaskAssignee, setEditedTaskAssignee] = useState('');

  const [selectedField, setSelectedField] = useState('');
  const [newData, setNewData] = useState('');


  const handleDelete = async () => {
      try {
          await axios.delete(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/proyecto/${proyecto._id}`);
          handleSearch();
      } catch (error) {
          console.error('Error deleting collaborator:', error);
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
          await axios.put(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/proyecto/${proyecto._id}`, { [selectedField]: newData });
          handleSearch();
      } catch (error) {
          console.error('Error updating project:', error);
      }
  };
  const handleSearch = async () => {
      if (!searchId) {
          alert('Por favor, introduce un ID_Proyecto antes de realizar la búsqueda!');
          return; // Exit the function early
      }
      try {
          const response = await axios.get(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/proyecto/${searchId}`);
          // Check if response data is empty
          if (response && !response.data) {
              alert('No se encontró ningún proyecto con el ID proporcionado.');
              return; // Exit the function early
          }
          setProyecto(response.data);
          loadColaboradoresList();
      } catch (error) {
          alert('No se encontró ningún proyecto con el ID proporcionado.');
          console.error('Error searching for project:', error);
      }
  };
  const handleDeleteTask = async (taskId) => {
    try {
        await axios.delete(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/proyecto/${proyecto._id}/delete-task/${taskId}`);
        handleSearch();
    } catch (error) {
        console.error('Error deleting task:', error);
        console.error('Error response data:', error.response.data); // Agrega esta línea para mostrar los datos de la respuesta del error
    }
};

  const handleEditTask = async (taskId) => {
      try {
          await axios.put(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/proyecto/${proyecto._id}/edit-task/${taskId}`, {
              nombre: editedTaskName,
              descripcion: editedTaskDescription,
              responsable: editedTaskAssignee,
              estado: editedTaskState,
          });
          setEditingTask(null);
          setEditedTaskName('');
          setEditedTaskState('');
          setEditedTaskDescription('');
          setEditedTaskAssignee('');
          handleSearch();
      } catch (error) {
          console.error('Error editing task:', error);
          console.error('Error response data:', error.response.data);
      }
  };
  useEffect(() => {
      loadProyectosList();
  }, []);
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

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', padding: 20 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>Consulta y modificación de proyectos</Text>
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
      {/* Información del Proyecto */}
      {proyecto && (
        
        <View style={{ backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginBottom: 20 }}>
                         
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>Información del Proyecto:</Text>
              <Text style={{ color: 'black' }}>ID: {proyecto._id}</Text>
              <Text style={{ color: 'black' }}>Nombre: {proyecto.nombre}</Text>
              <Text style={{ color: 'black' }}> Recursos: {proyecto.recursos}</Text>
              <Text style={{ color: 'black' }}>Presupuesto: {proyecto.presupuesto}</Text>
              <Text style={{ color: 'black' }}>Colaboradores: {proyecto.colaboradores.join(', ')}</Text>
              <Text style={{ color: 'black' }}>Estado: {proyecto.estado}</Text>
              <Text style={{ color: 'black' }}>Descripción: {proyecto.descripcion}</Text>
              <Text style={{ color: 'black' }}>Fecha de Inicio: {proyecto.fecha_inicio}</Text>
              <Text style={{ color: 'black' }}>Responsable: {proyecto.responsable}</Text>
              <Button color="#FA1946" title="Delete" onPress={handleDelete} />
            
          
            <View>
                <Picker
                  selectedValue={selectedField}
                  onValueChange={(itemValue) => setSelectedField(itemValue)}
                  style={{ backgroundColor: 'lightgray', marginBottom: 10, color: 'black' }}
                >
                  <Picker.Item label="Nombre" value="nombre" />
                  <Picker.Item label="Recursos" value="recursos" />
                  <Picker.Item label="Presupuesto" value="presupuesto" />
                  <Picker.Item label="Estado" value="estado" />
                  <Picker.Item label="Descripcion" value="descripcion" />
                  <Picker.Item label="Fecha de Inicio" value="fecha_inicio" />
                  <Picker.Item label="Estado" value="estado" />
                </Picker>
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
                  value={newData}
                  onChangeText={(text) => setNewData(text)}
                />
                <Button color="#32C28B" title="Update" onPress={handleUpdate} />
            </View>
            
            {/* Lista de Tareas */}
            <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 20, marginBottom: 20, color: 'black' }}>Lista de tareas:</Text>
                  {proyecto.tareas.map((tarea) => (
                    <View key={tarea._id}>
                      {editingTask === tarea._id ? (
                        <View>
                          <TextInput
                            value={editedTaskName}
                            onChangeText={(text) => setEditedTaskName(text)}
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
                            value={editedTaskDescription}
                            onChangeText={(text) => setEditedTaskDescription(text)}
                          />
                          <Picker
                            selectedValue={editedTaskAssignee}
                            onValueChange={(itemValue) => setEditedTaskAssignee(itemValue)}
                          >
                            <Picker.Item label="Seleccionar encargado" value="" />
                            {colaboradoresList.map((colaborador) => (
                              <Picker.Item key={colaborador._id} label={colaborador.nombre} value={colaborador._id} />
                            ))}
                          </Picker>
                          <Picker
                            selectedValue={editedTaskState}
                            onValueChange={(itemValue) => setEditedTaskState(itemValue)}
                          >
                            <Picker.Item label="Seleccionar estado" value="" />
                            <Picker.Item label="Pendiente" value="Pendiente" />
                            <Picker.Item label="En Progreso" value="En Progreso" />
                            <Picker.Item label="Terminada" value="Terminada" />
                          </Picker>
                          <Button title="Guardar cambios" onPress={() => handleEditTask(tarea._id)} />
                        </View>
                      ) : (
                        <View>
                          <Text style={{ color: 'black' }}>Nombre: {tarea.nombre}</Text>
                          <Text style={{ color: 'black' }}>Descripción: {tarea.descripcion}</Text>
                          <Text style={{ color: 'black' }}>Responsable: {tarea.responsable}</Text>
                          <Button color="#FA2719" title="Borrar tarea" onPress={() => handleDeleteTask(tarea._id)} />
                          <Button color="#FAB223" title="Modificar tarea" onPress={() => setEditingTask(tarea._id)} />
                        </View>
                      )}
                    </View>
                  ))}
              
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
      </View>
    </ScrollView>
  );
};

export default ConsultarProAd;