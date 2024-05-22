import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Inicio = ({ onSelectUserType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://requebackend-da0aea993398.herokuapp.com/api/login', {
        nombre: username,
        password: password,
      });

      if (response && response.data) {
        const { role, id } = response.data;
        onSelectUserType(role);

        // Guardar el nombre de usuario y el ID del usuario en AsyncStorage
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('userId', id);

        setUsername('');
        setPassword('');
        setError('');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: 'lightblue', padding: 20, borderRadius: 10, marginBottom: 20, width:350 }}>
      <Text style={styles.title}>The DriverP</Text>
      <TextInput
        style={inputStyle}
        placeholderTextColor= 'gray'
        placeholder="Usuario"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={inputStyle}
        placeholderTextColor= 'gray'
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button color = "#57AEBD" title="Iniciar Sesión" onPress={handleLogin} />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    color: 'black', 
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

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

export default Inicio;