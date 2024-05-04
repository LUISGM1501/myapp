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
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
      <Text>Consultar Proyecto</Text>
      <Text>Consultar Proyecto</Text>
      <Text>Consultar Proyecto</Text>
      <Text>Consultar Proyecto</Text>
      <Text>Consultar Proyecto</Text>
      <Text>Consultar Proyecto</Text>
      <TextInput
        placeholderTextColor= 'gray'
        placeholder="Search by ID"
        value={searchId}
        onChangeText={(text) => setSearchId(text)}
      />
      <Button title="Search" onPress={handleSearch} />
      {/* Información del Proyecto */}
      {proyecto && (
        
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>

              <Text>Información del Proyecto:</Text>
              <Text>ID: {proyecto._id}</Text>
              <Text>Nombre: {proyecto.nombre}</Text>
              <Text>Recursos: {proyecto.recursos}</Text>
              <Text>Presupuesto: {proyecto.presupuesto}</Text>
              <Text>Colaboradores: {proyecto.colaboradores.join(', ')}</Text>
              <Text>Estado: {proyecto.estado}</Text>
              <Text>Descripción: {proyecto.descripcion}</Text>
              <Text>Fecha de Inicio: {proyecto.fecha_inicio}</Text>
              <Text>Responsable: {proyecto.responsable}</Text>
              <Button title="Delete" onPress={handleDelete} />
            </ScrollView>
          <ScrollView>
            <View>
                <Picker
                  selectedValue={selectedField}
                  onValueChange={(itemValue) => setSelectedField(itemValue)}
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
                  value={newData}
                  onChangeText={(text) => setNewData(text)}
                />
                <Button title="Update" onPress={handleUpdate} />
            </View>
            
            {/* Lista de Tareas */}
            <View>
                <Text>Lista de Tareas:</Text>
                <ScrollView>
                  {proyecto.tareas.map((tarea) => (
                    <View key={tarea._id}>
                      {editingTask === tarea._id ? (
                        <View>
                          <TextInput
                            value={editedTaskName}
                            onChangeText={(text) => setEditedTaskName(text)}
                          />
                          <TextInput
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
                          <Text>Nombre: {tarea.nombre}</Text>
                          <Text>Descripción: {tarea.descripcion}</Text>
                          <Text>Responsable: {tarea.responsable}</Text>
                          <Button title="Borrar tarea" onPress={() => handleDeleteTask(tarea._id)} />
                          <Button title="Modificar tarea" onPress={() => setEditingTask(tarea._id)} />
                        </View>
                      )}
                    </View>
                  ))}
              </ScrollView>
            </View>
          </ScrollView>
          
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
  );
};

export default ConsultarProAd;