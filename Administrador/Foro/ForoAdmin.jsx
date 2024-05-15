import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function ForoFoAd() {
  const [mensaje, setMensaje] = useState('');
  const [mensajesForo, setMensajesForo] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://192.168.0.13:4000/api/foro/660d97e2783f0dbbe89eba18/mensaje');
      const mensajes = response.data;

      // Obtener el nombre y el departamento del autor de cada mensaje
      const mensajesConAutor = await Promise.all(mensajes.map(async (mensaje) => {
        const autor = await dataAdmin(mensaje.idAutor);
        if (!autor) {
          return { ...mensaje, nombreAutor: 'No encontrado', departamentoAutor: 'No encontrado' };
        }
        return { ...mensaje, nombreAutor: autor.nombre, departamentoAutor: autor.departamento };
      }));

      setMensajesForo(mensajesConAutor);
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
    }
  };

  const dataAdmin = async (idAutor) => {
    try {
      const response = await axios.get(`http://192.168.0.13:4000/api/Admin/${idAutor}`);

      if (!response || !response.data) {
        console.error('Error: Datos del administrador no encontrados');
        return null;
      }

      return response.data;
    } catch (error) {
      console.error('Error al obtener datos del administrador:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleChange = (text) => {
    setMensaje(text);
  };

  const enviarMensaje = async () => {
    try {
      // Obtener datos del usuario de AsyncStorage
      const idAutor = await AsyncStorage.getItem('userId');
      const nombreAutor = await AsyncStorage.getItem('username');

      if (!idAutor || !nombreAutor) {
        console.error('Error: Datos del usuario no encontrados en AsyncStorage');
        return;
      }

      await axios.post(
        'http://192.168.0.13:4000/api/foro/660d97e2783f0dbbe89eba18/mensaje',
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
      <Text style={styles.title}>Chat de administradores</Text>
      <ScrollView style={styles.messagesContainer}>
        {mensajesForo.map((mensaje, index) => (
          <View key={index} style={styles.message}>
            <Text>{mensaje.nombreAutor} - {mensaje.departamentoAutor}: {mensaje.contenido}</Text>
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

export default ForoFoAd;
