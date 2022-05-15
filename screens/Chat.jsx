import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native';
import { GiftedChat  } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore'
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';
import { LogBox } from 'react-native';
import _ from 'lodash';
import * as Notifications from 'expo-notifications';

//? Notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = message => {
if (message.indexOf('Setting a timer') <= -1) {
   _console.warn(message);
   }
};


export default function Chat() {
  //? Notificaciones
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  
  const [mensajes, setMensajes] = useState([]);
  const navigation = useNavigation();

  //? Notificaciones
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  //? Notificaciones
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    console.log(token);
    return token;
  }

  //? Notificaciones
  
  const enviarMensaje = token => {
    fetch('AIzaSyCJCCHXV89pE2DeNN8SjfWG9-dvbUaDJYk')
  }
  

  const onSignOut = () => {
    signOut(auth).catch( error => console.log(error));
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={onSignOut}
        >
          <AntDesign 
            name="logout"
            size={24} 
            color={"#fff"}
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
      )
    });
  },[navigation]);

  useLayoutEffect(()=> {
    const collectionRef = collection(db, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      console.log('snapshot');
      setMensajes(
        snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    });
    return () => unsubscribe();
  },[]);

  const onSend = useCallback((mensajes = []) => {
    setMensajes(mensajesPrevios => GiftedChat.append(mensajesPrevios, mensajes));

    const {_id, createdAt, text, user} = mensajes[0];
    addDoc(collection(db, 'chats'), {
      _id,
      createdAt,
      text,
      user
    });

  },[]);

  return(
    <GiftedChat
      messages={mensajes}
      onSend={mensajes => onSend(mensajes)}
      user={{
        _id: auth?.currentUser.email,
        avatar: 'https://i.pravatar.cc/300'
      }}
      messagesContainerStyle={{
        backgroundColor: colors.secondary,
      }}
      textInputStyle={{borderRadius: 10}}
      placeholder={"Escribe un mensaje..."}
    />
  );
}