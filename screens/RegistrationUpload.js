import * as React from 'react';
import {useEffect,useState} from 'react';
import { StyleSheet, Text, View,TouchableHighlight,Image,Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Contstant from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

export default function RegistrationUpload({navigation,route}) {

    const [vehicle, setVehicle] = useState(null);
    const [IDfront,setIDFront] = useState();
    const [IDback,setIDBack] = useState();
    const [photo,setPhoto] = useState();
    const [residencyProof,setResidencyProof] = useState();
    const [drivingLicense,setDrivingLicense] = useState();
    const [vehicleLicense,setVehicleLicense] = useState();
    const [vehicleBody,setVehicleBody] = useState();
    const [insurance,setInsurance] = useState();
    const [message,setMessage] = useState();

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

async function uploadIdFront(){
    let img = await pickImage();
    fetch('https://get-trucking.com:9000/driver/upload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: `data:image/png;base64,${img}`
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                    if(responseData.success === 1) {
                      setIDFront(responseData.data.image);
                    }else{
                        console.log(responseData)
                    }
                })
            .catch((error) =>{
                console.log(error)
    })
}

async function uploadIdBack(){
    let img = await pickImage();
    fetch('https://get-trucking.com:9000/driver/upload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: `data:image/png;base64,${img}`
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                    if(responseData.success === 1) {
                      setIDBack(responseData.data.image);
                    }else{
                        console.log(responseData)
                    }
                })
            .catch((error) =>{
                console.log(error)
    })
}

async function uploadPhoto(){
    let img = await pickImage();
    fetch('https://get-trucking.com:9000/driver/upload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: `data:image/png;base64,${img}`
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                    if(responseData.success === 1) {
                        setPhoto(responseData.data.image);
                    }else{
                        console.log(responseData)
                    }
                })
            .catch((error) =>{
                console.log(error)
    })
}

async function uploadResidencyProof(){
    let img = await pickImage();
    fetch('https://get-trucking.com:9000/driver/upload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: `data:image/png;base64,${img}`
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                    if(responseData.success === 1) {
                        setResidencyProof(responseData.data.image);
                    }else{
                        console.log(responseData)
                    }
                })
            .catch((error) =>{
                console.log(error)
    })
}

async function uploadDrivingLicense(){
    let img = await pickImage();
    fetch('https://get-trucking.com:9000/driver/upload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: `data:image/png;base64,${img}`
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                    if(responseData.success === 1) {
                        setDrivingLicense(responseData.data.image);
                    }else{
                        console.log(responseData)
                    }
                })
            .catch((error) =>{
                console.log(error)
    })
}

async function uploadVehicleLicense(){
    let img = await pickImage();
    fetch('https://get-trucking.com:9000/driver/upload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: `data:image/png;base64,${img}`
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                    if(responseData.success === 1) {
                        setVehicleLicense(responseData.data.image);
                    }else{
                        console.log(responseData)
                    }
                })
            .catch((error) =>{
                console.log(error)
    })
}

async function uploadVehicleBody(){
    let img = await pickImage();
    fetch('https://get-trucking.com:9000/driver/upload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: `data:image/png;base64,${img}`
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                    if(responseData.success === 1) {
                        setVehicleBody(responseData.data.image);
                    }else{
                        console.log(responseData)
                    }
                })
            .catch((error) =>{
                console.log(error)
    })
}

async function uploadInsurance(){
    let img = await pickImage();
    fetch('https://get-trucking.com:9000/driver/upload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: `data:image/png;base64,${img}`
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                    if(responseData.success === 1) {
                        setInsurance(responseData.data.image);
                    }else{
                        console.log(responseData)
                    }
                })
            .catch((error) =>{
                console.log(error)
    })
}


 const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      let content = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 });
      return content;
    }
  };

