// CrearColab.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button,ScrollView } from 'react-native';
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
      const url = tipoUsuario === 'colaborador' ? 'http://192.168.0.13:4000/api/colaborador/' : 'http://192.168.0.13:4000/api/admin/';
      await axios.post(url, usuario);
      setDatosGuardados(usuario);
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };
  
  

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: 'black', textAlign: 'center' }}>Pantalla de Crear Usuarios</Text>
      <View style={{ backgroundColor: 'lightgray', padding: 20, borderRadius: 10, marginBottom: 20 }}>
        
        <View style={{ marginBottom: 20 }}>
          <Text style={{color:'black'}}>Nombre:</Text>
          <TextInput
            style={inputStyle}
            value={nombre}
            onChangeText={setNombre}
          />
        </View>
        
        <View style={{ marginBottom: 20 }}>
          <Text style={{color:'black'}}>Cédula:</Text>
          <TextInput
            style={inputStyle}
            value={cedula}
            onChangeText={setCedula}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{color:'black'}}>Correo:</Text>
          <TextInput
            style={inputStyle}
            value={correo}
            onChangeText={setCorreo}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{color:'black'}}>Password:</Text>
          <TextInput
            style={inputStyle}
            value={contrasena}
            onChangeText={setContrasena}
          />
        </View>

        <View style={{ marginBottom: 20 }}> 
          <Text style={{color:'black'}}>Departamento:</Text>
          <Picker
            style={[inputStyle, { backgroundColor: '#9ACFE0' }]}
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

        <View style={{ marginBottom: 20 }}>
          <Text style={{color:'black'}}>Teléfono:</Text>
          <TextInput
            style={inputStyle}
            value={telefono}
            onChangeText={setTelefono}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{color:'black'}}>Estado:</Text>
          <Picker
            style={[inputStyle, { backgroundColor: '#9ACFE0' }]}
            selectedValue={estado}
            onValueChange={(itemValue) => setEstado(itemValue)}
          >
            <Picker.Item label="---" value="" />
            <Picker.Item label="Disponible" value="disponible" />
            <Picker.Item label="Ocupado" value="ocupado" />
          </Picker>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{color:'black'}}>Tipo de usuario:</Text>
          <Picker
            style={[inputStyle, { backgroundColor: '#9ACFE0' }]}
            selectedValue={tipoUsuario}
            onValueChange={(itemValue) => setTipoUsuario(itemValue)}
          >
            <Picker.Item label="---" value="" />
            <Picker.Item label="Colaborador" value="colaborador" />
            <Picker.Item label="Administrador" value="administrador" />
          </Picker>
        </View>


        {datosGuardados && (
          <View>
            <Text style={{color:'black'}}>Datos guardados:</Text>
            <Text>{JSON.stringify(datosGuardados)}</Text>
          </View>
        )}
        </View>
        <View style={{ marginBottom: 30 }}>
        <Button color = '#4EBC7B' title="Guardar" onPress={handleGuardar} />
        </View>
        
      </View>
    </ScrollView>
  );
};

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

export default CrearColAd;