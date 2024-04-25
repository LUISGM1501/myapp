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

    const handleSearch = async () => {
        if (!searchId) {
            alert('Por favor, introduce un ID antes de realizar la búsqueda.');
            return;
        }
        try {
            const response = await axios.get(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/colaborador/${searchId}`);
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
            const response = await axios.get(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/Admin/${searchId}`);
            setAdmin(response.data);
        } catch (error) {
            alert('Error: ese ID de Administrador no existe');
            console.error('Error searching for admin:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/colaborador/${colaborador._id}`);
            setColaborador(null);
            loadColaboradoresList();
        } catch (error) {
            console.error('Error deleting collaborator:', error);
        }
    };

    const handleAdminDelete = async () => {
        try {
            await axios.delete(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/Admin/${admin._id}`);
            setAdmin(null);
            loadAdminsList();
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/colaborador/${colaborador._id}`, { [selectedField]: newData });
            setColaborador(null);
            loadColaboradoresList();
        } catch (error) {
            console.error('Error updating collaborator:', error);
        }
    };

    const handleAdminUpdate = async () => {
        try {
            await axios.put(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/Admin/${admin._id}`, { [selectedField]: newData });
            setAdmin(null);
            loadAdminsList();
        } catch (error) {
            console.error('Error updating admin:', error);
        }
    };

    const loadColaboradoresList = async () => {
        try {
            const response = await axios.get('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/colaborador');
            setColaboradoresList(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error loading collaborators list:', error);
        }
    };

    const loadAdminsList = async () => {
        try {
            const response = await axios.get('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/Admin');
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
        loadColaboradoresList();
        loadAdminsList();
    }, [searchId]);

    return (
      <ScrollView>
          <View style={{ padding: 20 }}>
              <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                  placeholder="Search by ID"
                  value={searchId}
                  onChangeText={(text) => setSearchId(text)}
              />
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
