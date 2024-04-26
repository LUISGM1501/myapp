// CrearReunion.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView,  Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const CrearReunionVer1 = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>CrearReunion</Text>
      <Button
        title="Abrir Menú"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

const CrearReunion = () => {
  const [proyectoId, setProyectoId] = useState('');
  const [tema, setTema] = useState('');
  const [medio, setMedio] = useState('');
  const [link, setLink] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [duracionHoras, setDuracionHoras] = useState('');
  const [colaboradores, setColaboradores] = useState([]);
  const [administradores, setAdministradores] = useState([]);
  const [proyectosList, setProyectosList] = useState([]);
  const [colaboradoresDisponibles, setColaboradoresDisponibles] = useState([]);
  const [administradoresDisponibles, setAdministradoresDisponibles] = useState([]);
  const [datosGuardados, setDatosGuardados] = useState(null);

  useEffect(() => {
    loadProyectosList();
    loadColaboradoresDisponibles();
    loadAdministradoresDisponibles();
  }, []);

  const enviarCorreo = async (datosCorreo) => {
    try {
      const response = await axios.post('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/sendEmail', datosCorreo);
      console.log('Correo enviado correctamente:', response.data);
      // Aquí puedes manejar la respuesta del servidor si es necesario
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      // Aquí puedes manejar cualquier error que ocurra durante la solicitud
    }
  };

  const loadProyectosList = async () => {
    try {
      const response = await axios.get('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/proyecto');
      setProyectosList(response.data);
    } catch (error) {
      console.error('Error loading projects list:', error);
    }
  };

  const loadColaboradoresDisponibles = async () => {
    try {
      const response = await axios.get('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/colaborador');
      setColaboradoresDisponibles(response.data);
    } catch (error) {
      console.error('Error loading available collaborators:', error);
    }
  };

  const loadAdministradoresDisponibles = async () => {
    try {
      const response = await axios.get('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/Admin');
      setAdministradoresDisponibles(response.data);
    } catch (error) {
      console.error('Error loading available administrators:', error);
    }
  };

  const handleCrearReunion = async () => {
    if (!proyectoId.trim() || !tema || !medio || !link || !fecha || !colaboradores || !administradores || !duracionHoras) {
      alert('Por favor, completa todos los campos antes de guardar.');
      return; // Salir de la función temprano si falta algún campo
    }
  
    const colaboradoresSeleccionados = colaboradores.concat(administradores);
    const correosColaboradores = colaboradoresSeleccionados.map(colaborador => colaborador.correo);
  
    const datos = {
      proyecto: proyectoId.trim(),
      tema,
      medio,
      link,
      fecha: new Date(`${fecha}T${hora}:00`),
      duracionHoras,
      colaboradores: colaboradoresSeleccionados,
    };
  
    const correosParticipantes = [...correosColaboradores]; // Copia los correos de los colaboradores
    // Concatena los correos de los administradores a la lista
    administradores.forEach(administrador => {
      correosParticipantes.push(administrador.correo);
    });

    try {
      const response = await axios.get(`https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/proyecto/${proyectoId.trim()}`);
      if (!response.data) {
        alert('No se encontró ningún proyecto con el ID proporcionado!');
        return; // Salir de la función temprano si no se encontró el proyecto
      }
      alert('Reunión creada.');

      // Crear la reunión en el backend
      await axios.post('https://ancient-savannah-86041-b59d8e70e572.herokuapp.com/api/reunion', datos);

      // Enviar correos electrónicos a los participantes de la reunión
      const asunto = `Nueva reunión sobre el tema: ${tema}`;
      const mensaje = `Se ha programado una nueva reunión sobre el tema: ${tema}. La reunión se llevará a cabo el ${fecha} a las ${hora} horas. Por favor, únete a la reunión a través del siguiente enlace: ${link}.`;
      const datosCorreo = {
        listaCorreos: correosParticipantes,
        asunto,
        mensaje
      };
      enviarCorreo(datosCorreo);

      console.log('Reunión creada exitosamente');
      // Limpiar los campos después de crear la reunión
      setProyectoId('');
      setTema('');
      setMedio('');
      setLink('');
      setFecha('');
      setHora('');
      setDuracionHoras('');
      setColaboradores([]);
    } catch (error) {
      alert('No se encontró ningún proyecto con el ID proporcionado.');
      setProyectoId('');
      setTema('');
      setMedio('');
      setLink('');
      setFecha('');
      setHora('');
      setDuracionHoras('');
      setColaboradores([]);
      console.error('Error al crear la reunión:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
  <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' , backgroundColor: 'black'}}>
    <Text style={{ fontSize: 20, borderColor: 'white', marginBottom: 10 }}>Crear Reunión de Proyectos</Text>

    <View style={{ marginBottom: 10 }}>
      <Text>ID del Proyecto:</Text>
      <TextInput
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200}}
        value={proyectoId}
        onChangeText={setProyectoId}
      />
    </View>

    <View style={{ marginBottom: 10 }}>
      <Text>Tema:</Text>
      <TextInput
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
        value={tema}
        onChangeText={setTema}
      />
    </View>

    <View style={{ marginBottom: 10 }}>
      <Text>Medio:</Text>
      <TextInput
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
        value={medio}
        onChangeText={setMedio}
      />
    </View>

    <View style={{ marginBottom: 10 }}>
      <Text>Enlace:</Text>
      <TextInput
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
        value={link}
        onChangeText={setLink}
      />
    </View>

    <View style={{ marginBottom: 10 }}>
      <Text>Fecha:</Text>
      <TextInput
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
        value={fecha}
        onChangeText={setFecha}
      />
    </View>

    <View style={{ marginBottom: 10 }}>
      <Text>Hora:</Text>
      <TextInput
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200}}
        value={hora}
        onChangeText={setHora}
      />
    </View>

    <View style={{ marginBottom: 10 }}>
      <Text>Duración en Horas:</Text>
      <TextInput
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200 }}
        value={duracionHoras}
        onChangeText={setDuracionHoras}
      />
    </View>

    <View style={{ marginBottom: 10 }}>
      <Text>Colaboradores:</Text>
      <Picker
        style={{ width: '100%', borderColor: 'white',  borderRadius: 5, padding: 5, width: 200 }}
        selectedValue={colaboradores.map(colaborador => colaborador._id)}
        onValueChange={(itemValue) => setColaboradores(itemValue)}
        mode="multiple"
      >
        {colaboradoresDisponibles.map(colaborador => (
          <Picker.Item
            key={colaborador._id}
            label={`${colaborador.nombre} - ${colaborador._id}`}
            value={colaborador._id}
          />
        ))}
      </Picker>
    </View>

    <View style={{ marginBottom: 10 }}>
      <Text>Administradores:</Text>
      <Picker
        style={{ width: '100%', borderColor: 'white', borderRadius: 5, padding: 5, width: 200}}
        selectedValue={administradores.map(administrador => administrador._id)}
        onValueChange={(itemValue) => setAdministradores(itemValue)}
        mode="multiple"
      >
        {administradoresDisponibles.map(administrador => (
          <Picker.Item
            key={administrador._id}
            label={`${administrador.nombre} - ${administrador._id}`}
            value={administrador._id}
          />
        ))}
      </Picker>
    </View>

    <Button
      title="Crear Reunión"
      onPress={handleCrearReunion}
    />

    <View>
      <Text style={{ fontSize: 16, marginTop: 10 }}>Proyectos disponibles:</Text>
      <ScrollView style={{ maxHeight: 200 }}>
        {proyectosList.map((proyecto) => (
          <Text key={proyecto._id}>{proyecto._id} - {proyecto.nombre}</Text>
        ))}
      </ScrollView>
    </View>

    {datosGuardados && (
      <View>
        <Text style={{ fontSize: 16, marginTop: 10 }}>Datos guardados:</Text>
        <Text>{JSON.stringify(datosGuardados, null, 2)}</Text>
      </View>
    )}
  </ScrollView>
</View>


  );
};

export default CrearReunion;