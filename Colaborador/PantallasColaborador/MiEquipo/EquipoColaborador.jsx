// EquipoColaborador.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'; // Importa Picker desde el paquete correcto
import axios from 'axios';


const InformeProUsu = () => {
  const [projectsList, setProjectsList] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [companions, setCompanions] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://192.168.0.13:4000/api/proyecto');
        console.log('Proyectos obtenidos:', response.data);
        setProjectsList(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();

    const getUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };

    getUsername();
  }, []);

  const fetchCompanionsInfo = async (companionId) => {
    try {
      const response = await axios.get(`http://192.168.0.13:4000/api/colaborador/${companionId}`);
      console.log('Respuesta del compañero:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching companion info:', error);
      return null;
    }
  };

  const handleProjectSelect = async () => {
    try {
      const response = await axios.get(`http://192.168.0.13:4000/api/proyecto/${selectedProjectId}`);
      console.log('Proyecto seleccionado:', response.data);
      const project = response.data;

      const companionsInfoPromises = project.colaboradores.map(async companionId => {
        const companionInfo = await fetchCompanionsInfo(companionId);
        return { ...companionInfo, projectName: project.nombre };
      });

      const companionsInfo = await Promise.all(companionsInfoPromises);
      console.log('Información de compañeros:', companionsInfo);
      setCompanions(companionsInfo.filter(info => info.nombre !== username));
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi equipo de trabajo</Text>
      <View style={styles.pickerContainer}>
        <Text>Selecciona un proyecto:</Text>
        <Picker
          selectedValue={selectedProjectId}
          onValueChange={(itemValue, itemIndex) => setSelectedProjectId(itemValue)}
        >
          <Picker.Item label="Selecciona un proyecto" value="" />
          {projectsList.map(project => (
            <Picker.Item key={project._id} label={project.nombre} value={project._id} />
          ))}
        </Picker>
        <Button title="Seleccionar" onPress={handleProjectSelect} />
      </View>
      {companions.length > 0 && (
        <ScrollView style={styles.companionsContainer}>
          <Text style={styles.subtitle}>Compañeros de trabajo:</Text>
          {companions.map(companion => (
            <View key={companion._id} style={styles.companionCard}>
              <Text style={styles.companionName}>{companion.nombre}</Text>
              <Text>Correo: {companion.correo}</Text>
              <Text>Teléfono: {companion.telefono}</Text>
              <Text>Proyecto: {companion.projectName}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  companionsContainer: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  companionCard: {
    backgroundColor: 'lightblue',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  companionName: {
    fontWeight: 'bold',
  },
});

export default InformeProUsu;