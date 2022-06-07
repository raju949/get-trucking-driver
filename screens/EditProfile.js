import * as React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View,BackHandler,Button } from 'react-native';
import { Ionicons,Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { Alert } from 'react-native';
import Constant from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function EditProfile({navigation}) {

    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [fullName,setFullname] = useState('');
    const [email,setEmail] = useState('');
    const [user,setUser] = useState([]);
    const [message,setMessage] = useState('');
    function PressHandler() {
        Alert.alert("Phone: "+phone+" Password: "+password);
        navigation.navigate("Home");
    }
    function handleBackButtonClick() {
        navigation.navigate("Settings");
        return true;
      }

    useEffect(() => { 
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    
    useEffect(() => {
        
        AsyncStorage.getItem('LOGIN_TOKEN').then((value) => {
            if(value!==null){
              fetch('https://get-trucking.com:9000/driver/', {
                  method: 'GET',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'authorization':value
                  }
              })
                  .then((response) => response.json())
                  .then((responseData) => {
                          if(responseData.success === 1) {
                                setUser(responseData.data);
                                setFullname(responseData.data.fullName);
                                setEmail(responseData.data.email);
                                setPhone(responseData.data.phone);
                          }else{
                             setMessage(responseData.message);
                          }
                      })
                  .catch((error) =>{
                      setMessage(error)
                  })
            }
          }).catch((error) =>{
              consoe.log(error)
          })
      
      },[])

      function submitHandler(){
        AsyncStorage.getItem('LOGIN_TOKEN').then((value) => {
            if(value!==null){
              fetch('https://get-trucking.com:9000/driver/', {
                  method: 'PATCH',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'authorization':value
                  },
                  body: JSON.stringify({
                    email:email,
                    phone:phone,
                    fullName: fullName
                })
              })
                  .then((response) => response.json())
                  .then((responseData) => {
                          if(responseData.success === 1) {
                                setMessage("User Updated");
                                navigation.navigate("Settings")
                          }else{
                             setMessage(responseData.message);
                          }
                      })
                  .catch((error) =>{
                      setMessage(error)
                  })
            }
          }).catch((error) =>{
              consoe.log(error)
          })
      
      }

  return (
            <View style={styles.container}>
                <View style={styles.headerBar}>
                    <View style={styles.headerIcon}>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={()=>navigation.navigate("Settings")} />
                    </View>
                    <View style={styles.headerName}>
                        <Text style={{fontSize:16,fontWeight:"bold"}}>Edit Profile</Text>
                    </View>
                </View>
                <View style={{padding:20,marginTop:50}}>
                    <View style={{flexDirection:'row',color:'blue',marginBottom:30}}>
                        <Text style={{color:'#404040',fontSize:28,fontWeight:'bold'}}>Edit Account Detail</Text>
                    </View>
                    <View style={{padding:8,margin:10,
                            flexDirection:'row',
                            justifyContent:'space-around',
                            elevation:2,
                            backgroundColor:'#fff',
                            borderRadius:10
                            }}>
                                <Feather name="user" size={24} color="black" />
                            <TextInput style={{width:"85%",
                            backgroundColor:'#fff',
                            padding:3,
                            borderRadius:10,
                            paddingLeft:10,
                            fontSize:12,
                            fontWeight:'bold'
                            }}
                            value={fullName}
                            onChangeText={(e)=>setFullname(e)}
                            placeholderTextColor="black"
                            placeholder="First Name" />
                    </View>
                    <View style={{padding:8,margin:10,
                            flexDirection:'row',
                            justifyContent:'space-around',
                            elevation:2,
                            backgroundColor:'#fff',
                            borderRadius:10
                            }}>
                                <Feather name="user" size={24} color="black" />
                            <TextInput style={{width:"85%",
                            backgroundColor:'#fff',
                            padding:3,
                            borderRadius:10,
                            paddingLeft:10,
                            fontSize:12,
                            fontWeight:'bold'
                            }}
                            value={phone}
                            onChangeText={(e)=>setPhone(e)}
                            placeholderTextColor="black"
                            placeholder="Phone Number" />
                    </View>
                    <View style={{padding:8,margin:10,
                            flexDirection:'row',
                            justifyContent:'space-around',
                            elevation:2,
                            backgroundColor:'#fff',
                            borderRadius:10
                            }}>
                                <Feather name="mail" size={24} color="black" />
                            <TextInput style={{width:"85%",
                            backgroundColor:'#fff',
                            padding:3,
                            borderRadius:10,
                            paddingLeft:10,
                            fontSize:12,
                            fontWeight:'bold'
                            }}
                            value={email}
                            onChangeText={(e)=>setEmail(e)}
                            placeholderTextColor="black"
                            placeholder="Email" />
                    </View>
                    
                    <View style={{padding:8,marginTop:220,
                            flexDirection:'row',
                            justifyContent:'space-around'
                            }}>
                        <Button title ="Save" color="#002a54" onPress={() => submitHandler()}></Button>
                        <Button title ="Cancel" color="red" onPress={() => {navigation.navigate('Settings')}}></Button>
                    </View>
                </View>
            </View>
  );
}


const styles = StyleSheet.create({
    container: {
        marginTop:Constant.statusBarHeight,
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'flex-start',
     },
   
     image :{
        marginTop:80,
        marginBottom: 0
    },
    loginBox:{
        backgroundColor: '#fff',
        width:"80%",
        borderRadius:10,
        paddingTop:40,
        paddingBottom:40
    },
    headerBar: {
        flexDirection:"row",
        justifyContent:"space-around",
        padding:5,
        paddingTop:15
      },
      headerName:{
        width:"80%",
        justifyContent:"center"
      },
      headerIcon:{
          marginRight:10
      }
       
  });
