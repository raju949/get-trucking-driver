import React, {useState,useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  TouchableHighlight,
  FlatList,
  RefreshControl
} from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import { Ionicons,FontAwesome5 } from '@expo/vector-icons'
import Constant from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/core";
export default function Orders({navigation})  {

  const [completed,setCompleted] = useState([]);
  const [running,setRunning] = useState([]);
  const [canceled,setCanceled] = useState([]);
  const [refreshing,setRefreshing] = useState(false);
  const [message,setMessage] = useState();
  
  function serverResponse(){
    setRefreshing(true);
    AsyncStorage.getItem('LOGIN_TOKEN').then((value) => {
      if(value!==null){
        fetch('https://get-trucking.com:9000/driver/order', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization':value
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                    if(responseData.success === 1) {
                      setRefreshing(false);
                      console.log(responseData);
                      console.log("data");
                      setCompleted(responseData.data.filter(item => item.status==='completed'));
                      setRunning(responseData.data.filter(item => item.status==='assigned'));
                      setCanceled(responseData.data.filter(item => item.status==='Canceled'))
                    }else{
                        setMessage(responseData.data)
                        AsyncStorage.removeItem('LOGIN_TOKEN');
                        navigation.navigate('Root',{screen:"Login"})
                    }
                })
            .catch((error) =>{
                setMessage(error)
            })
      }
    })
  }

  useFocusEffect(
    useCallback(() => {
        serverResponse();



    }, [])
  );

  const onRefresh = useCallback(() => {
    serverResponse()
  }, []);


  const ThirdRoute = () => (
    <View style={{ flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#f7f7f7'}}>
        <Image source={require("../assets/record.png")} style={{height:100,width:80,resizeMode:"stretch"}} />
        <View style={{padding:20}}>
          <Text>No transactions record found</Text>
        </View>
    </View>
  );
  
  const renderScene = SceneMap({
    first: ()=>{
      return(
        <View style={{ flex: 1}} >
          {running.length>0  &&<FlatList
              data={running}
              renderItem={({ item }) => <View style={{padding:20}}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              
              >
                <View style={{backgroundColor:"#fafafa",borderRadius:10,elevation:5}}>
                <View style={{padding:10}}>
                  <Text style={{fontSize:20,fontWeight:"bold"}}>{item.vehicle_name}</Text>
                </View>
                <View style={{paddingLeft:10}}>
                  <Text>{item.description}</Text>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-around",padding:10}}>
                  <View style={{justifyContent:"center",padding:5}}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>Amount : ${item.amount}</Text>
                  </View>
                  <View style={{flexDirection:"row",backgroundColor:"rgba(0, 4, 115,0.03)",borderColor:"#000473",borderWidth:0.2,padding:5,borderRadius:20}}>
                    <View style={{justifyContent:"center",padding:5}}>
                      <FontAwesome5 name="route" size={18} color="#000473" />
                    </View>
                    <TouchableHighlight underlayColor='rgba(73,182,77,1,0)' onPress={()=>{navigation.navigate('Root',{screen:"ArriveToGo",params:item})}}>
                      <View style={{justifyContent:"center",padding:5}}>
                        <Text style={{fontWeight:"bold",color:"#000473"}}>Go To Order</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
                </View>
              </View>}
              keyExtractor={item => item.order_id.toString()}
            />}
            {running.length <=0 && <View style={{ flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#f7f7f7'}}>
              <Image source={require("../assets/record.png")} style={{height:100,width:80,resizeMode:"stretch"}} />
              <View style={{padding:20}}>
                <Text>No transactions record found</Text>
              </View>
          </View>}
      </View>
      )
    },
    second: ()=>{
      return(
        <View style={{ flex: 1}} >
         {completed.length> 0 && <FlatList
              data={completed}
              renderItem={({ item }) => <View style={{padding:20}}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              >
                <View style={{backgroundColor:"#fafafa",borderRadius:10,elevation:5}}>
                <View style={{padding:10}}>
                  <Text style={{fontSize:20,fontWeight:"bold"}}>{item.vehicle_name}</Text>
                </View>
                <View style={{paddingLeft:10}}>
                  <Text>{item.description}</Text>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-around",padding:10}}>
                  <View style={{justifyContent:"center",padding:5}}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>Amount : ${item.amount}</Text>
                  </View>

                  
                  
                </View>
                </View>
              </View>}
              keyExtractor={item => item.order_id.toString()}
            />}
            {completed.length <=0 && <View style={{ flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#f7f7f7'}}>
              <Image source={require("../assets/record.png")} style={{height:100,width:80,resizeMode:"stretch"}} />
              <View style={{padding:20}}>
                <Text>No transactions record found</Text>
              </View>
          </View>}
      </View>
      )
    },
    third: ThirdRoute,
  });

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Ongoing' },
        { key: 'second', title: 'Completed'},
        { key: 'third', title: 'Canceled' }
    ]);


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
      
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
          }, [])
        );

    return (
        <View style={{marginTop:Constant.statusBarHeight,backgroundColor:"white",flex:1}}>
            <View style={styles.headerBar}>
                <View style={styles.headerIcon}>
                <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={()=>navigation.navigate("Home")} />
                </View>
                <View style={styles.headerName}>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>Orders</Text>
                </View>
            </View>
            <View style={styles.walletContainer}>
            <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    renderTabBar={props => <TabBar {...props} indicatorStyle={{ backgroundColor: 'blue' }} style={{ backgroundColor: 'white'}} renderLabel={({ route, focused, color }) => (
                        <Text style={{ color:focused ? "blue":"black", margin: 8,fontWeight:"bold" }}>
                          {route.title}
                        </Text>
                      )} />}
                    onIndexChange={setIndex}
                    initialLayout={{ width: "100%"}}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  detailbox:{
    backgroundColor:"#000473",
    padding:20,
    borderRadius:10
  },
  walletContainer:{
    flex:1
  },
  headerBar: {
    flexDirection:"row",
    justifyContent:"space-around",
    padding:5,
    paddingTop:15
  },
  headerName:{
    width:"80%",
    justifyContent:"center"
  }
});
