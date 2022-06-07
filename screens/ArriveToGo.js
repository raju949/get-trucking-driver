import React,{ useState,useCallback } from 'react';
import {View,Platform, Text,StyleSheet,TouchableHighlight,BackHandler, ScrollView,Modal,Alert,Linking,Image} from 'react-native';
import {Ionicons,FontAwesome5,MaterialIcons,Entypo,AntDesign} from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from "@react-navigation/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import StopButton from '../components/StopButton';
import * as Location from 'expo-location';
import DialogInput from 'react-native-dialog-input';



function PickUp({navigation,route}) {

    const [driverState,setDriverState] = useState(2);
    const [modalVisible, setModalVisible] = useState(false);
    const [unloading, setUnloading] = useState(true);
    const [feemodal, setFeeModal] = useState(true);
    const [userlocation,setUserLocation] = useState();
    const [pickup,setPickup] = useState({floor:'none',formatted_address:"none",latitude:0,longitude:0});
    const [drop,setDrop] = useState({floor:'none',formatted_address:"none",latitude:0,longitude:0});
    const [images,setImages] = useState();
    const [stops,setStops] = useState([])
    const [orderId,setOrderId] = useState()
    const [phone,setPhone] = useState();
    const [amount,setAmount] = useState();
    const [note,setNote]  = useState();
    const [dialogVisible,setDialogVisible] = useState(false);


    function handleBackButtonClick() {
        navigation.navigate('Records')
          return true;
        }
    
        useFocusEffect(
            useCallback(() => {
                console.log(route.params);
                setFeeModal(true);
                setPhone(route.params.phone);
                setAmount(route.params.amount);
                setOrderId(route.params.order_id);
                setNote(route.params.notes_to_driver);
                var locations = JSON.parse(route.params.locations);
                let pickup = locations.filter(i => i.type === 'PickUp');
                setPickup(pickup[0]);
                let drop = locations.filter(i => i.type === 'Drop');
                setDrop(drop[0]);
                let stop = locations.filter(i => i.type === 'Stop');
                setStops(stop);

                setDriverState(2);

                setLocation();
              const onBackPress = () => {
                return handleBackButtonClick()
              };
        
              BackHandler.addEventListener('hardwareBackPress', onBackPress);
        
              return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            }, [route.params])
          );

          async function setLocation(){
            await Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 60000, distanceInterval: 1 }, (loc) => {setUserLocation(loc.coords);console.log(loc)});
          }

        function completeOrder(){
              console.log("Order_id : ",orderId);
              AsyncStorage.getItem('LOGIN_TOKEN').then((value) => {
                if(value===null){
                  navigation.navigate('Root',{screen:'Login'});
                }else{
                    fetch('https://get-trucking.com:9000/driver/completeOrder', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'authorization':value
                            },
                            body: JSON.stringify({
                                order_id:orderId
                            })
                        })
                            .then((response) => response.json())
                            .then((responseData) => {
                                    if(responseData.success === 1) {
                                        console.log("Order Completed");
                                        navigation.navigate('Records');
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


        function onCLickSubmitCancel(inputText){
          if(inputText != ""){
              cancelOrder(inputText);
              setDialogVisible(false);
          }else{
            Alert.alert("Please enter reasson");
          }


          console.log("sendInput (DialogInput#1): "+inputText);
        }

        function cancelOrderConfirmation() {
            setDialogVisible(true)
          }

        function cancelOrder(reason){
            console.log("Order_id : ",orderId);
            AsyncStorage.getItem('LOGIN_TOKEN').then((value) => {
                console.log(value);
              if(value===null){
                navigation.navigate('Root',{screen:'Login'});
              }else{
                  fetch('https://get-trucking.com:9000/driver/cancelOrderDriver', {
                          method: 'POST',
                          headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                              'authorization':value
                          },
                          body: JSON.stringify({
                              order_id:orderId,
                              reason:reason,
                          })
                      })
                          .then((response) => response.json())
                          .then((responseData) => {
                                  if(responseData.success === 1) {
                                      console.log("Order Canceled");
                                      navigation.navigate('Pickup');
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

    
    const callNumber = phone => {
        console.log('callNumber ----> ', phone);
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
          phoneNumber = `telprompt:${phone}`;
        }
        else  {
          phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
        .then(supported => {
          if (!supported) {
            Alert.alert('Phone number is not available');
          } else {
            return Linking.openURL(phoneNumber);
          }
        })
        .catch(err => console.log(err));
      };


     const openGps = (latitude, longitude) => {
        
          if (Platform.OS === "android" || "web") {
            Linking.openURL(
                `https://www.google.com/maps/dir/?api=1&origin=` +
                userlocation.latitude +
                `,` +
                userlocation.longitude +
                `&destination=` +
                latitude +
                `,` +
                longitude +
                `&travelmode=driving`
            );
            } else {
                console.log("Something Went Wrong?")
            }
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

      async function uploadImages(){
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
                            setImages(responseData.data.image);
                        }else{
                            console.log(responseData)
                        }
                    })
                .catch((error) =>{
                    console.log(error)
        })
    }



    return (
        <View style={{marginTop:Constants.statusBarHeight,alignItems:"center",flex:1,flexDirection:"column"}}>
            
            

            <View style={styles.headerBar}>
                <View style={styles.headerIcon}>
                    <Ionicons name="arrow-back-sharp" size={24} color="white" onPress={()=>navigation.navigate("Records")} />
                </View>
                <View style={styles.headerName}>
                    <Text style={{fontSize:16,fontWeight:"bold",color:"white"}}>Arrive to Go</Text>
                </View>
                <View style={styles.headerIconcancle}>
                    <Entypo name="circle-with-cross" size={24} color="white" onPress={()=>{cancelOrderConfirmation()}} /> 
                </View>
                {driverState > 1 && <View style={[styles.headerIcon,{justifyContent:"center"}]}>
                    <Entypo name="phone" size={24} color="white" onPress={()=>{callNumber(phone)}} />
                </View>}
                <View style={[styles.headerIcon,{justifyContent:"center"}]}>
                    <Entypo name="chat" size={24} color="white" onPress={()=>{navigation.navigate('Root',{screen:'DriverChat',params:{orderId:orderId}})}} />
                </View>
            </View>
            <View style={styles.headerBox}>
                <View>
                    <Text style={{fontSize:14,fontWeight:"bold",color:"white"}}>Immediate Order : {route.params.duration}</Text>
                </View>
                <View>
                    <Text style={{fontSize:14,fontWeight:"bold",color:"white"}}><FontAwesome5 name="map-marker-alt" size={14} color="white" />  Over : {route.params.distance}</Text>
                </View>
            </View>
            <View style={styles.pageContainer}>

                <DialogInput isDialogVisible={dialogVisible}
                    title={"Are you sure"}
                    message={"If you want cancel this order please click on confirm"}
                    hintInput ={"Please enter reason to cancel"}
                    submitInput={ (inputText) => {onCLickSubmitCancel(inputText)} }
                    closeDialog={ () => {setDialogVisible(false)}}>
                </DialogInput>

                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>


                <View style={styles.amountContainerContact}>
                    <View style={styles.textContainer}>
                        <Text style={{fontSize:16,fontWeight:"bold",width:"100%"}}>
                            Order Contact : {phone}
                        </Text>
                    </View>

                    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.)' style={styles.iconContainerContact}>
                        <Ionicons name="call" size={24} color="green" onPress={()=>{callNumber(phone)}} />
                    </TouchableHighlight>    

                </View>
                
                <View style={[styles.pickupContainer,]}>
                    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{openGps(pickup.latitude,pickup.longitude,pickup.floor)}}>
                    <View style={styles.locationContainer}>
                        <View style={styles.iconContainer}>
                            <FontAwesome5 name="dot-circle" size={24} color="#828282" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textStyle}>
                                Floor : {pickup.floor}
                            </Text>
                            <Text style={styles.textStyle}>
                                Address : {pickup.formatted_address}
                            </Text>
                            <Text style={styles.textStyle}>
                                Name : {pickup.option_person}
                            </Text>
                        </View>

                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.)' style={styles.iconContainer}>
                                    <Ionicons name="call" size={24} color="green" onPress={()=>{callNumber(pickup.option_number)}} />
                        </TouchableHighlight>
                    </View>
                    </TouchableHighlight>


                    {stops.map((item)=>{
                        return(
                            <TouchableHighlight key={item.place_id} underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{openGps(item.latitude,item.longitude,item.floor)}}>
                            <View style={styles.locationContainer}>
                                <View style={styles.iconContainer}>
                                    <FontAwesome5 name="dot-circle" size={24} color="#828282" />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.textStyle}>
                                       Floor : {item.floor}
                                    </Text>
                                    <Text style={styles.textStyle}>
                                       Address : {item.formatted_address}
                                    </Text>
                                    <Text style={styles.textStyle}>
                                       Name : {item.option_person}
                                    </Text>
                                </View>
                                <TouchableHighlight underlayColor='rgba(73,182,77,1,0.)' style={styles.iconContainer}>
                                    <Ionicons name="call" size={24} color="green" onPress={()=>{callNumber(item.option_number)}} />
                                </TouchableHighlight>
                            </View>
                            </TouchableHighlight>
                        )
                    })}
                    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{openGps(drop.latitude,drop.longitude,drop.floor)}}>
                    <View style={styles.locationContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="location-pin" size={24} color="#828282" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textStyle}>
                                Floor : {drop.floor}
                            </Text>
                            <Text style={styles.textStyle}>
                                Address : {drop.formatted_address}
                            </Text>
                            <Text style={styles.textStyle}>
                                Name : {drop.option_person}
                            </Text>
                        </View>
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.)' style={styles.iconContainer}>
                            <Ionicons name="call" size={24} color="green" onPress={()=>{callNumber(drop.option_number)}} />
                        </TouchableHighlight>
                    </View>
                    </TouchableHighlight>  

                </View>
                
                <View style={styles.amountContainer}>
                    <View style={styles.amounts}>
                        <Text style={{fontSize:16,fontWeight:"bold",width:"60%"}}>
                            Type of vehicle needed
                        </Text>
                        <View style={{width:"40%",alignItems:"center"}}>
                            <Text style={{fontSize:16,fontWeight:"bold"}}>
                            {route.params.vehicle_name} 
                            </Text>
                        </View>
                        
                    </View>
                </View>

                {/*<View style={styles.amountContainer}>
                    <View style={styles.amounts}>
                        <Text style={{fontSize:16,fontWeight:"bold",width:"80%"}}>
                            Payable by Customer
                        </Text>
                        <Text style={{fontSize:16,fontWeight:"bold"}}>
                            ${amount}
                        </Text>
                    </View>
                    
                </View>*/}
                <View style={styles.amountContainer}>
                    <View style={styles.amounts}>
                        <Text style={{fontSize:16,fontWeight:"bold",width:"80%"}}>
                            Note To Driver
                        </Text>
                    </View>
                    <View>
                        <Text>{note}</Text>
                    </View>
                </View>
            </ScrollView>
            </View >
            {(driverState===1) && <View>
                <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{callNumber(phone);setDriverState(2)}}>
                    <View style={styles.buttonContainer}>
                        <Text style={{color:"white"}}>Call Customer</Text>
                    </View>
                </TouchableHighlight>
            </View>}

            {(driverState===2) && <View>
                <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{setDriverState(3)}}>
                    <View style={styles.buttonContainer}>
                        <Text style={{color:"white"}}>Arrive at the Pick Up</Text>
                    </View>
                </TouchableHighlight>
            </View>}

            {(driverState===3) && <View>
                <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.bottomView}>
                        <View style={styles.modalView}>
                            <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{uploadImages()}} >
                                <View style={styles.imageInputContainer}>
                                {images && <Image source={{uri:'https://get-trucking.com:9000/'+images}} style={{height:100,width:150,borderRadius:10}} />}
                                {!(images) && <View>
                                        <View style={{padding:10}}>
                                            <AntDesign name="plus" size={24} color="black" />
                                        </View>
                                        <Text style={styles.imageTitle}>
                                            Upload
                                        </Text>
                                    </View>}
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{setDriverState(4)}}>
                                <View style={styles.buttonContainer}>
                                    <Text style={{color:"white"}}>Confirm Submissions</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        </View>
                    </Modal>
                <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{setModalVisible(!modalVisible)}}>
                    <View style={styles.buttonContainer}>
                        <Text style={{color:"white"}}>Start Loading</Text>
                    </View>
                </TouchableHighlight>
            </View>}

            {(driverState===4) && <View>

                {stops &&stops.map((item,index)=>{
                    return (
                        <StopButton key={index.toString()} Title={"Stop "+(index+1)} />
                    )
                })}


                <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{setDriverState(5)}}>
                    <View style={styles.buttonContainer}>
                        <Text style={{color:"white"}}>Arrive at the drop</Text>
                    </View>
                </TouchableHighlight>
            </View>}

            {(driverState===5) && <View>
                <Modal
                        animationType="slide"
                        transparent={true}
                        visible={unloading}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setUnloading(!unloading);
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{alignItems:"center"}}>
                                <Text>
                                    Please conform your unloading
                                </Text>
                            </View>
                            <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{setUnloading(!unloading)}}>
                                <View style={styles.buttonContainer}>
                                    <Text style={{color:"white"}}>OK Done</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{setUnloading(!unloading)}}>
                                <View style={styles.buttonContainer}>
                                    <Text style={{color:"white"}}>Return</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        </View>
                    </Modal>
                <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{setDriverState(6)}}>
                    <View style={styles.buttonContainer}>
                        <Text style={{color:"white"}}>Unloading Complete</Text>
                    </View>
                </TouchableHighlight>
            </View>}

            {(driverState===6) && <View>
                <Modal
                        animationType="slide"
                        transparent={true}
                        visible={feemodal}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setFeeModal(!feemodal);
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{alignItems:"center"}}>
                                <Text>
                                    Confirm if amount settled
                                </Text>
                            </View>
                            <TouchableHighlight style={{marginTop:30}} underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{setFeeModal(!feemodal);completeOrder()}}>
                                <View style={styles.buttonContainer}>
                                    <Text style={{color:"white"}}>YES AMOUNT SETTLED</Text>
                                </View>
                            </TouchableHighlight>
                            {/* <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{setFeeModal(!feemodal)}}>
                                <View style={styles.buttonContainer}>
                                    <Text style={{color:"white"}}>RETURN</Text>
                                </View>
                            </TouchableHighlight> */}
                        </View>
                        </View>
                    </Modal>
                {/* <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{setDriverState(7)}}>
                    <View style={styles.buttonContainer}>
                        <Text style={{color:"white"}}>Give user review</Text>
                    </View>
                </TouchableHighlight> */}
            </View>}

        </View>
    )
}

