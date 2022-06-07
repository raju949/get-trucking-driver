import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler
} from 'react-native';
import Constant from 'expo-constants';
import { Ionicons,FontAwesome5 } from '@expo/vector-icons';
export default class More extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {id:'3', icon: "layer-group",color:'black', name:"About", link: "https://github.com/"},
        {id:'2', icon: "handshake",color:'black', name:"Term and Condition",     link: "https://github.com/"},
        {id:'4', icon: "mail-bulk",color:'red', name:"Contact Us",  link: "https://mail.google.com/",},
        {id:'5', icon: "google-play",color:'#00fbff', name:"Play Store",  link: "https://play.google.com/"},
        {id:'1', icon: "facebook",color:'blue', name:"FaceBook",    link: "https://facebook.com/"},
        {id:'6', icon: "youtube",color:'red', name:"Youtube", link: "https://youtube.com/"},
       ]
    }
  }


  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

 handleBackPress = () => {
    this.props.navigation.navigate("Settings"); // React Navigation goBack
    return true;
  }

  render() {
    return (
      <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
        <Text>
          This is Web page..
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    marginTop:Constant.statusBarHeight,
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width:50,
    height:50,
    borderRadius:25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  timeAgo:{
    fontSize:12,
    color:"#696969"
  },
  name:{
    fontSize:16,
    color:"#7558FF"
  }
}); 