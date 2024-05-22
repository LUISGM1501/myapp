// ConsultarColab.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const ConsultarColab = () => {
  const [colaborador, setColaborador] = useState(null);
  const [colaboradoresList, setColaboradoresList] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [adminsList, setAdminsList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [newData, setNewData] = useState('');

  const handleSearch = async () => {
    if (!selectedUser || !selectedUserType) {
      alert('Por favor, selecciona un usuario y su tipo antes de realizar la búsqueda.');
      return;
    }
    try {
      const response = await axios.get(`https://requebackend-da0aea993398.herokuapp.com/api/${selectedUserType}/${selectedUser}`);
      if (selectedUserType === 'colaborador') {
        setColaborador(response.data);
      } else {
        setAdmin(response.data);
      }
    } catch (error) {
      alert(`Error: ese ID de ${selectedUserType} no existe`);
      console.error(`Error searching for ${selectedUserType}:`, error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`https://requebackend-da0aea993398.herokuapp.com/api/${selectedUserType}/${selectedUser}`);
      alert(`Usuario ${selectedUser} eliminado exitosamente.`);
      if (selectedUserType === 'colaborador') {
        setColaborador(null);
        loadColaboradoresList();
      } else {
        setAdmin(null);
        loadAdminsList();
      }
    } catch (error) {
      alert(`Error al eliminar el usuario ${selectedUser}`);
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const endpoint = selectedUserType === 'colaborador' ? 'colaborador' : 'Admin';
      await axios.put(`https://requebackend-da0aea993398.herokuapp.com/api/${endpoint}/${selectedUser}`, { [selectedField]: newData });
      alert(`Usuario ${selectedUser} actualizado exitosamente.`);
      if (selectedUserType === 'colaborador') {
        setColaborador(null);
        loadColaboradoresList();
      } else {
        setAdmin(null);
        loadAdminsList();
      }
    } catch (error) {
      alert(`Error al actualizar el usuario ${selectedUser}`);
      console.error('Error updating user:', error);
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

  const loadAdminsList = async () => {
    try {
      const response = await axios.get('https://requebackend-da0aea993398.herokuapp.com/api/Admin');
      setAdminsList(response.data);
    } catch (error) {
      console.error('Error loading admins list:', error);
    }
  };

  useEffect(() => {
    loadColaboradoresList();
    loadAdminsList();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{color:'gray'}}>Selecciona el tipo de usuario:</Text>
        <Picker
          selectedValue={selectedUserType}
          onValueChange={(itemValue) => setSelectedUserType(itemValue)}
        >
          <Picker.Item label="Selecciona el tipo de usuario" value="" style={{color:'black'}} />
          <Picker.Item label="Colaborador" value="colaborador" />
          <Picker.Item label="Admin" value="Admin" />
        </Picker>

        {selectedUserType && (
          <View>
            <Text style={{color: 'gray'}}>Selecciona el usuario:</Text>
            <Picker
              selectedValue={selectedUser}
              onValueChange={(itemValue) => setSelectedUser(itemValue)}
            >
              <Picker.Item label="Selecciona un usuario" value="" style={{color:'black'}}/>
              {selectedUserType === 'colaborador' &&
                colaboradoresList.map((colaborador) => (
                  <Picker.Item key={colaborador._id} label={colaborador.nombre} value={colaborador._id} />
                ))}
              {selectedUserType === 'Admin' &&
                adminsList.map((admin) => (
                    <Picker.Item key={admin._id} label={admin.nombre} value={admin._id} />
                  ))}
              </Picker>
            <View style={{ marginBottom:10}}>
              <Button title="Search" onPress={handleSearch} />
            </View>
            <View style={{ marginBottom:10}}>
              <Button title="Actualizar Usuario" onPress={handleUpdateUser} />
            </View>
            <View style={{ marginBottom:10}}>
              <Button title="Eliminar Usuario" onPress={handleDeleteUser} color={'red'} />
            </View>
  
              {selectedUserType === 'colaborador' && colaborador && (
                <View style={styles.userInfo}>
                  <Text style={{color:'black', fontWeight: 'bold', fontSize: 18}}>Información del colaborador:</Text>
                  <Text style={styles.info}>ID: {colaborador._id}</Text>
                  <Text style={styles.info}>Nombre: {colaborador.nombre}</Text>
                  <Text style={styles.info}>Cédula: {colaborador.cedula}</Text>
                  <Text style={styles.info}>Departamento: {colaborador.departamento}</Text>
                  <Text style={styles.info}>Correo: {colaborador.correo}</Text>
                  <Text style={styles.info}>Teléfono: {colaborador.telefono}</Text>
                </View>
              )}
  
              {selectedUserType === 'Admin' && admin && (
                <View style={styles.userInfo}>
                  <Text style={{color:'black', fontWeight: 'bold', fontSize: 18}}>Información del administrador:</Text>                
                  <Text style={styles.info}>ID: {admin._id}</Text>
                  <Text style={styles.info}>Nombre: {admin.nombre}</Text>
                  <Text style={styles.info}>Cédula: {admin.cedula}</Text>
                  <Text style={styles.info}>Departamento: {admin.departamento}</Text>
                  <Text style={styles.info}>Correo: {admin.correo}</Text>
                  <Text style={styles.info}>Teléfono: {admin.telefono}</Text>
                </View>
              )}
  
              {selectedUserType && (
                <View>
                  <Text style={{ color: 'gray'}}>Selecciona el campo a modificar:</Text>
                  <Picker
                    selectedValue={selectedField}
                    onValueChange={(itemValue) => setSelectedField(itemValue)}
                  >
                    <Picker.Item label="Selecciona el campo a modificar" value="" style={{color:'black'}} />
                    <Picker.Item label="Nombre" value="nombre" />
                    <Picker.Item label="Cédula" value="cedula" />
                    <Picker.Item label="Departamento" value="departamento" />
                    <Picker.Item label="Correo" value="correo" />
                    <Picker.Item label="Teléfono" value="telefono" />
                  </Picker>
  
                  <Text style={{ color: 'gray' }}>Nuevo valor:</Text>
                  <TextInput
                    style={styles.input}
                    value={newData}
                    onChangeText={setNewData}
                    keyboardType={(selectedField === 'telefono' || selectedField === 'cedula') ? 'numeric' : 'default'} // Configuración de keyboardType para aceptar solo números cuando se seleccionan los campos 'telefono' o 'cedula'
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    userInfo: {
      backgroundColor: 'lightblue',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      marginTop: 10,
    },
    info: {
      color: 'black',
      fontSize: 15,
    },
    input: {
      borderWidth: 1,
      color:'black', 
      borderColor: 'black',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
  });
  
  export default ConsultarColab;
