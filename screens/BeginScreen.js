import React, {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";

const BeginScreen = ({navigation}) => {
    const MyTab = createStackNavigator();

    return (
        <MyTab.Navigator initialRouteName={"LoginScreen"}>
            <MyTab.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
                headerBackTitleVisible: false,
                headerShown: false,
                title: 'Get Started',
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
            }}
            />
            <MyTab.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{
                headerBackTitleVisible: false,
                headerShown: false,
                title: 'Get Started',
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
            }}
            />
      </MyTab.Navigator>
    );

}


export default BeginScreen;

