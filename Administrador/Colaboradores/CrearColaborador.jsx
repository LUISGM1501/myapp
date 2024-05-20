// CrearColab.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const CrearColAd = () => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [estado, setEstado] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('colaborador'); 
  const [datosGuardados, setDatosGuardados] = useState(null);

  const handleGuardar = async () => {
    const usuario = { nombre, cedula, correo, password: contrasena, departamento, telefono, estado, tipo: tipoUsuario };
  
     // Check if departamento, estado, or tipoUsuario is undefined
     if (!nombre || !cedula || !correo || !contrasena ||
      !departamento || !telefono || !estado || !tipoUsuario) {
    alert('Por favor, completa todos los campos antes de guardar.');
    return; // Exit the function early
  }
  
    try {
      const url = tipoUsuario === 'colaborador' ? 'http://192.168.18.104:4000/api/colaborador/' : 'http://192.168.18.104:4000/api/admin/';
      await axios.post(url, usuario);
      setDatosGuardados(usuario);
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };
  
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Pantalla de Crear Usuarios</Text>

      <View>
        <Text>Nombre:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={nombre}
          onChangeText={setNombre}
        />
      </View>

      <View>
        <Text>Cédula:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={cedula}
          onChangeText={setCedula}
        />
      </View>

      <View>
        <Text>Correo:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={correo}
          onChangeText={setCorreo}
        />
      </View>

      <View>
        <Text>Password:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={contrasena}
          onChangeText={setContrasena}
        />
      </View>

      <View>
        <Text>Departamento:</Text>
        <Picker
          selectedValue={departamento}
          onValueChange={(itemValue) => setDepartamento(itemValue)}
        >
          <Picker.Item label="---" value="" />
          <Picker.Item label="Finanzas" value="finanzas" />
          <Picker.Item label="Limpieza" value="limpieza" />
          <Picker.Item label="Recursos Humanos" value="recursos humanos" />
          <Picker.Item label="Marketing" value="marketing" />
          <Picker.Item label="Gerencia" value="gerencia" />
        </Picker>
      </View>

      <View>
        <Text>Teléfono:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={telefono}
          onChangeText={setTelefono}
        />
      </View>

      <View>
        <Text>Estado:</Text>
        <Picker
          selectedValue={estado}
          onValueChange={(itemValue) => setEstado(itemValue)}
        >
          <Picker.Item label="---" value="" />
          <Picker.Item label="Disponible" value="disponible" />
          <Picker.Item label="Ocupado" value="ocupado" />
        </Picker>
      </View>

      <View>
        <Text>Tipo de usuario:</Text>
        <Picker
          selectedValue={tipoUsuario}
          onValueChange={(itemValue) => setTipoUsuario(itemValue)}
        >
          <Picker.Item label="---" value="" />
          <Picker.Item label="Colaborador" value="colaborador" />
          <Picker.Item label="Administrador" value="administrador" />
        </Picker>
      </View>

      <Button title="Guardar" onPress={handleGuardar} />

      {datosGuardados && (
        <View>
          <Text>Datos guardados:</Text>
          <Text>{JSON.stringify(datosGuardados)}</Text>
        </View>
      )}
    </View>
  );

};

export default CrearColAd;