export default PickUp;

const styles = StyleSheet.create({
    pageContainer:{
        padding:10,
        flex:1
    },
    headerBar: {
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around",
        padding:5,
        paddingTop:15,
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
        width:"50%",
        justifyContent:"center",
        paddingLeft:20
      },
      pickupContainer:{
        margin:10,
        padding:10,
        paddingRight:20,
        borderWidth:1,
        borderColor:"#828282",
        borderRadius:10
      },
      locationContainer:{
        flexDirection:"row",
        padding:10,
      },
      iconContainer:{
        padding:10,
        justifyContent:"center"
      },

      iconContainerContact:{
        padding:10,
        alignItems: 'flex-end'

      },

      textContainer:{
        padding:10,
        justifyContent:"center",
        width:"75%"
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
      amountContainer:{
        margin:5,
        marginLeft:20,
        marginRight:20,
        padding:10,
        borderColor:"#828282",
        elevation:1,
      },
      amountContainerContact:{
        margin:5,
        marginLeft:20,
        marginRight:20,
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:10,
        borderColor:"#828282",
        elevation:1,
        flexDirection:"row",
      },
      amounts:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10,
      },
      bottomView: {
        flex: 1,
        justifyContent: "flex-end",
        marginTop: 22
      },
      modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      },
      headerIconcancle:{
          backgroundColor:'#ff0000',
          width:"20%",
          borderRadius:10,
          padding:5,
          flexDirection: "row",
          justifyContent:"space-around",
      }
})