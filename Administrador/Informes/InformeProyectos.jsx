// InformesProyectos.jsx
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';

const InformesProyectos = () => {
  const [tareasData, setTareasData] = useState(null);

  useEffect(() => {
    const fetchProyectosData = async () => {
      try {
        const response = await axios.get('http://192.168.0.17:4000/api/proyecto');
        const proyectos = response.data;

        const data = {
          labels: [],
          datasets: [{
            data: [],
          }]
        };

        proyectos.forEach(proyecto => {
          proyecto.tareas.forEach(tarea => {
            data.labels.push(tarea.nombre);
            switch (tarea.estado) {
              case 'Pendiente':
                data.datasets[0].data.push(1);
                break;
              case 'En Progreso':
                data.datasets[0].data.push(2);
                break;
              case 'Terminada':
                data.datasets[0].data.push(3);
                break;
              default:
                data.datasets[0].data.push(0);
            }
          });
        });

        setTareasData(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProyectosData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={{ textAlign: 'center', color: 'black' }}>Pantalla de informes de tareas de proyectos</Text>
        <Text style={{ textAlign: 'center', color: 'black' }}>1: Pendiente, 2: En Progreso, 3: Terminada</Text>
      </View>
      <ScrollView horizontal={true} contentContainerStyle={{ paddingVertical: 20 }}>
        <View style={{ flex: 1 }}>
          {tareasData && (
            <BarChart
              style={{ marginVertical: 8 }}
              data={tareasData}
              width={2000}
              height={500}
              yAxisLabel=""
              chartConfig={{
                backgroundColor: 'white', 
                backgroundGradientFrom: '#2196F3',
                backgroundGradientTo: '#64B5F6', 
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default InformesProyectos;
