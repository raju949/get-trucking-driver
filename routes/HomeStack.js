import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Country from '../screens/Country';
import Register from '../screens/Register';
import Registernext from '../screens/Registernext';
import RegisterSecondnext from '../screens/RegisterSecondnext';
import RegistrationUpload from '../screens/RegistrationUpload';
import More from '../screens/More';
import OrderDetail from '../screens/OrderDetail';
import TrackOrder from '../screens/TrackOrder';
import OrderPayment from '../screens/OrderPayment';
import EditProfile from '../screens/EditProfile';
import ReferEarn from "../screens/ReferEarn";
import Notifications from '../screens/Notification';
import Cashout from '../screens/Cashout';
import BalanceDetail from '../screens/BalanceDetail';
import BankDetail from '../screens/BankDetail';
import ArriveToGo from '../screens/ArriveToGo';
import DriverChat from '../screens/DriverChat';
import Profile from '../screens/Profile';
import  SupportChat from '../screens/SupportChat';
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Country" component={Country}  options={{ swipeEnabled: false }}/>
      <Stack.Screen name="Login" component={Login}  options={{ swipeEnabled: false }}/>
      <Stack.Screen name="Register" component={Register} options={{ swipeEnabled: false }} />
      <Stack.Screen name="Registernext" component={Registernext} options={{ swipeEnabled: false }} />
      <Stack.Screen name="RegisterSecondnext" component={RegisterSecondnext} options={{ swipeEnabled: false }} />
      <Stack.Screen name="RegistrationUpload" component={RegistrationUpload} options={{ swipeEnabled: false }} />
      <Stack.Screen name="Notification" component={Notifications} options={{ swipeEnabled: false }} />
      <Stack.Screen name="BalanceDetail" component={BalanceDetail} options={{ swipeEnabled: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ swipeEnabled: false }} />
      <Stack.Screen name="Cashout" component={Cashout} options={{ swipeEnabled: false }} />
      <Stack.Screen name="BankDetail" component={BankDetail} options={{ swipeEnabled: false }} />
      <Stack.Screen name="ArriveToGo" component={ArriveToGo} options={{ swipeEnabled: false }} />
      <Stack.Screen name="More" component={More} options={{ swipeEnabled: false }} />
      <Stack.Screen name="SupportChat" component={SupportChat} options={{ swipeEnabled: false }} />
      <Stack.Screen name="PlaceOrder" component={More} options={{ swipeEnabled: false }} />
      <Stack.Screen name="TrackOrder" component={TrackOrder} options={{ swipeEnabled: false }} />
      <Stack.Screen name="OrderHistory" component={More} options={{ swipeEnabled: false }} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ swipeEnabled: false }} />
      <Stack.Screen name="OrderPayment" component={OrderPayment} options={{ swipeEnabled: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ swipeEnabled: false }} />
      <Stack.Screen name="DriverChat" component={DriverChat} options={{ swipeEnabled: false }} />
      <Stack.Screen name="ReferEarn" component={ReferEarn} options={{ swipeEnabled: false }} />
    </Stack.Navigator>
  );
}



export default HomeStack;