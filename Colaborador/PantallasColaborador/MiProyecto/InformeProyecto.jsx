import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { BarChart } from 'react-native-chart-kit';

const InformeProyecto = () => {
  const [tareasData, setTareasData] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [projectsList, setProjectsList] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://192.168.0.17:4000/api/proyecto');
      setProjectsList(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectSelect = async () => {
    try {
      const response = await axios.get(`http://192.168.0.17:4000/api/proyecto/${selectedProjectId}`);
      const project = response.data;

      // Definir colores personalizados para cada estado de tarea
      const colors = {
        Pendiente: 'rgba(255, 99, 132, 0.8)', // Rojo
        'En Progreso': 'rgba(54, 162, 235, 0.8)', // Azul
        Terminada: 'rgba(75, 192, 192, 0.8)', // Verde
      };

      const data = {
        labels: project.tareas.map(tarea => tarea.nombre),
        datasets: [{
          data: project.tareas.map(tarea => {
            switch (tarea.estado) {
              case 'Pendiente':
                return 1;
              case 'En Progreso':
                return 2;
              case 'Terminada':
                return 3;
              default:
                return 0;
            }
          }),
          color: (opacity = 1) => colors[opacity], // Asignar colores según el estado de la tarea
        }]
      };

      setTareasData(data);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color:'gray' }}>Informe de tareas de proyectos</Text>
      <Text style={{ fontSize: 16, color:'gray' }}>1: Pendiente, 2: En Progeso, 3: Terminada</Text>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: 'gray' }}>Selecciona un proyecto:</Text>
        <Picker
          selectedValue={selectedProjectId}
          onValueChange={(itemValue) => setSelectedProjectId(itemValue)}
        >
          <Picker.Item label="Selecciona un proyecto" value=""  style={{ color:'black' }}/>
          {projectsList.map(project => (
            <Picker.Item key={project._id} label={project.nombre} value={project._id} />
          ))}
        </Picker>
        <TouchableOpacity onPress={handleProjectSelect} style={{ marginTop: 10, padding: 10, backgroundColor: 'blue' }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Seleccionar</Text>
        </TouchableOpacity>
      </View>
      {tareasData && (
        <ScrollView horizontal={true}>
          <View style={{ width: 1000 }}>
            <BarChart
              data={tareasData}
              width={1000}
              height={300}
              yAxisLabel=""
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              }}
              style={{ marginBottom: 20 }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default InformeProyecto;
