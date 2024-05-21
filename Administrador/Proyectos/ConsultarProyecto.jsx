// ConsultarProyecto.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView,  Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  const [recursosEconomicos, setRecursosEconomicos] = useState('');
  const [tiempoEstimado, setTiempoEstimado] = useState('');
  const [storyPoints, setStoryPoints] = useState('');
  const [editedTaskDescription, setEditedTaskDescription] = useState('');
  const [editedTaskAssignee, setEditedTaskAssignee] = useState('');

  const [selectedField, setSelectedField] = useState('');
  const [newData, setNewData] = useState('');





  const handleDelete = async () => {
      try {
          await axios.delete(`https://requebackend-da0aea993398.herokuapp.com/api/proyecto/${proyecto._id}`);
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
          await axios.put(`https://requebackend-da0aea993398.herokuapp.com/api/proyecto/${proyecto._id}`, { [selectedField]: newData });
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
          const response = await axios.get(`https://requebackend-da0aea993398.herokuapp.com/api/proyecto/${searchId}`);
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
        await axios.delete(`https://requebackend-da0aea993398.herokuapp.com/api/proyecto/${proyecto._id}/delete-task/${taskId}`);
        handleSearch();
    } catch (error) {
        console.error('Error deleting task:', error);
        console.error('Error response data:', error.response.data); // Agrega esta línea para mostrar los datos de la respuesta del error
    }
};

  const handleEditTask = async (taskId) => {
      try {
          await axios.put(`https://requebackend-da0aea993398.herokuapp.com/api/proyecto/${proyecto._id}/edit-task/${taskId}`, {
              nombre: editedTaskName,
              descripcion: editedTaskDescription,
              responsable: editedTaskAssignee,
              estado: editedTaskState,
              recursosEconomicos: parseInt(recursosEconomicos),
              tiempoEstimado: parseInt(tiempoEstimado),
              storyPoints: parseInt(storyPoints),
          });
          setEditingTask(null);
          setEditedTaskName('');
          setEditedTaskState('');
          setRecursosEconomicos('');
          setTiempoEstimado('');
          setStoryPoints('');
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



  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', padding: 20 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>Consulta y modificación de proyectos</Text>
        <View style={{ height: 130, width: 345 ,backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginBottom: 20 }}>
        <Text style={{ color: 'black' }}>Proyecto ID:</Text>
            <Picker
            style={[inputStyle, { backgroundColor: '#9ACFE0' }]}
            selectedValue={proyectosList.map(proyecto => proyecto._id)}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue) {
                console.log("Proyecto seleccionado:", itemValue);
                setSearchId(itemValue);
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
      <Button color= "#57AEBD" title="Buscar" onPress={handleSearch} />
      {/* Información del Proyecto */}
      {proyecto && (
        
        <View style={{ backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginTop:20, marginBottom: 20 }}>
                         
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>Información del Proyecto:</Text>
              <Text style={{ color: 'black' }}>ID: {proyecto._id}</Text>
              <Text style={{ color: 'black' }}>Nombre: {proyecto.nombre}</Text>
              <Text style={{ color: 'black' }}>Recursos: {proyecto.recursos}</Text>
              <Text style={{ color: 'black' }}>Presupuesto: {proyecto.presupuesto}</Text>
              <Text style={{ color: 'black' }}>Colaboradores: {proyecto.colaboradores.join(', ')}</Text>
              <Text style={{ color: 'black' }}>Estado: {proyecto.estado}</Text>
              <Text style={{ color: 'black' }}>Descripción: {proyecto.descripcion}</Text>
              <Text style={{ color: 'black' }}>Fecha de Inicio: {proyecto.fecha_inicio}</Text>
              <Text style={{ color: 'black' }}>Responsable: {proyecto.responsable}</Text>
              <Button color="#57AEBD" title="Eliminar" onPress={handleDelete} />
      
            <View>
            <Picker
              style={[inputStyle, { backgroundColor: '#BCCDE0', marginTop: 20 }]}
              selectedValue={selectedField}
              onValueChange={(itemValue) => {
                setSelectedField(itemValue);
                if (itemValue === 'fecha') {
                  setMostrarBoton(true); // Mostrar el botón solo cuando se selecciona "Fecha"
                } else {
                  setMostrarBoton(false); // Ocultar el botón para otros valores seleccionados
                }
              }}
            >
              <Picker.Item label="Nombre" value="nombre" />
              <Picker.Item label="Recursos" value="recursos" />
              <Picker.Item label="Presupuesto" value="presupuesto" />
              <Picker.Item label="Estado" value="estado" />
              <Picker.Item label="Descripcion" value="descripcion" />
              <Picker.Item label="Estado" value="estado" />
            </Picker>
            <TextInput
                placeholder='Nuevo valor'
                placeholderTextColor={'gray'}
                style={inputStyle}
                value={newData}
                onChangeText={(text) => setNewData(text)}
                keyboardType={(selectedField === 'presupuesto') ? 'numeric' : 'default'}
              />
            
              <Button color="#4EBC7B" title="Actualizar" onPress={handleUpdate} />
            </View>
            
            {/* Lista de Tareas */}
            <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 20, marginBottom: 20, color: 'black' }}>Lista de tareas:</Text>
                  {proyecto.tareas.map((tarea) => (
                    <View key={tarea._id}>
                      {editingTask === tarea._id ? (
                        <View>
                          <TextInput
                            placeholder='Nombre de la tarea'
                            placeholderTextColor={'gray'}
                            style={inputStyle}
                            value={editedTaskName}
                            onChangeText={(text) => setEditedTaskName(text)}
                          />
                          <TextInput
                            placeholder='Descripcion'
                            placeholderTextColor={'gray'}
                            style={inputStyle}
                            value={editedTaskDescription}
                            onChangeText={(text) => setEditedTaskDescription(text)}
                          />
                          <TextInput
                            style={inputStyle}
                            placeholder="Recursos Económicos"
                            placeholderTextColor={'gray'}
                            value={recursosEconomicos}
                            onChangeText={(text) => setRecursosEconomicos(text)}
                            keyboardType="numeric"
                          />
                          <TextInput
                            style={inputStyle}
                            placeholder="Tiempo Estimado"
                            placeholderTextColor={'gray'}
                            value={tiempoEstimado}
                            onChangeText={(text) => setTiempoEstimado(text)}
                            keyboardType="numeric"
                          />
                          <TextInput
                            style={inputStyle}
                            placeholder="Story Points"
                            placeholderTextColor={'gray'}
                            value={storyPoints}
                            onChangeText={(text) => setStoryPoints(text)}
                            keyboardType="numeric"
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

export default ConsultarProAd;