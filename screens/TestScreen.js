import React, {useState} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import firebase from "../Firebase";

const TestScreen = ({navigation}) => {
    const signout = () => {
        clearLoginData();
        firebase.auth().signOut();
    }
    const clearLoginData = async () => {
        try {
            await AsyncStorage.removeItem("LOGINDATA");
        }
        catch(exception) {
        }
    }

  return (
    <View>
      <ScrollView>
      <Text>HOME SCREEN TESTIGN~</Text>
      <Button onPress={()=> signout()} title="LOG OUT" />
        <Button
         title="Go to Details"
         onPress={() => navigation.navigate('Day', {id: 10})}
       />
      </ScrollView>
    </View>
  );
}


export default TestScreen;