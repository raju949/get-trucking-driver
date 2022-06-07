import React, {useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  TouchableHighlight,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons,FontAwesome } from '@expo/vector-icons'
import Constant from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BankDetail({navigation})  {


const [Accountnumber,setAccountNumber] = useState();
const [bankCode,setBankCode] = useState();
const [Benifecary,setBenifecary] = useState();
const [bankName,setBankName] = useState();


function submitHandler(){
    AsyncStorage.getItem('LOGIN_TOKEN').then((value) => {
      if(value===null){
        navigation.navigate('Root',{screen:'Login'});
      }else{
        fetch('https://get-trucking.com:9000/driver/bank', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'authorization':value
          },
          body: JSON.stringify({
            accountNumber:Accountnumber,
            bankCode:bankCode,
            Benifecary: Benifecary,
            BankName:bankName
          })
      })
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
                  if(responseData.success === 1) {
                    Alert.alert("Bank Added Sucessfully wait untill admin approve detail");
                  }else{
                    console.log(responseData);
                  }
              })
          .catch((error) =>{
              console.log(error)
          })
      }
    })
}


  function handleBackButtonClick() {
    navigation.navigate("Wallet");
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

    return (
      <View style={{marginTop:Constant.statusBarHeight,backgroundColor:"white",flex:1}}>
          <View style={styles.headerBar}>
            <View style={styles.headerIcon}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={()=>navigation.navigate("Wallet")} />
            </View>
            <View style={styles.headerName}>
                <Text style={{fontSize:16,fontWeight:"bold"}}>Bank Detail</Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
                    <View style={styles.Inputcontainer}>
                            <TextInput style={styles.textinput}
                            placeholder="Account Number"
                            placeholderTextColor="#878787"
                            value={Accountnumber}
                            onChangeText={(e)=>{setAccountNumber(e)}}
                            />
                    </View>
                    <View style={styles.Inputcontainer}>
                            <TextInput style={styles.textinput}
                            placeholder="Bank Code"
                            placeholderTextColor="#878787"
                            value={bankCode}
                            onChangeText={(e)=>{setBankCode(e)}}
                            />
                    </View>
                    <View style={styles.Inputcontainer}>
                            <TextInput style={styles.textinput}
                            placeholder="Benifecary Name"
                            placeholderTextColor="#878787"
                            value={Benifecary}
                            onChangeText={(e)=>{setBenifecary(e)}}
                            />
                    </View>
                    <View style={styles.Inputcontainer}>
                            <TextInput style={styles.textinput}
                            placeholder="Bank Name"
                            placeholderTextColor="#878787"
                            value={bankName}
                            onChangeText={(e)=>{setBankName(e)}}
                            />
                    </View>
                    
                        <View style={styles.ButtonContainer}>
                            <TouchableHighlight style={styles.buttonStyle} onPress={()=>{submitHandler()}}>
                                    <View>
                                        <Text>Add Bank</Text>
                                    </View>
                            </TouchableHighlight>
                        </View>
                        
                    <View style={{justifyContent:"center",alignItems:"center",marginTop:180}}>
                            <FontAwesome name="bank" size={24} color="black" />
                    </View>
                    <View style={{justifyContent:"center",alignItems:"center",padding:30}}>
                        <Text style={{fontSize:15,fontWeight:"bold",color:"#b8b8b8"}}>There is no any bank added</Text>
                    </View>
            </View>
           </View>
           
        </View>
    )
}

const styles = StyleSheet.create({

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
  body:{
      padding:1
  },
  bodyContent: {
    paddingTop:30
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#000473",
  },
  buttontitle:{
      fontSize:20,
      fontWeight:"bold",
      color:"white",
  },
  Inputcontainer: {
    padding:0,
    margin:10,
    flexDirection:'row',
    justifyContent:'space-around',
    borderWidth:1,
    borderColor:"#bdbdbd",
    backgroundColor:'#fff',
    borderRadius:10
 },
 ButtonContainer: {
    padding:0,
    margin:10,
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'#fff',
    borderRadius:10
 },
  textinput:{
    width:"100%",
    backgroundColor:'#fff',
    padding:11,
    borderRadius:10,
    paddingLeft:10,
    fontSize:14,
    fontWeight:'bold'
},
buttonStyle: {
    justifyContent:"center",
    backgroundColor:"#f0f0f0",
    padding:15,
    paddingLeft:15,
    paddingRight:15,
    marginRight:-6,
    borderRadius:10
}
});
