import React, { useState, useCallback,useLayoutEffect } from 'react';
import {View,Text,StyleSheet,BackHandler}  from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {AntDesign} from '@expo/vector-icons';
import Constants from 'expo-constants';
import { auth, db } from '../Fire';
import { useFocusEffect } from "@react-navigation/core";
function SupportChat({navigation,route}) {
 
   

    const [messages, setMessages] = useState([]);

    
   
      useLayoutEffect(()=>{
        const unsubscribe =  db.collection('chats_driver_'+'admin').orderBy('createdAt','desc').onSnapshot(snapshot => {setMessages(
             snapshot.docs.map(doc=>({
                 _id:doc.data()._id,
                 createdAt:doc.data().createdAt.toDate(),
                 text:doc.data().text,
                 user:doc.data().user,
             }))
         );
     })
         return unsubscribe;
     })
  
   const onSend = useCallback((messages = []) => {
     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
     const { 
         _id,
         createdAt,
         text,
         user
     } = messages[0]
     db.collection('chats_driver_'+'admin').add({
         _id,
         createdAt,
         text,
         user
     })
 }, [])
 function handleBackButtonClick() {
  navigation.navigate("Help Center");
  return true;
  }

  useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          return handleBackButtonClick()
        };
  
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }, [])
    );


    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <View style={styles.headerIcon}>
                <AntDesign name="arrowleft" size={24} color="black" onPress={() =>{navigation.goBack()}}/>
                </View>
                <View style={styles.headerName}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>Talk to Admin</Text>
                </View>
                <View style={styles.headerNotification}>
                
                </View>
            </View>
            <GiftedChat
              messages={messages}
              showAvatarForEveryMessage={true}
              onSend={messages => onSend(messages)}
              user={{
                  _id: 'sample@gmail.com',
                  name:'Pawan',
                  avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT63spmOe8Ogz8W_TCu9ia13-x3ziQuZ51hsuRSomROYx7_3LEA6mkUV4f59PBMovqTjo4&usqp=CAU'
              }}
            />
        </View>
        
      )
}

export default SupportChat;
const styles = StyleSheet.create({
    container: {
      flex:1,
      marginTop:Constants.statusBarHeight,
      backgroundColor:"white"
    },
    headerBar: {
      flexDirection:"row",
      justifyContent:"space-around",
      padding:5,
      paddingTop:15
    },
    headerName:{
      width:"80%",
      justifyContent:"center",
      alignItems:"center"
    }
})