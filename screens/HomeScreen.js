import React, {useState} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import firebase from "../Firebase";
import { createStackNavigator } from '@react-navigation/stack';

import DayScreen from "./DayScreen";
import TestScreen from "./TestScreen";

const HomeScreen = ({navigation}) => {

  const [theData, setTheData] = useState("hani");

  const meme = "hoho";
  const db = firebase.firestore();



  // db.collection("izgym").doc("n7rCkJbOR9NiyIIWsAIjo1MQ3iE3").onSnapshot(doc => {
  //   let momo = doc.data();
  //   let haha = momo['template']['friday'][1].name;
  //   setTheData(haha);
  // });

  const signout = () => {
    firebase.auth().signOut();
  }

  const MyTab = createStackNavigator();

  return (
    <MyTab.Navigator initialRouteName={"Test"}>
      <MyTab.Screen
        name="Test"
        component={TestScreen}
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
          title: 'Get Started',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <MyTab.Screen
        name="Day"
        component={DayScreen}
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
          title: 'Get Started',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
    </MyTab.Navigator>
    // <View>
    //   <ScrollView>
    //   <Text>Hello {theData}</Text>
    //   </ScrollView>
    //   <Button onPress={()=> signout()} title="LOG OUT" />
    //   <Text>hoho</Text>
    //   <Button
    //     title="Go to Details"
    //     onPress={() => navigation.navigate('Day')}
    //   />
    // </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}


export default HomeScreen;