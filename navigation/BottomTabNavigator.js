import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import TodayScreen from '../screens/Today/TodayScreen';
import WeeklyScreen from '../screens/Weekly/WeeklyScreen';
import Monthly from '../screens/Monthly/Monthly';
import NoteScreen from '../screens/Note/NoteScreen';
import TemplateScreen from '../screens/Template/TemplateScreen';

import { createStackNavigator } from '@react-navigation/stack';
import {Text} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();
const MyTab = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Weekly';


export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route), headerShown:false });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} headerShown={false}
      tabBarOptions={{
        activeTintColor: '#3498db',
        inactiveTintColor: 'gray',

        style: {
          backgroundColor: '#fff',
        },

      }}
    >
      <BottomTab.Screen
        name="Weekly"
        component={WeeklyScreen}
        options={{
          title: 'Weekly View',
          tabBarIcon: ({ focused }) => <Ionicons size={25} color={focused ? '#3498db' : 'gray' } name="md-book" />,
        }}
      />        
      <BottomTab.Screen
        name="Monthly"
        component={Monthly}
        options={{
          title: 'Monthly View',
          tabBarIcon: ({ focused }) => <Ionicons size={25} color={focused ? '#3498db' : 'gray' } name="md-calendar" />,
        }}
      />           
      <BottomTab.Screen
        name="Note"
        component={NoteScreen}
        options={{
          title: 'Note',
          tabBarIcon: ({ focused }) => <Ionicons size={25} color={focused ? '#3498db' : 'gray' } name="md-create" />,
        }}
      />          
      <BottomTab.Screen
        name="Template"
        component={TemplateScreen}
        options={{
          title: 'Setting',
          tabBarIcon: ({ focused }) => <Ionicons size={25} color={focused ? '#3498db' : 'gray' } name="md-settings" />,
        }}
      />        
    </BottomTab.Navigator>

  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Welcome';
    case 'Today':
      return 'TODAY';
    case 'Weekly':
      return 'WEEKLY VIEW';
      case 'Monthly':
        return 'MONTHLY VIEW';        
    case 'Note':
      return 'NOTE';        
  }
}
