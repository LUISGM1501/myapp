import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { BarChart, PieChart } from 'react-native-chart-kit';

const SeguimientoProyecto = ({ navigation }) => {
  const [proyectos, setProyectos] = useState([]);
  const [selectedProyecto, setSelectedProyecto] = useState(null);
  const [horasPromedioPorTarea, setHorasPromedioPorTarea] = useState(0);
  const [tareaMayorHoras, setTareaMayorHoras] = useState(null);
  const [recursosPromedioPorTarea, setRecursosPromedioPorTarea] = useState(0);
  const [tareaMayorRecursos, setTareaMayorRecursos] = useState(null);
  const [recursosAsignadosProyecto, setRecursosAsignadosProyecto] = useState(0);
  const [storyPointsPromedio, setStoryPointsPromedio] = useState(0);
  const [tareaMayorStoryPoints, setTareaMayorStoryPoints] = useState(null);
  const [tiempoPromedioTareas, setTiempoPromedioTareas] = useState(0);
  const [tareaMayorTiempo, setTareaMayorTiempo] = useState(null);
  const [porcentajeTerminadas, setPorcentajeTerminadas] = useState(0);
  const [porcentajePendientes, setPorcentajePendientes] = useState(0);
  const [porcentajeEnProgreso, setPorcentajeEnProgreso] = useState(0);

  useEffect(() => {
    cargarProyectos();
  }, []);

  useEffect(() => {
    if (selectedProyecto) {
      if (selectedProyecto === 'todos') {
        calcularInformesParaTodos();
      } else {
        calcularInformes(selectedProyecto);
      }
    }
  }, [selectedProyecto]);

  const cargarProyectos = async () => {
    try {
      const response = await axios.get('https://requebackend-da0aea993398.herokuapp.com/api/proyecto');
      setProyectos(response.data);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  };

  const handleProyectoChange = (proyectoId) => {
    if (proyectoId === 'todos') {
      setSelectedProyecto('todos');
    } else {
      const proyecto = proyectos.find(p => p._id === proyectoId);
      setSelectedProyecto(proyecto);
    }
  };

  const calcularInformes = (proyecto) => {
    if (!proyecto) return;

    const totalHoras = proyecto.tareas.reduce((total, tarea) => total + tarea.tiempoEstimado, 0);
    const totalRecursos = proyecto.tareas.reduce((total, tarea) => total + tarea.recursosEconomicos, 0);
    const totalStoryPoints = proyecto.tareas.reduce((total, tarea) => total + tarea.storyPoints, 0);
    const totalTiempo = proyecto.tareas.reduce((total, tarea) => total + tarea.tiempoEstimado, 0);

    const terminadas = proyecto.tareas.filter(tarea => tarea.estado === 'Terminada').length;
    const pendientes = proyecto.tareas.filter(tarea => tarea.estado === 'Pendiente').length;
    const EnProgreso = proyecto.tareas.filter(tarea => tarea.estado === 'En Progreso').length;
    const totalTareas = proyecto.tareas.length;

    const tareaMayorHoras = proyecto.tareas.reduce((mayor, tarea) => (mayor === null || tarea.tiempoEstimado > mayor.tiempoEstimado ? tarea : mayor), null);
    const tareaMayorRecursos = proyecto.tareas.reduce((mayor, tarea) => (mayor === null || tarea.recursosEconomicos > mayor.recursosEconomicos ? tarea : mayor), null);
    const tareaMayorStoryPoints = proyecto.tareas.reduce((mayor, tarea) => (mayor === null || tarea.storyPoints > mayor.storyPoints ? tarea : mayor), null);
    const tareaMayorTiempo = proyecto.tareas.reduce((mayor, tarea) => (mayor === null || tarea.tiempoEstimado > mayor.tiempoEstimado ? tarea : mayor), null);

    setHorasPromedioPorTarea(totalTareas > 0 ? totalHoras / totalTareas : 0);
    setRecursosPromedioPorTarea(totalTareas > 0 ? totalRecursos / totalTareas : 0);
    setStoryPointsPromedio(totalTareas > 0 ? totalStoryPoints / totalTareas : 0);
    setTiempoPromedioTareas(totalTareas > 0 ? totalTiempo / totalTareas : 0);
    setPorcentajeTerminadas(totalTareas > 0 ? (terminadas / totalTareas) * 100 : 0);
    setPorcentajePendientes(totalTareas > 0 ? (pendientes / totalTareas) * 100 : 0);
    setPorcentajeEnProgreso(totalTareas > 0 ? (EnProgreso / totalTareas) * 100 : 0);
    setRecursosAsignadosProyecto(totalRecursos);
    setTareaMayorHoras(tareaMayorHoras);
    setTareaMayorRecursos(tareaMayorRecursos);
    setTareaMayorStoryPoints(tareaMayorStoryPoints);
    setTareaMayorTiempo(tareaMayorTiempo);
  };

  const calcularInformesParaTodos = () => {
    let totalHoras = 0;
    let totalRecursos = 0;
    let totalStoryPoints = 0;
    let totalTiempo = 0;
    let totalTareas = 0;
    let terminadas = 0;
    let pendientes = 0;
    let EnProgreso = 0;

    let tareaMayorHorasGlobal = null;
    let tareaMayorRecursosGlobal = null;
    let tareaMayorStoryPointsGlobal = null;
    let tareaMayorTiempoGlobal = null;

    proyectos.forEach((proyecto) => {
      proyecto.tareas.forEach((tarea) => {
        totalHoras += tarea.tiempoEstimado;
        totalRecursos += tarea.recursosEconomicos;
        totalStoryPoints += tarea.storyPoints;
        totalTiempo += tarea.tiempoEstimado;
        totalTareas++;

        if (tarea.estado === 'Terminada') {
          terminadas++;
        } else if (tarea.estado === 'Pendiente') {
          pendientes++;
        } else if (tarea.estado === 'En Progreso') {
          EnProgreso++;
        }

        if (!tareaMayorHorasGlobal || tarea.tiempoEstimado > tareaMayorHorasGlobal.tiempoEstimado) {
          tareaMayorHorasGlobal = tarea;
        }

        if (!tareaMayorRecursosGlobal || tarea.recursosEconomicos > tareaMayorRecursosGlobal.recursosEconomicos) {
          tareaMayorRecursosGlobal = tarea;
        }

        if (!tareaMayorStoryPointsGlobal || tarea.storyPoints > tareaMayorStoryPointsGlobal.storyPoints) {
          tareaMayorStoryPointsGlobal = tarea;
        }

        if (!tareaMayorTiempoGlobal || tarea.tiempoEstimado > tareaMayorTiempoGlobal.tiempoEstimado) {
          tareaMayorTiempoGlobal = tarea;
        }
      });
    });

    setHorasPromedioPorTarea(totalTareas > 0 ? totalHoras / totalTareas : 0);
    setRecursosPromedioPorTarea(totalTareas > 0 ? totalRecursos / totalTareas : 0);
    setStoryPointsPromedio(totalTareas > 0 ? totalStoryPoints / totalTareas : 0);
    setTiempoPromedioTareas(totalTareas > 0 ? totalTiempo / totalTareas : 0);
    setPorcentajeTerminadas(totalTareas > 0 ? (terminadas / totalTareas) * 100 : 0);
    setPorcentajePendientes(totalTareas > 0 ? (pendientes / totalTareas) * 100 : 0);
    setPorcentajeEnProgreso(totalTareas > 0 ? (EnProgreso / totalTareas) * 100 : 0);
    setRecursosAsignadosProyecto(totalRecursos);
    setTareaMayorHoras(tareaMayorHorasGlobal);
    setTareaMayorRecursos(tareaMayorRecursosGlobal);
    setTareaMayorStoryPoints(tareaMayorStoryPointsGlobal);
    setTareaMayorTiempo(tareaMayorTiempoGlobal);
  };

  return (
    <ScrollView>
      <View>
        <Picker
          selectedValue={selectedProyecto ? selectedProyecto._id : 'todos'}
          onValueChange={(itemValue) => handleProyectoChange(itemValue)}
        >
          <Picker.Item label="Todos los Proyectos" value="todos" style={{color:'black'}} />
          {proyectos.map((proyecto) => (
            <Picker.Item key={proyecto._id} label={proyecto.nombre} value={proyecto._id} />
          ))}
        </Picker>
      </View>
  
      {(selectedProyecto || selectedProyecto === 'todos') && (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'gray' }}>Horas promedio por tarea: {horasPromedioPorTarea.toFixed(2)}</Text>
          <Text style={{ color: 'gray' }}>Tarea con más horas estimadas: {tareaMayorHoras ? tareaMayorHoras.nombre : 'N/A'}</Text>
  
          {/* Gráfico de barras para el tiempo de las tareas */}
          <View style={{ marginTop: 20 }}>
            {selectedProyecto && selectedProyecto !== 'todos' && selectedProyecto.tareas && (
              <BarChart
                data={{
                  labels: selectedProyecto.tareas.map(tarea => tarea.nombre),
                  datasets: [
                    {
                      data: selectedProyecto.tareas.map(tarea => parseFloat(tarea.tiempoEstimado.toFixed(2))),
                    },
                  ],
                }}
                width={300}
                height={200}
                yAxisSuffix="h"
                chartConfig={{
                  backgroundGradientFrom: '#1E2923',
                  backgroundGradientTo: '#08130D',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  yAxisMinValue: 0, // Establecer el valor mínimo del eje Y en 0
                }}
              />
            )}
            {selectedProyecto === 'todos' && (
              <BarChart
                data={{
                  labels: proyectos.flatMap(proyecto => proyecto.tareas.map(tarea => tarea.nombre)),
                  datasets: [
                    {
                      data: proyectos.flatMap(proyecto => proyecto.tareas.map(tarea => parseFloat(tarea.tiempoEstimado.toFixed(2)))),
                    },
                  ],
                }}
                width={300}
                height={200}
                yAxisSuffix="h"
                chartConfig={{
                  backgroundGradientFrom: '#1E2923',
                  backgroundGradientTo: '#08130D',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  yAxisMinValue: 0, // Establecer el valor mínimo del eje Y en 0
                }}
              />
            )}
          </View>
  
          <Text style={{ color: 'gray' }}>Recursos promedio por tarea: {recursosPromedioPorTarea.toFixed(2)}</Text>
          <Text style={{ color: 'gray' }}>Tarea con más recursos asignados: {tareaMayorRecursos ? tareaMayorRecursos.nombre : 'N/A'}</Text>
  
          {/* Gráfico de barras para el presupuesto de las tareas */}
          <View style={{ marginTop: 20 }}>
            {selectedProyecto && selectedProyecto !== 'todos' && selectedProyecto.tareas && (
              <BarChart
                data={{
                  labels: selectedProyecto.tareas.map(tarea => tarea.nombre),
                  datasets: [
                    {
                      data: selectedProyecto.tareas.map(tarea => parseFloat(tarea.recursosEconomicos.toFixed(2))),
                    },
                  ],
                }}
                width={300}
                height={200}
                yAxisSuffix="$"
                chartConfig={{
                  backgroundGradientFrom: '#1E2923',
                  backgroundGradientTo: '#08130D',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  yAxisMinValue: 0, // Establecer el valor mínimo del eje Y en 0
                }}
              />
            )}
            {selectedProyecto === 'todos' && (
              <BarChart
                data={{
                  labels: proyectos.flatMap(proyecto => proyecto.tareas.map(tarea => tarea.nombre)),
                  datasets: [
                    {
                      data: proyectos.flatMap(proyecto => proyecto.tareas.map(tarea => parseFloat(tarea.recursosEconomicos.toFixed(2)))),
                    },
                  ],
                }}
                width={300}
                height={200}
                yAxisSuffix="$"
                chartConfig={{
                  backgroundGradientFrom: '#1E2923',
                  backgroundGradientTo: '#08130D',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  yAxisMinValue: 0, // Establecer el valor mínimo del eje Y en 0
                }}
              />
            )}
          </View>
  
          <Text style={{ color: 'gray' }}>Recursos asignados {selectedProyecto === 'todos' ? 'a todos los proyectos' : 'al proyecto'}: {recursosAsignadosProyecto}</Text>
          <Text style={{ color: 'gray' }}>Story points promedio por tarea: {storyPointsPromedio.toFixed(2)}</Text>
          <Text style={{ color: 'gray' }}>Tarea con más story points: {tareaMayorStoryPoints ? tareaMayorStoryPoints.nombre : 'N/A'}</Text>
          <Text style={{ color: '#FF6347' }}>Porcentaje de tareas terminadas: {porcentajeTerminadas.toFixed(2)}%</Text>
          <Text style={{ color: '#36A2EB' }}>Porcentaje de tareas pendientes: {porcentajePendientes.toFixed(2)}%</Text>
          <Text style={{ color: '#FFD700' }}>Porcentaje de tareas En Progreso: {porcentajeEnProgreso.toFixed(2)}%</Text>
  
          {/* Gráfico de pie para los estados de las tareas */}
          <View style={{ marginTop: 20 }}>
            <PieChart
              data={[
                {
                  name: 'Terminadas',
                  population: porcentajeTerminadas,
                  color: '#FF6347',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Pendientes',
                  population: porcentajePendientes,
                  color: '#36A2EB',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'En Progreso',
                  population: porcentajeEnProgreso,
                  color: '#FFD700',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
              ]}
              width={300}
              height={200}
              chartConfig={{
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#08130D',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
  
};

export default SeguimientoProyecto;
