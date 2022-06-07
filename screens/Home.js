import React,{useState,useEffect,useCallback} from 'react';
import {View,Text,StyleSheet,TouchableHighlight,Modal,BackHandler,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useFocusEffect } from "@react-navigation/core";

function Home({navigation}) {
  const [modalVisible,setModalVisible] = useState(false);
  
  useFocusEffect(
    useCallback(() => {
   var driver_id = "";   
    AsyncStorage.getItem('DRIVER_ID').then((value) => {
      if(value!==null){
        driver_id = value
      }
    })
      AsyncStorage.getItem('LOGIN_TOKEN').then((value) => {
    if(value===null){
      navigation.navigate('Root',{screen:'Login'});
    }else{
      fetch('https://get-trucking.com:9000/driver/getHomeCount', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization':value
        },
        body: JSON.stringify({
          driver_id: driver_id
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
                if(responseData.success === 1) {
                   setCompleted(responseData.data[0].complete_count);
                   setOngoing(responseData.data[0].ongoing_count);
                }
            })
        .catch((error) =>{
            console.log(error)
        })
    }
  })

      const onBackPress = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            }, ], {
                cancelable: false
            }
         )
         return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );


const [clicked,setClicked] = useState(false);

const [completed,setCompleted] = useState(0);
const [ongoing,setOngoing] = useState(0);


const toggle = () =>  setModalVisible(!modalVisible);

useEffect(() => {
  toggle();

},[]);

async function allowLocation(){
  AsyncStorage.getItem('LOGIN_TOKEN').then((value) => {
    if(value===null){
      navigation.navigate('Root',{screen:'Login'});
    }else{
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }
        toggle();
        await Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 10000, distanceInterval: 1 }, (loc) => setLocation(loc.coords));
      })();
    }
  })
}

 



async function setLocation(location){
  const fcm = await AsyncStorage.getItem('FCM_TOKEN');
  console.log(fcm);
  AsyncStorage.getItem('LOGIN_TOKEN').then((value) => {
    if(value===null){
      navigation.navigate('Root',{screen:'Login'});
    }else{
      fetch('https://get-trucking.com:9000/driver/location', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization':value
        },
        body: JSON.stringify({
          latitude: location.latitude,
          longitude: location.longitude,
          NToken:fcm
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
              console.log("asdsa");
                if(responseData.success === 1) {
                   console.log(responseData)
                }else{
                  console.log(responseData)
                }
            })
        .catch((error) =>{
            console.log(error)
        })
    }
  })
}



  return (
    <View style={styles.container}>

{/* 
<Image source={day ? require('../assets/day.jpg') : require('../assets/night.jpg')} style={styles.background} /> */}

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
              <Text style={styles.modalText}>Collection of Personal Data</Text>
              <Text>We collect personal data from clients, customers, business contacts, partners, job applicants, contractors and other individuals. Such personal data may be provided to us in forms filled out by individuals, face to face meetings, email messages, telephone conversations, through our websites or provided by third parties. If you contact us, we may keep a record of that contact. We collect these personal data when it is necessary for business purposes or to meet the purposes for which you have submitted the information.</Text>
              <Text style={styles.modalText}>Location data:</Text>
              <Text>GET TRUCKING powered by PLG collects location data when the GET TRUCKING powered by PLG App is running in the foreground (app is open and on-screen) or background (app is not in use) of their mobile device. GET TRUCKING powered by PLG collects location data only when the Driver have enabled the icon “On-Duty” on the GET TRUCKING powered by PLG App.</Text>
          
            </View>
            <View style={[styles.statusButtonContainer1]}>
            <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{setModalVisible(!modalVisible);}}>
                <View style={[styles.buttonStyle,{marginTop:50,padding:10,backgroundColor:"red"}]}>
                  <Text style={{color:"white"}}>Cancel</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{allowLocation()}}>
                <View style={[styles.buttonStyle,{marginTop:50,padding:10}]}>
                  <Text style={{color:"white"}}>Allow Location</Text>
                </View>
              </TouchableHighlight>
            </View>
        </View>
      </Modal>

      <View style={styles.headerBar}>
        <View style={styles.headerIcon}>
          <AntDesign name="menu-fold" size={24} color="black" onPress={() =>{navigation.openDrawer()}}/>
        </View>
        <View style={styles.headerName}>
            <Text style={{fontSize:16,fontWeight:"bold",color:"black"}}>Get Trucking</Text>
        </View>
        <View style={styles.headerNotification}>
          <AntDesign name="bells" size={24} color="black" onPress={() =>{navigation.navigate('Root',{screen: 'Notification'})}}  />
        </View>
      </View>

      <View>
        <View style={styles.statusButtonContainer}>
          <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{setClicked(!clicked)}}>
            <View style={[styles.buttonStyle,{backgroundColor:clicked ? "#c24444":"#5fc244"}]}>
              <Text style={{color:"white"}}>{clicked ? "Offline":"Online"}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.targetContainer}>
        <View style={styles.targetTitle}>
          <Text style={{fontSize:16,fontWeight:"bold",textAlign:"center"}}>
            Keep going you are getting closer to your daily target
          </Text>
        </View>
        <View style={styles.targetCircleContainer}>
            <View style={styles.targetCircle}>
                <Text style={{fontSize:17,fontWeight:"bold",textAlign:"center"}}>Accepted</Text>
                <Text style={{fontWeight:"bold",textAlign:"center"}}>{ongoing}</Text>
            </View>
            
            <View style={styles.targetCircle}>
                <Text style={{fontSize:17,fontWeight:"bold",textAlign:"center"}}>Completed</Text>
                <Text style={{fontWeight:"bold",textAlign:"center"}}>{completed}</Text>
            </View>
          

        </View>
        
      </View>
      { /* <View style={styles.futureContainer}>
        <View>
          <Text style={{fontSize:17,fontWeight:"bold"}}>For the future</Text>
        </View>
        <View style={{padding:20,paddingLeft:0}}>
          <Text style={{fontWeight:"bold"}}>
            Tip.. You can edit your goals at anytime in this place
          </Text>
        </View>
      </View>*/ }
    </View>
  )
}

