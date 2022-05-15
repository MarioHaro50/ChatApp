import React, { useState, useContext, createContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
//*Importamos nuestras pantallas
import Chat from './screens/Chat';
import LoginEmail from './screens/LoginEmail';
import SingUp from './screens/Singup';
import Home from './screens/Home';

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) =>{
  const [user, setUser] = useState(null);
  return(
    <AuthenticatedUserContext.Provider value={{user,setUser}}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}

const ChatStack = () => {
  return(
    <Stack.Navigator defaultScreenOptions={Home} screenOptions={{ headerTintColor: "#fff", headerStyle: { backgroundColor: '#444'}}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

const AuthStack = () => {
  return(
    <Stack.Navigator defaultScreenOptions={LoginEmail} screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginEmail" component={LoginEmail} />
      <Stack.Screen name="SingUp" component={SingUp} />
    </Stack.Navigator>
  );
}

//? Esta función sirve para ver si vamos al chat o al login.
const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const noRegistrado = onAuthStateChanged(auth,
      async usuarioAutenticado => {
        usuarioAutenticado ? setUser(usuarioAutenticado) : setUser(null);
        setLoading(false);
      }
    );
    return () => noRegistrado();
  },[user]);
  
  if (loading) {
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return(
    <NavigationContainer>
      { user ? <ChatStack /> : <AuthStack /> }
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}


