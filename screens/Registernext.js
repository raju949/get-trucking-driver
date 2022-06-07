import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View,TouchableHighlight } from 'react-native';
import { AntDesign,Foundation,Feather } from '@expo/vector-icons'; 
import { TextInput } from 'react-native';
import Contstant from 'expo-constants'
export default function Registernext({navigation,route}) {

    const [fullname,setFullname] = useState();
    const [identification,setIdentification] = useState();
    const [emergyPerson,setEmergencyPerson] = useState();
    const [emergyNumber,setEmergencyNumber] = useState();
    const [dlExpiry,setDLExpiry] = useState();
    const [message,setMessage] = useState();

    function PressHandler() {
        if(fullname){
            if(identification){
                if(emergyPerson){
                    if(emergyNumber){
                        if(dlExpiry){
                            navigation.navigate('Root',{screen:'RegisterSecondnext',params:{...route.params,fullname:fullname,identification:identification,emergyPerson:emergyPerson,emergyNumber:emergyNumber,dlExpiry:dlExpiry}})
                        }else{
                            setMessage("Driving License Expiry date required");
                        }
                    }else{
                        setMessage("Emergy Number required");
                    }
                }else{
                    setMessage("Emergy Person name required");
                }
            }else{
                setMessage("Identification required");
            }
        }else{
            setMessage("Full name required");
        }
    }

  return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.backButtonContainer}>
                        <AntDesign name="arrowleft" size={24} color="black" onPress={()=>{navigation.goBack()}} />
                    </View>
                    <View style={styles.signupContainer}>
                        <Text style={styles.loginTitle}>
                            Registration
                        </Text>
                    </View>
                </View>
                

                <View style={styles.logincontainer}>
                    <View style={styles.Inputcontainer}>
                            <View style={styles.iconContainer}>
                                <Feather name="user" size={24} color="#878787" />
                            </View>
                            <TextInput style={[styles.textinput,{width:"90%"}]}
                            placeholder="Full Name"
                            placeholderTextColor="#878787"
                            value={fullname}
                            onChangeText={(e)=>{setFullname(e)}}
                            />
                    </View>
                    <View style={styles.Inputcontainer}>
                            <View style={styles.iconContainer}>
                                <Feather name="credit-card" size={24} color="#878787" />
                            </View>
                            <TextInput style={[styles.textinput,{width:"90%"}]}
                            placeholder="Identification"
                            placeholderTextColor="#878787"
                            value={identification}
                            onChangeText={(e)=>{setIdentification(e)}}
                            />
                    </View>

                    <View style={styles.Inputcontainer}>
                            <View style={styles.iconContainer}>
                                <Foundation name="lightbulb" size={24} color="#ff0000" />
                            </View>
                            <TextInput style={[styles.textinput,{width:"90%"}]}
                            placeholder="Emergency Contact Person"
                            placeholderTextColor="#878787"
                            value={emergyPerson}
                            onChangeText={(e)=>{setEmergencyPerson(e)}}
                            />
                    </View>

                    <View style={styles.Inputcontainer}>
                            <View style={styles.iconContainer}>
                                <Feather name="phone" size={24} color="#878787" />
                            </View>
                            <TextInput style={[styles.textinput,{width:"90%"}]}
                            placeholder="Emergency Contact Number"
                            placeholderTextColor="#878787"
                            value={emergyNumber}
                            keyboardType="numeric"
                            onChangeText={(e)=>{setEmergencyNumber(e)}}
                            />
                    </View>

                    <View style={styles.Inputcontainer}>
                            <View style={styles.iconContainer}>
                                <Feather name="credit-card" size={24} color="#878787" />
                            </View>
                            <TextInput style={[styles.textinput,{width:"90%"}]}
                            placeholder="Driving License Expiry"
                            placeholderTextColor="#878787"
                            value={dlExpiry}
                            onChangeText={(e)=>{setDLExpiry(e)}}
                            />
                    </View>

                    <View style={{justifyContent:"center",alignItems:"center"}}  >
                        <Text style={{color: 'red'}}>
                            {message}
                        </Text>
                    </View>

                    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{PressHandler()}}>
                        <View style={styles.buttonContainer} >
                            <Text style={styles.buttontitle}>
                                Next Step
                            </Text>
                        </View>
                    </TouchableHighlight>
                    
                    <View style={styles.accountContainer} >
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{navigation.navigate("Login")}}>
                            <Text style={styles.accounttitle}>
                               Already have an account?
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:Contstant.statusBarHeight,
      backgroundColor:"#fff"
     },
     backButtonContainer: {
        padding:10,
        justifyContent:"center",
        alignItems: "center"
     },
     signupContainer:{
         padding:5,
         justifyContent:"center",
         alignItems: "center"
     },
     loginTitle:{
        fontSize:16,
        fontWeight:"bold",
        alignItems: "center"
     },
     logincontainer:{
        padding:20
     },
     Inputcontainer: {
        padding:8,
        margin:10,
        flexDirection:'row',
        justifyContent:'space-around',
        borderWidth:1,
        borderColor:"#bdbdbd",
        backgroundColor:'#fff',
        borderRadius:10
     },
     CheckBoxcontainer: {
        padding:8,
        margin:10,
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:'#fff',
        borderRadius:10
     },
     textinput:{
        width:"85%",
        backgroundColor:'#fff',
        padding:3,
        borderRadius:10,
        paddingLeft:10,
        fontSize:14,
        fontWeight:'bold'
    },
    CheckBoxContent:{
        width:"90%",
        backgroundColor:'#fff',
        padding:3,
        paddingLeft:10,
        fontWeight:'bold'
    },
    iconContainer:{
        alignItems:"center",
        justifyContent:"center"
    },
    checkbox: {
        alignSelf: "center",
    },
    buttonContainer:{
        alignItems: "center",
        marginTop:20,
        backgroundColor:'#000473',
        padding:15,
        marginRight:30,
        marginLeft:30,
        borderRadius:30
    },
    buttontitle:{
        fontSize:20,
        fontWeight:"bold",
        color:"white",
    },
    accountContainer:{
        alignItems: "center",
        marginTop:20
    },
    accounttitle:{
        fontSize:16,
        fontWeight:"bold",
        color:"black"
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: 'rgba(0,0,0,0.3)'
      },
    modalView: {
        backgroundColor: "white",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      CloseContainer:{
        alignItems: "center",
        marginTop:20,
        backgroundColor:'#000473',
        padding:15,
        marginRight:30,
        marginLeft:30,
        borderRadius:30
    },
     
  });
