import React, {useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler
} from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons'
import Constant from 'expo-constants';

const FirstRoute = () => (
    <View style={{ flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#f7f7f7'}} >
        <Image source={require("../assets/record.png")} style={{height:100,width:80,resizeMode:"stretch"}} />
        <View style={{padding:20}}>
          <Text>No orders record found</Text>
        </View>
    </View>
  );
  
  const SecondRoute = () => (
    <View style={{ flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#f7f7f7'}}>
        <Image source={require("../assets/record.png")} style={{height:100,width:80,resizeMode:"stretch"}} />
        <View style={{padding:20}}>
          <Text>No orders record found</Text>
        </View>
    </View>
  );

  const ThirdRoute = () => (
    <View style={{ flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#f7f7f7'}}>
        <Image source={require("../assets/record.png")} style={{height:100,width:80,resizeMode:"stretch"}} />
        <View style={{padding:20}}>
          <Text>No orders record found</Text>
        </View>
    </View>
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

export default function Orders({navigation})  {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Ongoing' },
        { key: 'second', title: 'Completed'},
        { key: 'third', title: 'Canceled' }
    ]);


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
