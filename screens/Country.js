import React,{useState,useEffect,useCallback} from "react"
import {FlatList, StyleSheet,Text,View,TouchableOpacity,Alert,BackHandler} from "react-native"
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/core";
function Country({navigation}) {


    useFocusEffect(
        useCallback(() => {
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
    



    const [countries,setCountries] = useState([]);
    useEffect(() => {
    fetch('https://get-trucking.com:9000/users/countries')
      .then((response) => response.json())
      .then((json) => {setCountries(json.data)})
      .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('LOGIN_TOKEN').then((value) => {
            if(value!==null){
                navigation.navigate('Home')
            }
        })
    },[])

    const [country,setCountry] = useState('')

      const renderItem = ({ item }) => {
        return (
            <TouchableOpacity key={item.key} onPress={()=>{navigation.navigate('Root',{screen:"Login"})}}>
                <View style={styles.ItemContainer}>
                    <View style={{width:40}}>
                        <Text>+{item.phonecode}</Text>
                    </View>
                    <View style={{width:"77%"}}>
                        <Text style={{fontWeight:"bold"}}>{item.name}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </View>
                
            </TouchableOpacity>
          );
    }
    return (
        <View style={styles.Container}> 
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                               
                                    <View style={styles.CountryContainer}>
                                        <View style={{padding:20}}>
                                            <Text style={{fontSize:20,fontWeight:"bold"}}>Select Country</Text>
                                        </View>
                                        <FlatList
                                        data={countries}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.id.toString()}
                                        />
                                    </View>
                                </View>
                            </View>
            
        </View>
    )
}

export default Country;

const styles = StyleSheet.create({
    Container: {
        flex:1,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
    },
    ImageContainer: {
        flex:2,
        padding:10,
        paddingTop:30,
        paddingBottom:5,
        justifyContent:"center",
        alignItems:"center",
    },
    CountryContainer: {
        flex:5,
        justifyContent:"center",
        alignItems:"center",
        padding:30,
        paddingTop:10,
        width:"100%"
    },
    ItemContainer: {
        padding:10,
        paddingTop:10,
        borderBottomWidth:1,
        borderBottomColor:"#f7f7f7",
        flexDirection:"row",
        justifyContent:"space-around"
    },
    centeredView: {
        height:"80%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        backgroundColor: "white",
        borderRadius: 20,
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

})
