import React,{useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  BackHandler
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/core";

export default function Profile({navigation,route}) {

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
    



    console.log("Profile :",route.params);


    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri:'https://get-trucking.com:9000/'+route.params.photo}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{route.params.fullName}</Text>
              <Text style={styles.info}>{route.params.email} / {route.params.phone}</Text>
              
              <View style={styles.tableContainer}>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>Document Status :</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>{route.params.document_status ? "Verified":"Not Verified"}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>Identification :</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>{route.params.Identification}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>License Plate Number :</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>{route.params.License_plate_number}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>driving License Expiry :</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>{route.params.driving_license_expiry}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>vehicle Modal :</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>{route.params.vehicle_modal}</Text>
                  </View>
                </View>
                
              </View>
              <View style={styles.tableContainer}>
                <View>
                  <TouchableOpacity style={{padding:10,backgroundColor:"#000473",borderRadius:10,justifyContent:"center",alignItems:"center"}} onPress={()=>{navigation.navigate('EditProfile')}}>
                    <Text style={{color:"white"}}>Edit</Text>  
                  </TouchableOpacity>              
                  
                </View>
              </View>
              
              
            </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#000473",
    height:200,
  },
  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:10
  },
  tableContainer:{
    width:"100%",
    padding:20
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"black",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#7558FF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    padding:10,
    marginBottom:20,
    borderRadius:30,
    backgroundColor: "#7558FF",
  },
});
