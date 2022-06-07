import * as React from 'react';
import {useState,useEffect,useCallback} from 'react';
import { StyleSheet, Text, View,TouchableHighlight,BackHandler } from 'react-native';
import { AntDesign,MaterialCommunityIcons,Feather } from '@expo/vector-icons'; 
import { TextInput } from 'react-native';
import Contstant from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/core";
import CheckBox from 'expo-checkbox';

export default function Login({navigation}) {

    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [termCheck,setTermCheck] = useState(false);
    const [policyCheck,setPolicyCheck] = useState(false);
    const [eye,setEye] = useState(false);
    const [message,setMessage] = useState();
    const [token,setToken] = useState(null);


    function handleBackButtonClick() {
        navigation.navigate('Country')
          return true;
        }
    
        useFocusEffect(
            useCallback(() => {
              const onBackPress = () => {
                return handleBackButtonClick()
              };
        
              BackHandler.addEventListener('hardwareBackPress', onBackPress);
        
              return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            }, [])
          );


    const PressHandler = async () => {

        if(termCheck && policyCheck){
            if(phone.length===10){
                try {
                    fetch('https://get-trucking.com:9000/driver/login', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            phone: phone,
                            password: password
                        })
                    })
                        .then((response) => response.json())
                        .then(async (responseData) => {
                                if(responseData.success === 1) {
                                    

                                    await AsyncStorage.setItem('LOGIN_TOKEN',responseData.token);
                                    await AsyncStorage.setItem('DRIVER_ID',responseData.results.driver_id.toString());

                                    navigation.navigate('Home')



                                }else{
                                    setMessage(responseData.data)
                                }
                            })
                        .catch((error) =>{
                            setMessage(error)
                        })
                }
                catch (err) {
                    console.error(err);
                }
                
            }else{
                setMessage("Please enter a valid Number")
            }
        }else{
            setMessage("Please Accept Term and condition and privacy Policy")
        }
        
    }


  return (
            <View style={styles.container}>
                <View style={styles.backButtonContainer}>
                    <AntDesign name="arrowleft" size={24} color="black" onPress={()=>{navigation.navigate('Root',{screen:'Country'})}} />
                </View>
                <View style={styles.signupContainer}>
                    <Text style={styles.loginTitle}>
                        Login to Get Order
                    </Text>
                </View>
                <View style={styles.logincontainer}>
                    <View style={styles.Inputcontainer}>
                            <View style={styles.iconContainer}>
                                <Feather name="smartphone" size={24} color="#878787" />
                            </View>
                            <TextInput style={styles.textinput}
                            placeholder="Mobile Number"
                            placeholderTextColor="#878787"
                            value={phone}
                            onChangeText={(e)=>{setPhone(e)}}
                            keyboardType="numeric"
                            />
                            <View style={{width:30}}>
                                
                            </View>
                    </View>
                    <View style={styles.Inputcontainer}>
                            <View style={styles.iconContainer}>
                                <MaterialCommunityIcons name="account-key-outline" size={24} color="#878787" />
                            </View>
                            <TextInput style={styles.textinput}
                            secureTextEntry={!eye}
                            placeholder="Password"
                            value={password}
                            onChangeText={(e)=>{setPassword(e)}}
                            placeholderTextColor="#878787" />
                            <View style={styles.iconContainer}>
                                <Feather name={eye ? "eye" : "eye-off"} size={24} color="#878787" onPress={()=>{setEye(!eye)}} />
                            </View>
                    </View>
                    <View style={styles.CheckBoxcontainer}>
                            <View style={styles.iconContainer}>
                                <CheckBox style={styles.checkbox}  value={termCheck} onValueChange={setTermCheck} tintColors={{ true: '#424fff', false: 'black' }} />
                            </View>
                            <View style={styles.CheckBoxContent}>
                                <Text>
                                    I have read, understood and accept the Terms and Conditions and Privacy Policy.
                                </Text>
                            </View>
                    </View>
                    <View style={styles.CheckBoxcontainer}>
                            <View style={styles.iconContainer}>
                                <CheckBox style={styles.checkbox} value={policyCheck} onValueChange={setPolicyCheck} tintColors={{ true: '#424fff', false: 'black' }}  />
                            </View>
                            <View style={styles.CheckBoxContent}  >
                                <Text>
                                    I agree the use of my personal data for direct marketing in accordance with the stated privacy Policy.
                                </Text>
                            </View>
                    </View>

                    <View style={{justifyContent:"center",alignItems:"center"}}>
                        <Text style={{padding:5,fontWeight:"bold",color:"red"}}>
                            {message}
                        </Text>
                    </View>
                    
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{PressHandler()}}>
                            <View style={styles.buttonContainer} >
                                <Text style={styles.buttontitle}>
                                    Login
                                </Text>
                            </View>
                        </TouchableHighlight>
                    
                    <View style={styles.accountContainer} >
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{navigation.navigate("Register")}}>
                            <Text style={styles.accounttitle}>
                               If don't have an account?
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
        padding:20,
        paddingTop:5
     },
     signupContainer:{
         padding:20
     },
     loginTitle:{
        fontSize:22,
        fontWeight:"bold"
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
        borderTopRightRadius:60,
        borderBottomLeftRadius:60
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
    }
     
  });
