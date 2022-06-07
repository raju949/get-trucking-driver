import React,{useState,useRef,useEffect} from 'react';
import {View,Text,StyleSheet,TouchableHighlight,Modal,Image}  from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

function StopButton({Title}) {
    const [display,setDisplay] = useState(true);
    const [modalView,setModalView] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);
  
    const [camera, setCamera] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const confrim = () => {
      setModalView(false);
      setDisplay(false);
    }

    const permisionFunction = async () => {
      // here is how you can get the camera permission
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
  
      console.log("Camera permission",cameraPermission);
      setCameraPermission(cameraPermission.status === 'granted');
  
      const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
      console.log(imagePermission.status);
  
      setGalleryPermission(imagePermission.status === 'granted');
  
      if (
        imagePermission.status !== 'granted' &&
        cameraPermission.status !== 'granted'
      ) {
        alert('Permission for media access needed.');
      }
    };
  
    useEffect(() => {
      permisionFunction();
    }, []);

    const takePicture = async () => {
      if (camera) {
        const data = await camera.takePictureAsync(null);
        console.log(data.uri);
        setImageUri(data.uri);
      }
    };
    const ref = useRef();
  return (
      <>
      <Modal
            animationType="slide"
            transparent={true}
            visible={modalView}
        >
            <View style={styles.bottomView}>
            <View style={styles.modalView}>
                <View style={{ flex:1,borderWidth:1,width:'100%'}}> 
                <Camera
                    ref={(ref) => setCamera(ref)}
                    style={styles.fixedRatio}
                    type={type}
                  />
                  <Image
                      style={{width: 100, height: 100,position: 'absolute',borderWidth:2,bottom:10,left:"30%"}}
                      source={{uri: imageUri}}
                    />
                </View>
                <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={takePicture}>
                    <View style={styles.buttonContainer}>
                        <Text style={{color:"white"}}>Capture</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={confrim}>
                    <View style={styles.buttonContainer}>
                        <Text style={{color:"white"}}>Confirm</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{setModalView(false)}}>
                    <View style={styles.cancelContainer}>
                        <Text style={{color:"white"}}>Cancel</Text>
                    </View>
                </TouchableHighlight>
            </View>
            </View>
          </Modal>
        {display ? <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{setModalView(true)}}>
            <View style={styles.buttonContainer}>
                <Text style={{color:"white"}}>Arrive at {Title}</Text>
            </View>
        </TouchableHighlight> : null}
        </>
  );
}

export default StopButton;

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
      cancelContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "rgba(200, 0, 0, 0.8)",
      },
      amountContainer:{
        margin:5,
        marginLeft:20,
        marginRight:20,
        padding:10,
        borderColor:"#828282",
        elevation:1
      },
      amounts:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10,
      },
      bottomView: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        marginTop: 22
      },
      modalView: {
        flex: 1,
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
      },
      
      titleStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
      },
      buttonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#eeeeee',
        margin: 10,
      },
      fixedRatio: {
        flex: 1,
        aspectRatio: 1,
        maxWidth:'100%'
      },
})