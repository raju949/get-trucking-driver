import * as React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TouchableHighlight,Picker,Modal } from 'react-native';
import { AntDesign,MaterialCommunityIcons,Feather,Entypo } from '@expo/vector-icons'; 
import { TextInput } from 'react-native';
import Contstant from 'expo-constants';
import CheckBox from 'expo-checkbox';
export default function Register({navigation}) {

    const [otp,setOTP] = useState();
    const [otptwo,setOTPtwo] = useState();
    const [phone,setPhone] = useState();
    const [location,setLocation] = useState();
    const [password,setPassword] = useState();
    const [termCheck,setTermCheck] = useState(false);
    const [policyCheck,setPolicyCheck] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [eye,setEye] = useState(false);
    const [message,setMessage] = useState();

    function PressHandler() {
        if(phone) {
            if(location){
                if(password){
                    navigation.navigate('Root',{screen:"Registernext",params:{phone:phone,password:password,location:location}});
                }else{
                    setMessage("Password required");
                }
            }else{
                setMessage("Location required");
            }
        }else{
            setMessage("Mobile Number required");
        }
    }

    function sendOTP(){
        var otp = new Random().nextInt(900000) + 100000;
        var url = 'http://gateway.onewaysms.sg:10002/api.aspx?apiusername=APIXTDN4S5ADS&apipassword=APIXTDN4S5ADSXTDN4&senderid=TEST&mobileno='+phone+'&message=Your%20one%20time%20password%20is%20'+otp+'&languagetype=1'
        fetch('https://get-trucking.com:9000/users/countries')
            .then((response) => response.json())
            .then((json) => {
                console.log("OTP send success")
            })
            .catch((error) => console.error(error));
    }


    const [countries,setCountries] = useState([]);
    useEffect(() => {
    fetch('https://get-trucking.com:9000/users/countries')
      .then((response) => response.json())
      .then((json) => {setCountries(json.data)})
      .catch((error) => console.error(error));
    }, []);

    const pickerItems = countries.map(i => (
        <Picker.Item key={i.id.toString()} label={i.name.toString()} value={i.id} />
  ));

  return (
            <View style={styles.container}>
                <View style={styles.backButtonContainer}>
                    <AntDesign name="arrowleft" size={24} color="black" onPress={()=>{navigation.goBack()}} />
                </View>
                <View style={styles.signupContainer}>
                    <Text style={styles.loginTitle}>
                        Sign Up to Get Order
                    </Text>
                </View>
                {/* Verify Modal */}

                        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View >
                                <Text style={{fontSize:18}}>
                                    Enter OTP for verification
                                </Text>
                                <View style={styles.Inputcontainer}>
                                        <View style={styles.iconContainer}>
                                            <Entypo name="time-slot" size={24} color="#878787" />
                                        </View>
                                        <TextInput style={styles.textinput}
                                        placeholder="Enter OTP"
                                        placeholderTextColor="#878787"
                                        value={otptwo}
                                        onChangeText={(e)=>{setOTPTwo(e)}}
                                        keyboardType="numeric"
                                        />
                                </View>
                                <View style={{justifyContent:"center",alignItems:"center"}}>
                                    <TouchableHighlight style={[styles.CloseContainer,{backgroundColor:"red"}]} onPress={() => setModalVisible(!modalVisible)}>
                                        <View>
                                            <Text style={{fontWeight:"bold",color:"white"}}>Close</Text>
                                        </View>
                                    </TouchableHighlight> 
                                </View>
                            </View>
                        </View>
                        </View>
                    </Modal>



                {/* End Verify Modal */}
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
                            <View>
                                <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' style={{justifyContent:"center",backgroundColor:"#2517bf",borderRadius:10}} onPress={() => {setModalVisible(!modalVisible);sendOTP()}}>
                                    <View style={{justifyContent:"center",alignItems:"center",padding:6,borderRadius:10}}>
                                        <Text style={{color:"white"}}>Verify</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                    </View>
                    <View style={styles.Inputcontainer}>
                            <View style={styles.iconContainer}>
                                <Feather name="map-pin" size={24} color="#878787" />
                            </View>
                                <Picker
                                    selectedValue={location}
                                    style={{ width: "85%" }}
                                    mode="dialog"
                                    prompt="Select Location"
                                    onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
                                >
                                    {pickerItems}
                                </Picker>
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

                            <View style={{justifyContent:"center",alignItems:"center"}}  >
                                <Text style={{color: 'red'}}>
                                    {message}
                                </Text>
                            </View>
                    
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{PressHandler()}}>
                            <View style={styles.buttonContainer} >
                                <Text style={styles.buttontitle}>
                                    Next
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
        width:"80%",
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
