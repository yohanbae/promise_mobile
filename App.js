import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import BeginScreen from "./screens/BeginScreen";
import DayScreen from "./screens/LoginScreen";

import firebase from "./Firebase";

import { YellowBox } from 'react-native';
import _ from 'lodash';

import {decode, encode} from 'base-64'



if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

//// This Part remove Yellow Error
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  const [loginComplete, setLoginComplete] = React.useState();

  const processLogin = () => {
    console.log("working on Login");
    // setLoginComplete(true);
  }

  const MyTab = createStackNavigator();
  // Load any resources or data that we need prior to rendering the app

  let loginData;
  const checkLoginToken = async () => {
    try {
      const value = await AsyncStorage.getItem('LOGINDATA');
      if (value !== null) {
        console.log("Value Exist", value);
        setLoginComplete(true);
      }
    }catch(e){
      console.log(e);
    }
  }

  const saveLoginToken = async (uid) => {
    try {
      await AsyncStorage.setItem('LOGINDATA', uid);
    }catch(e){
      console.log(e);
    }
  }

  React.useEffect(() => {
    checkLoginToken(); // If Token Exist, setLoginComplete true;

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log("Loggedin already");
        setLoginComplete(true);
        saveLoginToken(user.uid);
        // save login token here.
      }else{
        console.log("NOT YET");
        setLoginComplete(false);
      }
    });


    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);


  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null; // loading shows here
  } else {
    if(!loginComplete){
      return (
        <NavigationContainer>
          <BeginScreen />
        </NavigationContainer>
      ) 
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
