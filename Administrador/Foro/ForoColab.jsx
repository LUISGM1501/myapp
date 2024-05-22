// ForoColab.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function ForoColab() {
  const [mensaje, setMensaje] = useState('');
  const [mensajesForo, setMensajesForo] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
<<<<<<< Updated upstream
      const response = await axios.get('http://192.168.18.104:4000/api/foro/660d97e3783f0dbbe89eba1a/mensaje');
=======
      const response = await axios.get('http://localhost:4000/api/foro/660d97e3783f0dbbe89eba1a/mensaje');
>>>>>>> Stashed changes
      const mensajes = response.data;
      
      // Obtener el nombre y el departamento del autor de cada mensaje
      const mensajesConAutor = await Promise.all(mensajes.map(async (mensaje) => {
        const autor = await obtenerAutor(mensaje.idAutor);
        
        if (!autor) {
          console.error('Error: Datos del autor no encontrados');
          return null; // O manejar de otra forma
        }

        return { ...mensaje, nombreAutor: autor.nombre, departamentoAutor: autor.departamento };
      }));
      
      setMensajesForo(mensajesConAutor.filter(Boolean)); // Filtrar los elementos nulos
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
    }
  };

  const obtenerAutor = async (idAutor) => {
    try {
<<<<<<< Updated upstream
      const response = await axios.get(`http://192.168.18.104:4000/api/colaborador/${idAutor}`);
=======
      const response = await axios.get(`http://localhost:4000/api/colaborador/${idAutor}`);
>>>>>>> Stashed changes
      
      if (!response || !response.data) {
        console.error('Error: Datos del autor no encontrados');
        return null;
      }

      return response.data;
    } catch (error) {
      console.error('Error al obtener datos del autor:', error);
      return null;
    }
  };

  const handleChange = (text) => {
    setMensaje(text);
  };

  const enviarMensaje = async () => {
    try {
      const idAutor = await AsyncStorage.getItem('userId');
      const nombreAutor = await AsyncStorage.getItem('username');

      await axios.post(
<<<<<<< Updated upstream
        'http://192.168.18.104:4000/api/foro/660d97e3783f0dbbe89eba1a/mensaje',
=======
        'http://localhost:4000/api/foro/660d97e3783f0dbbe89eba1a/mensaje',
>>>>>>> Stashed changes
        { nombreAutor, idAutor, contenido: mensaje }
      );

      setMensaje('');
      fetchMessages();
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat de colaboradores</Text>
      <ScrollView style={styles.messagesContainer}>
        {mensajesForo.map((mensaje, index) => (
          <View key={index} style={styles.message}>
            <Text>{mensaje.nombreAutor} - {mensaje.departamentoAutor}: {mensaje.contenido}</Text>
            <Text>Creado en: {new Date(mensaje.createdAt).toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          value={mensaje}
          onChangeText={handleChange}
          placeholderTextColor='gray'
          placeholder="Escribe tu mensaje..."
        />
        <Button title="Enviar" onPress={enviarMensaje} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    backgroundColor: 'lightblue',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default ForoColab;
