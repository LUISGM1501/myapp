import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

// Componente principal
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

  const cargarProyectos = async () => {
    try {
      const response = await axios.get('http://192.168.0.17:4000/api/proyecto');
      setProyectos(response.data);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  };

  const handleProyectoChange = (proyectoId) => {
    if (proyectoId === 'todos') {
      // Si se selecciona 'todos los proyectos', calculamos los informes para todos los proyectos
      setSelectedProyecto(null); // Restablecer el estado de selectedProyecto a null
      calcularInformesParaTodos();
    } else {
      // Si se selecciona un proyecto específico, calculamos los informes solo para ese proyecto
      const proyecto = proyectos.find(p => p._id === proyectoId);
      setSelectedProyecto(proyecto);
      calcularInformes(proyecto);
    }
  };

  const calcularInformes = (proyecto) => {
    if (!proyecto) return;

    calcularHorasPromedioPorTarea(proyecto);
    calcularTareaMayorHoras(proyecto);
    calcularRecursosPromedioPorTarea(proyecto);
    calcularTareaMayorRecursos(proyecto);
    calcularRecursosAsignadosProyecto(proyecto);
    calcularStoryPointsPromedio(proyecto);
    calcularTareaMayorStoryPoints(proyecto);
    calcularTiempoPromedioTareas(proyecto);
    calcularTareaMayorTiempo(proyecto);
    calcularPorcentajeTareas(proyecto);
  };

  const calcularHorasPromedioPorTarea = (proyecto) => {
    let totalHoras = 0;
    let totalTareas = 0;
    proyecto.tareas.forEach((tarea) => {
      totalHoras += tarea.tiempoEstimado;
      totalTareas++;
    });
    const promedio = totalTareas > 0 ? totalHoras / totalTareas : 0;
    setHorasPromedioPorTarea(promedio);
  };

  const calcularTareaMayorHoras = (proyecto) => {
    let mayorHoras = 0;
    let tareaMayor = null;
    proyecto.tareas.forEach((tarea) => {
      if (tarea.tiempoEstimado > mayorHoras) {
        mayorHoras = tarea.tiempoEstimado;
        tareaMayor = tarea;
      }
    });
    setTareaMayorHoras(tareaMayor);
  };

  const calcularRecursosPromedioPorTarea = (proyecto) => {
    let totalRecursos = 0;
    let totalTareas = 0;
    proyecto.tareas.forEach((tarea) => {
      totalRecursos += tarea.recursosEconomicos;
      totalTareas++;
    });
    const promedio = totalTareas > 0 ? totalRecursos / totalTareas : 0;
    setRecursosPromedioPorTarea(promedio);
  };

  const calcularTareaMayorRecursos = (proyecto) => {
    let maxRecursos = 0;
    let tareaMayor = null;
    proyecto.tareas.forEach((tarea) => {
      if (tarea.recursosEconomicos > maxRecursos) {
        maxRecursos = tarea.recursosEconomicos;
        tareaMayor = tarea;
      }
    });
    setTareaMayorRecursos(tareaMayor);
  };

  const calcularRecursosAsignadosProyecto = (proyecto) => {
    let totalRecursos = 0;
    proyecto.tareas.forEach((tarea) => {
      totalRecursos += tarea.recursosEconomicos;
    });
    setRecursosAsignadosProyecto(totalRecursos);
  };

  const calcularStoryPointsPromedio = (proyecto) => {
    let totalStoryPoints = 0;
    let totalTareas = 0;
    proyecto.tareas.forEach((tarea) => {
      totalStoryPoints += tarea.storyPoints;
      totalTareas++;
    });
    const promedio = totalTareas > 0 ? totalStoryPoints / totalTareas : 0;
    setStoryPointsPromedio(promedio);
  };

  const calcularTareaMayorStoryPoints = (proyecto) => {
    let mayorStoryPoints = 0;
    let tareaMayor = null;
    proyecto.tareas.forEach((tarea) => {
      if (tarea.storyPoints > mayorStoryPoints) {
        mayorStoryPoints = tarea.storyPoints;
        tareaMayor = tarea;
      }
    });
    setTareaMayorStoryPoints(tareaMayor);
  };

  const calcularTiempoPromedioTareas = (proyecto) => {
    let totalTiempo = 0;
    let totalTareas = 0;
    proyecto.tareas.forEach((tarea) => {
      totalTiempo += tarea.tiempoEstimado;
      totalTareas++;
    });
    const promedio = totalTareas > 0 ? totalTiempo / totalTareas : 0;
    setTiempoPromedioTareas(promedio);
  };

  const calcularTareaMayorTiempo = (proyecto) => {
    let mayorTiempo = 0;
    let tareaMayor = null;
    proyecto.tareas.forEach((tarea) => {
      if (tarea.tiempoEstimado > mayorTiempo) {
        mayorTiempo = tarea.tiempoEstimado;
        tareaMayor = tarea;
      }
    });
    setTareaMayorTiempo(tareaMayor);
  };

  const calcularPorcentajeTareas = (proyecto) => {
    let terminadas = 0;
    let pendientes = 0;
    let enProgreso = 0;
    proyecto.tareas.forEach((tarea) => {
      if (tarea.estado === 'Terminada') {
        terminadas++;
      } else if (tarea.estado === 'Pendiente') {
        pendientes++;
      } else if (tarea.estado === 'En Proceso') {
        enProgreso++;
      }
    });
    const totalTareas = proyecto.tareas.length;
    const porcentajeTerminadas = (terminadas / totalTareas) * 100;
    const porcentajePendientes = (pendientes / totalTareas) * 100;
    const porcentajeEnProgreso = (enProgreso / totalTareas) * 100;
    setPorcentajeTerminadas(porcentajeTerminadas);
    setPorcentajePendientes(porcentajePendientes);
    setPorcentajeEnProgreso(porcentajeEnProgreso);
  };

  const calcularInformesParaTodos = () => {
    let totalHoras = 0;
    let totalRecursos = 0;
    let totalStoryPoints = 0;
    let totalTiempo = 0;
    let totalTareas = 0;
    let terminadas = 0;
    let pendientes = 0;
    let enProgreso = 0;

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
        } else if (tarea.estado === 'En Proceso') {
          enProgreso++;
        }
      });
    });

    const promedioHoras = totalTareas > 0 ? totalHoras / totalTareas : 0;
    const promedioStoryPoints = totalTareas > 0 ? totalStoryPoints / totalTareas : 0;
    const promedioTiempo = totalTareas > 0 ? totalTiempo / totalTareas : 0;

    const porcentajeTerminadas = (terminadas / totalTareas) * 100;
    const porcentajePendientes = (pendientes / totalTareas) * 100;
    const porcentajeEnProgreso = (enProgreso / totalTareas) * 100;

    setHorasPromedioPorTarea(promedioHoras);
    setStoryPointsPromedio(promedioStoryPoints);
    setTiempoPromedioTareas(promedioTiempo);
    setPorcentajeTerminadas(porcentajeTerminadas);
    setPorcentajePendientes(porcentajePendientes);
    setPorcentajeEnProgreso(porcentajeEnProgreso);
    setRecursosAsignadosProyecto(totalRecursos); // Actualizar los recursos asignados en todos los proyectos
  };


  // En el componente SeguimientoProyecto
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', padding: 20 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'black' }}>Informes de Seguimiento de Proyectos</Text>
        <View style={{ backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginBottom: 20 }}>
          <Picker
            selectedValue={selectedProyecto ? selectedProyecto._id : null}
            style={[inputStyle, { backgroundColor: '#BCCDE0', marginTop: 5, marginBottom: 25 }]}
            onValueChange={(itemValue) => handleProyectoChange(itemValue)}
          >
            <Picker.Item label="Seleccione un proyecto..." value={null} />
            <Picker.Item label="Todos los proyectos" value="todos" />
            {proyectos.map((proyecto) => (
              <Picker.Item key={proyecto._id} label={proyecto.nombre} value={proyecto._id} />
            ))}
          </Picker >
          {selectedProyecto ? (
  <InformacionProyecto
    horasPromedioPorTarea={horasPromedioPorTarea}
    tareaMayorHoras={tareaMayorHoras}
    recursosPromedioPorTarea={recursosPromedioPorTarea}
    tareaMayorRecursos={tareaMayorRecursos}
    recursosAsignadosProyecto={recursosAsignadosProyecto}
    storyPointsPromedio={storyPointsPromedio}
    tareaMayorStoryPoints={tareaMayorStoryPoints}
    tiempoPromedioTareas={tiempoPromedioTareas}
    tareaMayorTiempo={tareaMayorTiempo}
    porcentajeTerminadas={porcentajeTerminadas}
    porcentajePendientes={porcentajePendientes}
    porcentajeEnProgreso={porcentajeEnProgreso}
  />
) : (
  <InformacionTodosProyectos
    horasPromedioPorTarea={horasPromedioPorTarea}
    recursosPromedioPorTarea={recursosPromedioPorTarea}
    recursosAsignadosProyecto={recursosAsignadosProyecto}
    storyPointsPromedio={storyPointsPromedio}
    tiempoPromedioTareas={tiempoPromedioTareas}
    porcentajeTerminadas={porcentajeTerminadas}
    porcentajePendientes={porcentajePendientes}
    porcentajeEnProgreso={porcentajeEnProgreso}
  />
)}
          </View>
        </View>
      </ScrollView>
    );
  };
  
  // Cuando se selecciona un proyecto específico
  const InformacionProyecto = ({
    horasPromedioPorTarea,
    tareaMayorHoras,
    recursosPromedioPorTarea,
    tareaMayorRecursos,
    recursosAsignadosProyecto,
    storyPointsPromedio,
    tareaMayorStoryPoints,
    tiempoPromedioTareas,
    tareaMayorTiempo,
    porcentajeTerminadas,
    porcentajePendientes,
    porcentajeEnProgreso,
  }) => (
    <>
      <Text>Horas promedio por tarea: {horasPromedioPorTarea}</Text>
      {tareaMayorHoras && (
        <Text>Tarea con mayor cantidad de horas: {tareaMayorHoras.nombre} ({tareaMayorHoras.tiempoEstimado} horas)</Text>
      )}
      <Text>Recursos asignados por tarea promedio: {recursosPromedioPorTarea}</Text>
      {tareaMayorRecursos && (
        <Text>Tarea con mayor cantidad de recursos: {tareaMayorRecursos.nombre} ({tareaMayorRecursos.recursosEconomicos} unidades)</Text>
      )}
      <Text>Recursos asignados al proyecto: {recursosAsignadosProyecto}</Text>
      <Text>Promedio de Story Points por tarea: {storyPointsPromedio}</Text>
      {tareaMayorStoryPoints && (
        <Text>Tarea con mayor cantidad de Story Points: {tareaMayorStoryPoints.nombre} ({tareaMayorStoryPoints.storyPoints} puntos)</Text>
      )}
      <Text>Promedio de tiempo de las tareas: {tiempoPromedioTareas}</Text>
      {tareaMayorTiempo && (
        <Text>Tarea con mayor tiempo estimado: {tareaMayorTiempo.nombre} ({tareaMayorTiempo.tiempoEstimado} horas)</Text>
      )}
      <Text>Porcentaje de tareas terminadas: {porcentajeTerminadas}%</Text>
      <Text>Porcentaje de tareas pendientes: {porcentajePendientes}%</Text>
      <Text>Porcentaje de tareas en progreso: {porcentajeEnProgreso}%</Text>
    </>
  );
  
  const InformacionTodosProyectos = ({
    horasPromedioPorTarea,
    recursosPromedioPorTarea,
    recursosAsignadosProyecto,
    storyPointsPromedio,
    tiempoPromedioTareas,
    porcentajeTerminadas,
    porcentajePendientes,
    porcentajeEnProgreso,
  }) => (
    <>
      <Text>Horas promedio por tarea en todos los proyectos: {horasPromedioPorTarea}</Text>
      <Text>
        Recursos asignados por tarea promedio en todos los proyectos: {recursosPromedioPorTarea}
      </Text>
      <Text>Recursos asignados en todos los proyectos: {recursosAsignadosProyecto}</Text>
      <Text>
        Promedio de Story Points por tarea en todos los proyectos: {storyPointsPromedio}
      </Text>
      <Text>Promedio de tiempo de las tareas en todos los proyectos: {tiempoPromedioTareas}</Text>
      <Text>Porcentaje de tareas terminadas en todos los proyectos: {porcentajeTerminadas}%</Text>
      <Text>Porcentaje de tareas pendientes en todos los proyectos: {porcentajePendientes}%</Text>
      <Text>Porcentaje de tareas en progreso en todos los proyectos: {porcentajeEnProgreso}%</Text>
    </>
  );

  
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
  
export default SeguimientoProyecto;



 