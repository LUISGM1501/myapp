// ConsultarColab.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';

const ConsultarColab = () => {
    const [searchId, setSearchId] = useState('');
    const [colaborador, setColaborador] = useState(null);
    const [colaboradoresList, setColaboradoresList] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [adminsList, setAdminsList] = useState([]);
    const [selectedField, setSelectedField] = useState('');
    const [newData, setNewData] = useState('');

<<<<<<< Updated upstream
    const handleSearch = async () => {
        if (!searchId) {
            alert('Por favor, introduce un ID antes de realizar la búsqueda.');
            return;
        }
        try {
            const response = await axios.get(`http://192.168.18.104:4000/api/colaborador/${searchId}`);
            setColaborador(response.data);
        } catch (error) {
            alert('Error: ese ID de Colaborador no existe');
            console.error('Error searching for collaborator:', error);
        }
    };

    const handleAdminSearch = async () => {
        if (!searchId) {
            alert('Por favor, introduce un ID antes de realizar la búsqueda.');
            return;
        }
        try {
            const response = await axios.get(`http://192.168.18.104:4000/api/Admin/${searchId}`);
            setAdmin(response.data);
        } catch (error) {
            alert('Error: ese ID de Administrador no existe');
            console.error('Error searching for admin:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://192.168.18.104:4000/api/colaborador/${colaborador._id}`);
            setColaborador(null);
            loadColaboradoresList();
        } catch (error) {
            console.error('Error deleting collaborator:', error);
        }
    };

    const handleAdminDelete = async () => {
        try {
            await axios.delete(`http://192.168.18.104:4000/api/Admin/${admin._id}`);
            setAdmin(null);
            loadAdminsList();
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://192.168.18.104:4000/api/colaborador/${colaborador._id}`, { [selectedField]: newData });
            setColaborador(null);
            loadColaboradoresList();
        } catch (error) {
            console.error('Error updating collaborator:', error);
        }
    };

    const handleAdminUpdate = async () => {
        try {
            await axios.put(`http://192.168.18.104:4000/api/Admin/${admin._id}`, { [selectedField]: newData });
            setAdmin(null);
            loadAdminsList();
        } catch (error) {
            console.error('Error updating admin:', error);
        }
    };

    const loadColaboradoresList = async () => {
        try {
            const response = await axios.get('http://192.168.18.104:4000/api/colaborador');
            setColaboradoresList(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error loading collaborators list:', error);
        }
    };

    const loadAdminsList = async () => {
        try {
            const response = await axios.get('http://192.168.18.104:4000/api/Admin');
            setAdminsList(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error loading admins list:', error);
        }
    };

    useEffect(() => {
        if (searchId === '') {
            setColaborador(null);
            setAdmin(null);
        }
=======
  const handleSearch = async () => {
    if (!selectedUser || !selectedUserType) {
      alert('Por favor, selecciona un usuario y su tipo antes de realizar la búsqueda.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:4000/api/${selectedUserType}/${selectedUser}`);
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
      await axios.delete(`http://localhost:4000/api/${selectedUserType}/${selectedUser}`);
      alert(`Usuario ${selectedUser} eliminado exitosamente.`);
      if (selectedUserType === 'colaborador') {
        setColaborador(null);
>>>>>>> Stashed changes
        loadColaboradoresList();
        loadAdminsList();
    }, [searchId]);

<<<<<<< Updated upstream
    return (
      <ScrollView>
          <View style={{ padding: 20 }}>
              <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                  placeholder="Search by ID"
                  value={searchId}
                  onChangeText={(text) => setSearchId(text)}
              />
=======
  const handleUpdateUser = async () => {
    try {
      const endpoint = selectedUserType === 'colaborador' ? 'colaborador' : 'Admin';
      await axios.put(`http://localhost:4000/api/${endpoint}/${selectedUser}`, { [selectedField]: newData });
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
      const response = await axios.get('http://localhost:4000/api/colaborador');
      setColaboradoresList(response.data);
    } catch (error) {
      console.error('Error loading collaborators list:', error);
    }
  };

  const loadAdminsList = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/Admin');
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
          <Picker.Item label="Selecciona el tipo de usuario" value="" />
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
              <Picker.Item label="Selecciona un usuario" value="" />
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
>>>>>>> Stashed changes
              <Button title="Search" onPress={handleSearch} />
              <Button title="Search Admin" onPress={handleAdminSearch} />

              {colaborador && (
                  <View>
                      <Text>ID: {colaborador._id}</Text>
                      <Text>Nombre: {colaborador.nombre}</Text>
                      <Button title="Update" onPress={handleUpdate} />
                      <Button title="Delete" onPress={handleDelete} />
                  </View>
              )}

              {admin && (
                  <View>
                      <Text>ID: {admin._id}</Text>
                      <Text>Nombre: {admin.nombre}</Text>
                      <Button title="Update Admin" onPress={handleAdminUpdate} />
                      <Button title="Delete Admin" onPress={handleAdminDelete} />
                  </View>
              )}

              <View>
                  <Text>Colaboradores:</Text>
                  {colaboradoresList.map((colaborador) => (
                      <Text key={colaborador._id}>{colaborador._id} - {colaborador.nombre}</Text>
                  ))}
              </View>

              <View>
                  <Text>Admins:</Text>
                  {adminsList.map((admin) => (
                      <Text key={admin._id}>{admin._id} - {admin.nombre}</Text>
                  ))}
              </View>
          </View>
      </ScrollView>
  );
};

export default ConsultarColab;