export default Home;

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
    width:"75%",
    justifyContent:"center",
    alignItems:"center"
  },
  homePageContainer:{
    flex:1
  },
  imageitem:{
    flexDirection:"row",
    paddingTop:60,
    padding:10
  },
  image:{
    padding:0
  },
  textContainer:{
    padding:5,
    width:"45%",
    height:100,
    justifyContent:"center"
  },
  text:{
    fontSize:20,
    fontWeight:"bold",
  },
  locationContainer:{
    padding:30
  },
  boxContainer:{
    padding:30,
    elevation:1
  },
  asapContainer:{
    flexDirection:"row",
    padding:15,
    borderBottomWidth:1,
    borderBottomColor:"#ebebeb"
  },
  routerContainer:{
    flexDirection:"row",
    padding:15,
  },
  dropContainer:{
    flexDirection:"row",
    padding:15,
  },
  buttonContainer:{
    padding:15,
  },
  stopTextcontainer:{
    padding:13,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center"
  },
  statusButtonContainer:{
    padding:13,
    justifyContent:"center",
    flexDirection:'row',
    alignItems:"center"
  },
  statusButtonContainer1:{
    padding:13,
    justifyContent:"center",
    flexDirection:'row',
    alignItems:"center"
  },
  buttonStyle:{
    padding:10,
    paddingLeft:40,
    paddingRight:40,
    width:200,
    backgroundColor:"#000473",
    alignItems:"center",
    justifyContent:"center"
  },
  centeredView: {
    flex: 1,
    backgroundColor: "white"
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    padding: 20,
    
  },
  Inputcontainer: {
    padding:8,
    margin:5,
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'#fff',
    borderBottomWidth:0.5,
    borderBottomColor:"#e8e8e8",
    borderRadius:10,
 },
 checkbox: {
  alignSelf: "center",
},
  iconContainer:{
    justifyContent:"center"
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
targetContainer:{
  padding:20,
  justifyContent:"center",
  alignItems:"center"
},
targetCircleContainer:{
  padding:20,
  justifyContent:"space-around",
  alignItems:"center",
  flexDirection:'row',
},
targetCircle:{
  padding:20,
  margin:20,
  borderWidth:1,
  borderColor:'#000473',
  height:120,
  width:120,
  backgroundColor:"white",
  borderRadius:60,
  borderBottomEndRadius:8
  },
  futureContainer:{
    padding:20
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    width:"100%",
    resizeMode:"stretch"
  },
  modalText:{
    fontSize:16,fontWeight:"bold",marginTop:10
  }
})