import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'
import color from '../colors';
const catImageURL = "https://i.pinimg.com/564x/a7/45/d4/a745d490ae6782b87ede7ceed74835eb.jpg";

const Home = () => {
  
  const navigation = useNavigation();

  useEffect(() =>{
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome 
          name="home"
          size={24}
          color={'#7b61ff'} 
          style={{marginLeft: 15}}
        />
      ),
      headerRight: () => (
        <Image 
          source={{uri: catImageURL}}
          style={{
            width: 40,
            height: 40,
            marginRight:15
          }}
        />
      )
    });
  },[navigator]);

  return(
    <View style={styles.container}>
      <TouchableOpacity
        onPress={()=> navigation.navigate("Chat")}
        style={styles.chatButton}
      >
        <Entypo name="chat" size={24} color={"#fff"} />
      </TouchableOpacity>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: 'flex-end',
    backgroundColor: color.secondary
  },

  chatButton: {
    backgroundColor: color.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: color.secondary,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: .8,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50
  }
});