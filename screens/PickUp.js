import React,{ useState,useCallback } from 'react';
import {View, Text,StyleSheet,TouchableHighlight,FlatList,BackHandler,RefreshControl,Alert} from 'react-native';
import {Ionicons,FontAwesome5,MaterialIcons} from '@expo/vector-icons';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useFocusEffect } from "@react-navigation/core";

function PickUp({navigation}) {

    const [orderStatus,setOrderStatus] = useState(false);
    const [orders,setOrders] = useState([]);
    const [refresh,setRefresh] = useState(false);
    
    

    function handleBackButtonClick() {
        navigation.navigate('Home')
        return true;
      }
  
      useFocusEffect(
          useCallback(() => {
            (async () => {
              let { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert(
                  'Allow Location',
                  'Permission to access location was denied', [{
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'
                  }, {
                      text: 'Allow',
                      onPress: () => getLocation()
                  }, ], {
                      cancelable: false
                  }
               )
              }else{
                  await Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 60000, distanceInterval: 1 }, (loc) => setLocation(loc.coords));
              }
            })();

            const onBackPress = () => {
              return handleBackButtonClick()
            };
      
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
      
            return () =>
              BackHandler.removeEventListener('hardwareBackPress', onBackPress);
          }, [])
        );

        function getLocation(){
          (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert(
                'Allow Location',
                'Permission to access location was denied', [{
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }, {
                    text: 'OK',
                    onPress: () => getLocation()
                }, ], {
                    cancelable: false
                }
             )
            }else{
              let location = await Location.getCurrentPositionAsync({});
              setLocation(location.coords);
            }
          })();
        }
  
  function setLocation(location){
    console.log(location);
    var driver_id = "";
    AsyncStorage.getItem('DRIVER_ID').then((value) => {
      driver_id = value;
    })

    AsyncStorage.getItem('LOGIN_TOKEN').then((value) => {
      if(value===null){
        navigation.navigate('Root',{screen:'Login'});
      }else{
        fetch('https://get-trucking.com:9000/driver/getOrder', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'authorization':value
          },
          body: JSON.stringify({
            latitude: location.latitude,
            longitude: location.longitude
          })
      })
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
                  if(responseData.success === 1) {
                    setRefresh(false);
                    if(responseData.data.length > 0){
                     setOrderStatus(true);
                     var fineArray = [];
                     

                     for(var i = 0; i < responseData.data.length; i++) {
                       let reject_array = responseData.data[i].rejected_ids.split(',');
                       if(reject_array.includes(driver_id)){
                          continue;
                       }
                       fineArray.push(responseData.data[i]);
                     }
                     setOrders(fineArray);
                    }else{
                      setOrderStatus(false);
                    }
                  }else{
                    //console.log(responseData);
                    setOrderStatus(false);
                  }
              })
          .catch((error) =>{
              console.log(error)
          })
      }
    })
  }


  

   

  
   



  const  Renderdata = (item) =>{
  var  locations = JSON.parse(item.locations);
  let pickup = locations.filter(i => i.type === 'PickUp');
  let drop  = locations.filter(i => i.type === 'Drop');
  let stop  = locations.filter(i => i.type === 'Stop');
  //var services = item.additionalServices;

  //console.log("stop ===>");
  //console.log(stop);
  //if(services == null){
 //   services = [];
 // }
  //setServicesList(services);
  
  


  function  _renderStopView (stop) {

        if (stop.length > 0) {
            return (
                <View>


                

                <View style={styles.locationContainer}>
                  <View style={styles.iconContainer}>
                     <FontAwesome5 name="dot-circle" size={24} color="#828282" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>
                          Stop Floor : {stop.length > 0  ? stop[0].floor : '' }
                      </Text>
                      
                      <Text>
                          Stop Address 1 : {stop.length > 0  ? stop[0].formatted_address : '' }
                      </Text>
                  </View>
              </View>

              
              {stop.length > 1 && stop[1].floor != ''  ? <View style={styles.locationContainer}>
                  <View style={styles.iconContainer}>
                      <FontAwesome5 name="dot-circle" size={24} color="#828282" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>
                          Stop Floor : {stop.length > 1  ? stop[1].floor : '' }
                      </Text>
                      
                      <Text>
                          Stop Address : {stop.length > 1  ? stop[1].formatted_address : '' }
                      </Text>
                  </View>
              </View> : <View></View> }
              
           
              {stop.length > 2 && stop[2].floor != ''  ? <View style={styles.locationContainer}>
                  <View style={styles.iconContainer}>
                      <FontAwesome5 name="dot-circle" size={24} color="#828282" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>
                          Stop Floor : {stop.length > 2  ? stop[2].floor : '' }
                      </Text>
                      
                      <Text>
                          Stop Address : {stop.length > 2  ? stop[2].formatted_address : '' }
                      </Text>
                  </View>
              </View> : <View></View> }


              {stop.length > 3 && stop[3].floor != ''  ? <View style={styles.locationContainer}>
                  <View style={styles.iconContainer}>
                      <FontAwesome5 name="dot-circle" size={24} color="#828282" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>
                          Stop Floor : {stop.length > 3  ? stop[3].floor : '' }
                      </Text>
                      
                      <Text>
                          Stop Address : {stop.length > 3  ? stop[3].formatted_address : '' }
                      </Text>
                  </View>
              </View> : <View></View> }



               {stop.length > 4 && stop[4].floor != ''  ? <View style={styles.locationContainer}>
                  <View style={styles.iconContainer}>
                      <FontAwesome5 name="dot-circle" size={24} color="#828282" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>
                          Stop Floor : {stop.length > 4  ? stop[4].floor : '' }
                      </Text>
                      
                      <Text>
                          Stop Address : {stop.length > 4  ? stop[4].formatted_address : '' }
                      </Text>
                  </View>
              </View> : <View></View> }



               {stop.length > 5 && stop[5].floor != ''  ? <View style={styles.locationContainer}>
                  <View style={styles.iconContainer}>
                      <FontAwesome5 name="dot-circle" size={24} color="#828282" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>
                          Stop Floor : {stop.length > 5  ? stop[5].floor : '' }
                      </Text>
                      
                      <Text>
                          Stop Address : {stop.length > 5  ? stop[5].formatted_address : '' }
                      </Text>
                  </View>
              </View> : <View></View> }



              {stop.length > 6 && stop[6].floor != ''  ? <View style={styles.locationContainer}>
                  <View style={styles.iconContainer}>
                      <FontAwesome5 name="dot-circle" size={24} color="#828282" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>
                          Stop Floor : {stop.length > 6  ? stop[6].floor : '' }
                      </Text>
                      
                      <Text>
                          Stop Address : {stop.length > 6  ? stop[6].formatted_address : '' }
                      </Text>
                  </View>
              </View> : <View></View> }



              {stop.length > 7 && stop[7].floor != ''  ? <View style={styles.locationContainer}>
                  <View style={styles.iconContainer}>
                      <FontAwesome5 name="dot-circle" size={24} color="#828282" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>
                          Stop Floor : {stop.length > 7  ? stop[7].floor : '' }
                      </Text>
                      
                      <Text>
                          Stop Address : {stop.length > 7  ? stop[7].formatted_address : '' }
                      </Text>
                  </View>
              </View> : <View></View> }



              {stop.length > 8 && stop[8].floor != ''  ? <View style={styles.locationContainer}>
                  <View style={styles.iconContainer}>
                      <FontAwesome5 name="dot-circle" size={24} color="#828282" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>
                          Stop Floor : {stop.length > 8  ? stop[8].floor : '' }
                      </Text>
                      
                      <Text>
                          Stop Address : {stop.length > 8  ? stop[8].formatted_address : '' }
                      </Text>
                  </View>
              </View> : <View></View> }



              {stop.length > 9 && stop[9].floor != ''  ? <View style={styles.locationContainer}>
                  <View style={styles.iconContainer}>
                      <FontAwesome5 name="dot-circle" size={24} color="#828282" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>
                          Stop Floor : {stop.length > 9  ? stop[9].floor : '' }
                      </Text>
                      
                      <Text>
                          Stop Address : {stop.length > 9  ? stop[9].formatted_address : '' }
                      </Text>
                  </View>
              </View> : <View></View> }




              {stop.length > 10 && stop[10].floor != ''  ? <View style={styles.locationContainer}>
                  <View style={styles.iconContainer}>
                      <FontAwesome5 name="dot-circle" size={24} color="#828282" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>
                          Stop Floor : {stop.length > 10  ? stop[10].floor : '' }
                      </Text>
                      
                      <Text>
                          Stop Address : {stop.length > 10  ? stop[10].formatted_address : '' }
                      </Text>
                  </View>
              </View> : <View></View> }
               

              </View>

            );
        } else {
            return null;
        }
    }


  return(
        <View style={styles.pageContainer}>
          <View style={[styles.pickupContainer,]}>

              <Text style={styles.textStyle}>
                      Order Id : {item.order_id }
              </Text>
              <Text style={styles.textStyle}>
                      Vehicle Type : {item.vehicleType ? item.vehicleType : 'box' }
              </Text>

              <Text style={styles.textStyle}>
                      Additinal Services : {item.additional_services_name ? item.additional_services_name : 'NONE' }
              </Text>

              <View style={styles.locationContainer}>

                  <View style={styles.iconContainer}>
                      <FontAwesome5 name="dot-circle" size={24} color="#828282" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>
                          Floor : {pickup[0].floor}
                      </Text>
                      
                      <Text>
                          Address : {pickup[0].formatted_address}
                      </Text>
                  </View>
              </View>
              <View style={styles.locationContainer}>
                  <View style={styles.iconContainer}>
                      <MaterialIcons name="location-pin" size={24} color="#828282" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>
                          Floor : {drop[0].floor}
                      </Text>
                      
                      <Text>
                          Address : {drop[0].formatted_address}
                      </Text>
                  </View>
              </View>

             {_renderStopView(stop)}

              



              <View style={{alignItems:"center"}}>

              {/*
                <View style={styles.amounts}>
                    <Text style={{fontSize:16,fontWeight:"bold",width:"80%"}}>
                        Payable by customer
                    </Text>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>
                        s${item.amount}
                    </Text>
                </View>
              

                <View style={styles.amounts}>

                    <Text style={{fontSize:16,fontWeight:"bold",width:"80%"}}>
                        Additional Service
                    </Text>
                    <View>
                      
                    </View>


                </View>
 */}

                  <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{grabOrders(item.order_id,item)}}>
                    <View style={styles.buttonContainer}>
                        <Text style={{color:"white"}}>Click to Grab Pick Up</Text>
                    </View>
                  </TouchableHighlight> 
              </View>   
          </View>
        </View>

      )
  }
  
  function grabOrders(order_id,item){
    AsyncStorage.getItem('LOGIN_TOKEN').then((value) => {
      if(value===null){
        navigation.navigate('Root',{screen:'Login'});
      }else{
        fetch('https://get-trucking.com:9000/driver/grabOrder', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'authorization':value
          },
          body: JSON.stringify({
            order_id:order_id
          })
      })
          .then((response) => response.json())
          .then((responseData) => {
                  if(responseData.success === 1) {
                    navigation.navigate('Root',{screen:"ArriveToGo",params:item})
                  }else{
                    console.log(responseData)
                  }
              })
          .catch((error) =>{
              console.log(error)
          })
      }})
  }



    return (
        <View style={{alignItems:"center",flex:1}}>
            <View style={styles.headerBar}>
                <View style={styles.headerIcon}>
                    <Ionicons name="arrow-back-sharp" size={24} color="white" onPress={()=>navigation.navigate("Home")} />
                </View>
                <View style={styles.headerName}>
                    <Text style={{fontSize:16,fontWeight:"bold",color:"white"}}>Pick Up</Text>
                </View>
            </View>
          
            <FlatList
                      data={orders}
                      renderItem={({item})=>Renderdata(item)
                      }
                      keyExtractor={(item) => item.order_id.toString()}
                      refreshControl={
                        <RefreshControl refreshing={refresh} onRefresh={()=>{getLocation()}} />
                      }
                    />
              {!orderStatus && <View style={{justifyContent: 'center',height: '80%'}}>
                  <View>
                    <Text>No recent order</Text>
                  </View>
                </View>}
            </View>
    )
}

export default PickUp;

const styles = StyleSheet.create({
    pageContainer:{
        padding:20,
        paddingLeft:0,
        marginRight:10,
        flex:1,
        marginTop:-20,
    },
    headerBar: {
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around",
        padding:15,
        paddingTop:Constants.statusBarHeight+15,
        backgroundColor:"#000473"
      },
      headerBox:{
          height:70,
          width:"100%",
          backgroundColor:"#000473",
          flexDirection:"row",
          justifyContent:"space-around",
          alignItems:"flex-end",
          padding:20
      },
      headerName:{
        width:"80%",
        justifyContent:"center",
        paddingLeft:20
      },
      pickupContainer:{
        margin:20,
        padding:20,
        paddingBottom:10,
        borderWidth:1,
        borderColor:"#828282",
        borderRadius:10
      },
      locationContainer:{
        flexDirection:"row",
        padding:10,
        paddingLeft:0,
      },
      iconContainer:{
        padding:10,
        paddingLeft:0,
        justifyContent:"center"
      },
      textContainer:{
        padding:10,
        justifyContent:"center"
      },
      textStyle:{
        fontSize:16,
        fontWeight:"bold"
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
      amounts:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10,
        marginBottom:10
      }
})