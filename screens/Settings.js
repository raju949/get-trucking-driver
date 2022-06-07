import  React,{useState,useCallback } from 'react';
import { MaterialIcons,FontAwesome5,FontAwesome  } from '@expo/vector-icons';
import {View,Text,Switch, TouchableHighlight,ScrollView,BackHandler,RefreshControl  } from 'react-native';
import Constant from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/core";

export default function Settings({navigation}) {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [isEnabled1, setIsEnabled1] = useState(false);
    const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
    const [user,setUser]=useState();
    const [message,setMessage] = useState();
    const [refreshing,setRefreshing] = useState(false);

    async function logout() {
        console.log("Button Clicked");
        await AsyncStorage.removeItem('LOGIN_TOKEN').then(() => {
            navigation.navigate('Root',{screen:'Login'})
        })
        return true;
    }

    function handleBackButtonClick() {
        navigation.navigate('Home')
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
        


    function serverResponse() {
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
                                console.log(responseData.data)
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

    useFocusEffect(
        useCallback(() => {
            serverResponse();
          //   return () => navigation.dispatch(StackActions.pop());
        }, [])
      );
    
      const onRefresh = useCallback(() => {
        serverResponse()
      }, []);

 return (
      <ScrollView style={{backgroundColor:"#fff",marginTop:Constant.statusBarHeight}} 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >
                <TouchableHighlight underlayColor='rgba(73,182,77)' onPress={() =>{navigation.navigate("Profile",user)}}>
                    <View style={{padding:15,
                        flexDirection:'row',
                        justifyContent:'space-around',
                        borderBottomWidth:1,
                        borderBottomColor:"#f5f5f5"
                        }}>
                        <View style={{paddingTop:15}}>
                            <FontAwesome5 name="user" size={24} color="black" />
                        </View>
                        <View style={{width:"70%"}}>
                            <Text style={{
                                padding:8,
                                borderRadius:10,
                                paddingLeft:10,
                                fontSize:16,
                                fontWeight:'bold'
                                }} >{user ? user.fullName : 'User Name'}</Text>
                                <Text style={{paddingLeft:10,color:"#999"}}>{user ? user.phone : 'Phone Number'}</Text>
                        </View>
                        <View style={{paddingTop:15}}>
                            <MaterialIcons name="keyboard-arrow-right" size={30} color="#858585"  />
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={{padding:15,
                    flexDirection:'row',
                    justifyContent:'space-around',
                    borderBottomWidth:1,
                    borderBottomColor:"#f5f5f5"
                    }}>
                    <View style={{paddingTop:5}}>
                        <FontAwesome5 name="map-marked-alt" size={24} color="black" />
                    </View>
                    <View style={{width:"70%"}}>
                        <Text style={{
                            padding:8,
                            borderRadius:10,
                            paddingLeft:10,
                            fontSize:16,
                            fontWeight:'bold'
                            }} >Saved Routes</Text>
                    </View>
                    <View style={{paddingTop:0}}>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="#858585" onPress={() =>{navigation.navigate("More")}} />
                    </View>
                </View>
                <View style={{padding:15,
                    flexDirection:'row',
                    justifyContent:'space-around',
                    borderBottomWidth:1,
                    borderBottomColor:"#f5f5f5"
                    }}>
                    <View style={{paddingTop:15}}>
                         <FontAwesome5 name="map-marked-alt" size={24} color="black" />
                    </View>
                    <View style={{width:"70%"}}>
                        <Text style={{
                            padding:8,
                            borderRadius:10,
                            paddingLeft:10,
                            fontSize:16,
                            fontWeight:'bold'
                            }} >Receive E-receipt</Text>
                            <Text style={{paddingLeft:10,color:"#999"}}>sample@gmail.com</Text>
                    </View>
                    <View style={{paddingTop:15}}>
                        <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                    </View>
                </View>
                <View style={{padding:15,
                    flexDirection:'row',
                    justifyContent:'space-around',
                    borderBottomWidth:1,
                    borderBottomColor:"#f5f5f5"
                    }}>
                    <View style={{paddingTop:15}}>
                         <FontAwesome5 name="map-marked-alt" size={24} color="black" />
                    </View>
                    <View style={{width:"70%"}}>
                        <Text style={{
                            padding:8,
                            borderRadius:10,
                            paddingLeft:10,
                            fontSize:16,
                            fontWeight:'bold'
                            }} >Enable Degital Signature</Text>
                            <Text style={{paddingLeft:10,color:"#999"}}>Delivery requires receipt to sign</Text>
                    </View>
                    <View style={{paddingTop:15}}>
                        <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled1 ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch1}
                                value={isEnabled1}
                            />
                    </View>
                </View>
                <View style={{padding:15,
                    flexDirection:'row',
                    justifyContent:'space-around',
                    borderBottomWidth:1,
                    borderBottomColor:"#f5f5f5"
                    }}>
                    <View style={{paddingTop:15}}>
                        <FontAwesome name="handshake-o" size={24} color="black" />
                    </View>
                    <View style={{width:"70%"}}>
                        <Text style={{
                            padding:8,
                            borderRadius:10,
                            paddingLeft:10,
                            fontSize:16,
                            fontWeight:'bold'
                            }} >Refer And Earn</Text>
                            <Text style={{paddingLeft:10,color:"#999"}}>100 Referal and 1K Earn</Text>
                    </View>
                    <View style={{paddingTop:15}}>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="#858585" onPress={() =>{navigation.navigate("ReferEarn")}} />
                    </View>
                </View>
                <View style={{padding:15,
                    flexDirection:'row',
                    justifyContent:'space-around',
                    borderBottomWidth:1,
                    borderBottomColor:"#f5f5f5"
                    }}>
                    <View style={{paddingTop:4}}>
                        <FontAwesome5 name="clipboard" size={24} color="black" />
                    </View>
                    <View style={{width:"70%"}}>
                        <Text style={{
                            padding:8,
                            borderRadius:10,
                            paddingLeft:10,
                            fontSize:16,
                            fontWeight:'bold'
                            }} >User Agreement</Text>
                    </View>
                    <View style={{paddingTop:4}}>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="#858585" onPress={() =>{navigation.navigate("More")}} />
                    </View>
                </View>
                <View style={{padding:15,
                    flexDirection:'row',
                    justifyContent:'space-around',
                    borderBottomWidth:1,
                    borderBottomColor:"#f5f5f5"
                    }}>
                    <View style={{paddingTop:4}}>
                        <FontAwesome5 name="clipboard-list" size={24} color="black" />
                    </View>
                    <View style={{width:"70%"}}>
                        <Text style={{
                            padding:8,
                            borderRadius:10,
                            paddingLeft:10,
                            fontSize:16,
                            fontWeight:'bold'
                            }} >Privacy Policy</Text>
                    </View>
                    <View style={{paddingTop:4}}>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="#858585" onPress={() =>{navigation.navigate("More")}} />
                    </View>
                </View>
                <View style={{padding:15,
                    flexDirection:'row',
                    justifyContent:'space-around',
                    borderBottomWidth:1,
                    borderBottomColor:"#f5f5f5"
                    }}>
                    <View style={{paddingTop:4}}>
                        <MaterialIcons name="privacy-tip" size={24} color="black" />
                    </View>
                    <View style={{width:"70%"}}>
                        <Text style={{
                            padding:8,
                            borderRadius:10,
                            paddingLeft:10,
                            fontSize:16,
                            fontWeight:'bold'
                            }} >Standard Rates</Text>
                    </View>
                    <View style={{paddingTop:4}}>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="#858585" onPress={() =>{navigation.navigate("More")}} />
                    </View>
                </View>
                <View style={{padding:15,
                    flexDirection:'row',
                    justifyContent:'space-around',
                    borderBottomWidth:1,
                    borderBottomColor:"#f5f5f5"
                    }}>
                    <View style={{paddingTop:4}}>
                        <MaterialIcons name="privacy-tip" size={24} color="black" />
                    </View>
                    <View style={{width:"70%"}}>
                        <Text style={{
                            padding:8,
                            borderRadius:10,
                            paddingLeft:10,
                            fontSize:16,
                            fontWeight:'bold'
                            }} >About Get Trucking</Text>
                    </View>
                    <View style={{paddingTop:4}}>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="#858585" onPress={() =>{navigation.navigate("More")}} />
                    </View>
                </View>
                <TouchableHighlight underlayColor='rgba(73,182,77)' onPress={() =>{logout()}}>
                    <View style={{padding:15,
                        flexDirection:'row',
                        justifyContent:'space-around',
                        borderBottomWidth:1,
                        borderBottomColor:"#f5f5f5"
                        }}>
                        <View style={{paddingTop:4}}>
                            <MaterialIcons name="dangerous" size={24} color="black" />
                        </View>
                        <View style={{width:"70%"}}>
                            <Text style={{
                                padding:8,
                                borderRadius:10,
                                paddingLeft:10,
                                fontSize:16,
                                fontWeight:'bold'
                                }} >Logout</Text>
                        </View>
                        <View style={{paddingTop:4}}>
                            <MaterialIcons name="logout" size={24} color="#858585"   />
                        </View>
                    </View>
                </TouchableHighlight>
        </ScrollView>
    );
  }