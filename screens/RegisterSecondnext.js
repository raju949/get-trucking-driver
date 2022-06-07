import * as React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TouchableHighlight,Picker } from 'react-native';
import { AntDesign,Feather } from '@expo/vector-icons'; 
import { TextInput } from 'react-native';
import Contstant from 'expo-constants'
export default function RegisterSecondnext({navigation,route}) {

    const [vehicleType,setVehicleType] = useState();
    const [VehicleModal,setVehicleModal] = useState();
    const [licencePlateNumber,setLicencePlateNumber] = useState();
    const [vehicle,setVehicle] = useState([]);
    const [message,setMessage] = useState();
    function PressHandler() {
        if(vehicleType){
            if(VehicleModal){
                if(licencePlateNumber){
                    navigation.navigate('Root',{screen:'RegistrationUpload',params:{...route.params,vehicleType:vehicleType,VehicleModal:VehicleModal,licencePlateNumber:licencePlateNumber}});
                }else{
                    setMessage("Licence Plate Number required");
                }
            }else{
                setMessage("Vehicle Modal required");
            }
        }else{
            setMessage("Vehicle type required");
        }
    }

    useEffect(() => {
       fetch('https://get-trucking.com:9000/vehicle/')
       .then((response) => response.json())
       .then((json) => {setVehicle(json.data);console.log(json.data)})
       .catch((error) => console.error(error));
     }, []);


     const pickerItems = vehicle.map(i => (
        <Picker.Item key={i.vehicle_id.toString()} label={i.vehicle_name.toString()} value={i.vehicle_id} />
    ));

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
                                <AntDesign name="car" size={24} color="#878787" />
                            </View>
                                <Picker
                                    selectedValue={vehicleType}
                                    style={{ width: "85%" }}
                                    mode="dialog"
                                    prompt="Vehicle Type"
                                    onValueChange={(itemValue, itemIndex) => setVehicleType(itemValue)}
                                >
                                    {pickerItems}
                                   
                                </Picker>
                            <View style={{width:30}}>
                                
                            </View>
                    </View>
                    <View style={styles.Inputcontainer}>
                            <View style={styles.iconContainer}>
                                <Feather name="credit-card" size={24} color="#878787" />
                            </View>
                            <TextInput style={[styles.textinput,{width:"90%"}]}
                            placeholder="Vehicle Modal"
                            placeholderTextColor="#878787"
                            value={VehicleModal}
                            onChangeText={(e)=>{setVehicleModal(e)}}
                            />
                    </View>

                    <View style={styles.Inputcontainer}>
                            <View style={styles.iconContainer}>
                                <AntDesign name="table" size={24} color="#878787" />
                            </View>
                            <TextInput style={[styles.textinput,{width:"90%"}]}
                            placeholder="Licence Plate Number"
                            placeholderTextColor="#878787"
                            value={licencePlateNumber}
                            onChangeText={(e)=>{setLicencePlateNumber(e)}}
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