const {fullname,phone,password,identification,emergyPerson,emergyNumber,dlExpiry,vehicleType,VehicleModal,licencePlateNumber} = route.params;
  function submitHandler(){
      console.log(route.params);
    fetch('https://get-trucking.com:9000/driver', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName:fullname,
            email:'abc@gmail.com',
            phone:phone,
            password:password,
            Identification:identification,
            emergency_contact_person:emergyPerson,
            emergency_contact_number:emergyNumber,
            driving_license_expiry:dlExpiry,
            vehicle_type:vehicleType,
            vehicle_modal:VehicleModal,
            License_plate_number:licencePlateNumber,
            ID_card_front:IDfront,
            ID_card_back:IDback,
            photo:photo,
            Proof_of_Residency:residencyProof,
            Driving_license:drivingLicense,
            Vehicle_License:vehicleLicense,
            vehicle_body:vehicleBody,
            insurance:insurance
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
                if(responseData.success === 1) {
                    Alert.alert("Registration Complete Waiting Verification message not received");
                    navigation.navigate('Root',{screen:'Login'});
                }else{
                    setMessage("Unable to register")
                }
            })
        .catch((error) =>{
            console.log(error)
})
  }

  return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.backButtonContainer}>
                        <AntDesign name="arrowleft" size={24} color="black" onPress={()=>{navigation.goBack()}} />
                    </View>
                    <View style={styles.signupContainer}>
                        <Text style={styles.loginTitle}>
                            Registration upload Document
                        </Text>
                    </View>
                </View>
                

                <View style={{marginTop:20}}>
                    
                    <View style={styles.rowContainer}>
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{uploadIdFront()}} >
                            <View>
                                {IDfront && <Image source={{uri:'https://get-trucking.com:9000/'+IDfront}} style={{height:100,width:150,borderRadius:10}} />}
                                {!(IDfront) && <View style={styles.imageInputContainer}>
                                    <View style={{padding:10}}>
                                        <AntDesign name="plus" size={24} color="black" />
                                    </View>
                                    <Text style={styles.imageTitle}>
                                        ID Card(Front)
                                    </Text>
                                </View>}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{uploadIdBack()}} >
                            <View>
                            {IDback && <Image source={{uri:'https://get-trucking.com:9000/'+IDback}} style={{height:100,width:150,borderRadius:10}} />}
                                {!(IDback) && <View style={styles.imageInputContainer}>
                                <View style={{padding:10}}>
                                    <AntDesign name="plus" size={24} color="black" />
                                </View>
                                <Text style={styles.imageTitle}>
                                ID Card(Back)
                                </Text>
                            </View>}
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.rowContainer}>
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{uploadPhoto()}} >
                            <View>
                            {photo && <Image source={{uri:'https://get-trucking.com:9000/'+photo}} style={{height:100,width:150,borderRadius:10}} />}
                                {!(photo) && <View style={styles.imageInputContainer}>
                                    <View style={{padding:10}}>
                                        <AntDesign name="plus" size={24} color="black" />
                                    </View>
                                    <Text style={styles.imageTitle}>
                                        Photo
                                    </Text>
                                </View>}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{uploadResidencyProof()}} >
                        <View>
                            {residencyProof && <Image source={{uri:'https://get-trucking.com:9000/'+residencyProof}} style={{height:100,width:150,borderRadius:10}} />}
                                {!(residencyProof) && <View style={styles.imageInputContainer}>
                                    <View style={{padding:10}}>
                                        <AntDesign name="plus" size={24} color="black" />
                                    </View>
                                    <Text style={styles.imageTitle}>
                                        Residency Proof
                                    </Text>
                                </View>}
                        </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.rowContainer}>
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{uploadDrivingLicense()}} >
                            <View>
                                {drivingLicense && <Image source={{uri:'https://get-trucking.com:9000/'+drivingLicense}} style={{height:100,width:150,borderRadius:10}} />}
                                    {!(drivingLicense) && <View style={styles.imageInputContainer}>
                                        <View style={{padding:10}}>
                                            <AntDesign name="plus" size={24} color="black" />
                                        </View>
                                        <Text style={styles.imageTitle}>
                                            Driving License
                                        </Text>
                                    </View>}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{uploadVehicleLicense()}} >
                            <View>
                                {vehicleLicense && <Image source={{uri:'https://get-trucking.com:9000/'+vehicleLicense}} style={{height:100,width:150,borderRadius:10}} />}
                                    {!(vehicleLicense) && <View style={styles.imageInputContainer}>
                                        <View style={{padding:10}}>
                                            <AntDesign name="plus" size={24} color="black" />
                                        </View>
                                        <Text style={styles.imageTitle}>
                                            Vehicle License
                                        </Text>
                                    </View>}
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.rowContainer}>
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{uploadVehicleBody()}} >
                        <View>
                            {vehicleBody && <Image source={{uri:'https://get-trucking.com:9000/'+vehicleBody}} style={{height:100,width:150,borderRadius:10}} />}
                                {!(vehicleBody) && <View style={styles.imageInputContainer}>
                                    <View style={{padding:10}}>
                                        <AntDesign name="plus" size={24} color="black" />
                                    </View>
                                    <Text style={styles.imageTitle}>
                                        Vehicle Body
                                    </Text>
                                </View>}
                        </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{uploadInsurance()}} >
                        <View>
                            {insurance && <Image source={{uri:'https://get-trucking.com:9000/'+insurance}} style={{height:100,width:150,borderRadius:10}} />}
                                {!(insurance) && <View style={styles.imageInputContainer}>
                                    <View style={{padding:10}}>
                                        <AntDesign name="plus" size={24} color="black" />
                                    </View>
                                    <Text style={styles.imageTitle}>
                                        Insurance
                                    </Text>
                                </View>}
                        </View>
                        </TouchableHighlight>
                    </View>
                            <View style={{justifyContent:"center",alignItems:"center"}}  >
                                <Text style={{color: 'red'}}>
                                    {message}
                                </Text>
                            </View>
                    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{submitHandler()}}>
                        <View style={styles.buttonContainer} >
                            <Text style={styles.buttontitle}>
                                Complete
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
     rowContainer:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
     },
     loginTitle:{
        fontSize:16,
        fontWeight:"bold",
        alignItems: "center"
     },

    iconContainer:{
        alignItems:"center",
        justifyContent:"center",
        
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
    imageInputContainer:{
        width:150,
        justifyContent:"center",
        alignItems:"center",
        borderColor:"black",
        borderWidth:1,
        padding:20,
        borderRadius:10
    },
    imageTitle:{
        fontSize:12
    }   
  });
