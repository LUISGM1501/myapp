// App.jsx
import React, { useState } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './Inicio/Inicio';
import ForoFoUs from './Colaborador/PantallasColaborador/ForoColaborador/ForoFoUs';
import InformeProUsu from './Colaborador/PantallasColaborador/MiEquipo/EquipoColaborador';
import MiProyecto from './Colaborador/PantallasColaborador/MiProyecto/MiProyecto';
import InformeProyecto from './Colaborador/PantallasColaborador/MiProyecto/InformeProyecto';
import TareasProyecto from './Colaborador/PantallasColaborador/MiProyecto/TareasProyecto';
import ProyectosAdmin from  "./Administrador/Proyectos/ProyectosAdmin";
import ConsultarProyecto from './Administrador/Proyectos/ConsultarProyecto';
import ConsultarReunion from './Administrador/Proyectos/ConsultarReunion';
import CrearProyecto from './Administrador/Proyectos/CrearProyecto';
import CrearReunion from './Administrador/Proyectos/CrearReunion';
import TareasProyectos from './Administrador/Proyectos/TareasProyectos';
import InformesProyectos from './Administrador/Informes/InformeProyectos';
import ForoAdmin from './Administrador/Foro/ForoAdmin';
import ForoColab from './Administrador/Foro/ForoColab';
import Foros from './Administrador/Foro/Foros';
import ConsultarColab from './Administrador/Colaboradores/ConsultarColaborador';
import CrearColab from './Administrador/Colaboradores/CrearColaborador';
import Colaboradores from './Administrador/Colaboradores/Colaboradores';

const Menu = createDrawerNavigator();
const Stack = createStackNavigator();

const MiProyectoStack = () => {
  return (
    <Stack.Navigator initialRouteName="Proyectos">
      <Stack.Screen name="Proyectos" component={MiProyecto} />
      <Stack.Screen name="InformeProyecto" component={InformeProyecto} />
      <Stack.Screen name="TareasProyecto" component={TareasProyecto} />
    </Stack.Navigator>
  );
};

const ProyectosAdminStack = () => {
  return (
    <Stack.Navigator initialRouteName='Apartado Proyectos'>
      <Stack.Screen name='Apartado Proyectos' component={ProyectosAdmin} />
      <Stack.Screen name='ConsultarProyecto' component={ConsultarProyecto} />
      <Stack.Screen name='ConsultarReunion' component={ConsultarReunion} />
      <Stack.Screen name='CrearProyecto' component={CrearProyecto} />
      <Stack.Screen name='CrearReunion' component={CrearReunion} />
      <Stack.Screen name='TareasProyectos' component={TareasProyectos} />
    </Stack.Navigator>
  );
}

const ForoAdminStack  = () => {
  return (
    <Stack.Navigator initialRouteName='Foros Colaborativos'>
      <Stack.Screen name='Foros Colaborativos' component={Foros} />
      <Stack.Screen name='ForoAdmin'component={ForoAdmin} />
      <Stack.Screen name='ForoColab' component={ForoColab} />
    </Stack.Navigator>
  );
}

const ColaboradoresAdminStack = () => {
  return (
    <Stack.Navigator initialRouteName='Colaboradores'>
      <Stack.Screen name='Colaboradores' component={Colaboradores} />
      <Stack.Screen name='ConsultarColab' component={ConsultarColab} />
      <Stack.Screen name='CrearColab' component={CrearColab} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [userType, setUserType] = useState(null);

  const handleUserTypeSelection = (type) => {
    setUserType(type);
  };

  return (
    <NavigationContainer>
      <Menu.Navigator>
        {userType === null ? (
          <Menu.Screen name="Inicio">
            {(props) => <Inicio {...props} onSelectUserType={handleUserTypeSelection} />}
          </Menu.Screen>
        ) : userType === 'usuario' ? (
          <>
            <Menu.Screen name="Foro Colaboradores" component={ForoFoUs} />
            <Menu.Screen name="Mi Equipo" component={InformeProUsu} /> 
            <Menu.Screen name="Mi Proyecto" component={MiProyectoStack} />
            {/* Botón para salir y regresar al inicio */}
            <Menu.Screen name="Salir" >
              {({navigation}) => (
                <Button
                  title="Salir"
                  onPress={() => {
                    navigation.navigate("Inicio");
                    setUserType(null); // Limpia el userType
                  }}
                />
              )}
            </Menu.Screen>
          </>
        ) : (
          <>
            <Menu.Screen name="Gestion Proyectos" component={ProyectosAdminStack}/>
            <Menu.Screen name="Gestion Colabs" component={ColaboradoresAdminStack} />
            <Menu.Screen name="Informes" component={InformesProyectos} />
            <Menu.Screen name="Foros" component={ForoAdminStack} />
            {/* Botón para salir y regresar al inicio */}
            <Menu.Screen name="Salir">
              {({navigation}) => (
                <Button
                  title="Salir"
                  onPress={() => {
                    navigation.navigate("Inicio");
                    setUserType(null); // Limpia el userType
                  }}
                />
              )}
            </Menu.Screen>
          </>
        )}
      </Menu.Navigator>
    </NavigationContainer>
  );
}
