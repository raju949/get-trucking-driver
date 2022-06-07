import React, { useState, useCallback, useEffect,useLayoutEffect } from 'react';
import {View,Text,StyleSheet,BackHandler}  from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {AntDesign} from '@expo/vector-icons';
import Constants from 'expo-constants';
import { db } from '../Fire';

function DriverChat({navigation,route}) {
 
    // useEffect(() => {
    //   setMessages([
    //     {
    //       _id: 1,
    //       text: 'Hello Rider, How Can i help you',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'Admin',
    //         avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
    //       },
    //     },
    //   ])
    // }, [])


    const [messages, setMessages] = useState([]);
    const [orderId,setOrderId] = useState(route.params.orderId);

    function handleBackButtonClick() {
      navigation.goBack()
        return true;
      }
    
      useEffect(() => {
  
        setOrderId(route.params.orderId);
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, [route.params.orderId]);



      
      useLayoutEffect(()=>{
        const unsubscribe =  db.collection('chats_'+orderId).orderBy('createdAt','desc').onSnapshot(snapshot => {setMessages(
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
     db.collection('chats_'+orderId).add({
         _id,
         createdAt,
         text,
         user
     })
 }, [])



    // const onSend = useCallback((messages = []) => {
    //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // }, [])

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <View style={styles.headerIcon}>
                <AntDesign name="arrowleft" size={24} color="black" onPress={() =>{navigation.goBack()}}/>
                </View>
                <View style={styles.headerName}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>Talk to Driver</Text>
                </View>
                <View style={styles.headerNotification}>
                
                </View>
            </View>
            <GiftedChat
              messages={messages}
              showAvatarForEveryMessage={true}
              onSend={messages => onSend(messages)}
              user={{
                  _id: 'Driver@gmail.com',
                  name:'Driver',
                  avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT63spmOe8Ogz8W_TCu9ia13-x3ziQuZ51hsuRSomROYx7_3LEA6mkUV4f59PBMovqTjo4&usqp=CAU'
              }}
            />
        </View>
        
      )
}

export default DriverChat;
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