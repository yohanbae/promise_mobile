import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect, StackActions } from '@react-navigation/native';
import MonthlyScreen from "./MonthlyScreen";
import MonthlyPath from "./MonthlyPath";

const Monthly = ({navigation}) => {
    const MyTab = createStackNavigator();

    useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused
          return () => {
            // Do something when the screen is unfocused
            navigation.dispatch(
                StackActions.push('MonthlyScreen', {})
              );
          };
        }, [])
    );
    
    return(
        <MyTab.Navigator initialRouteName={"MonthlyScreen"}>
        <MyTab.Screen
          name="MonthlyScreen"
          component={MonthlyScreen}
          options={{
            headerBackTitleVisible: false,
            headerShown: false,
            title: 'Get Started',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
          }}
        />
        <MyTab.Screen
          name="MonthlyPath"
          component={MonthlyPath}
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

export default Monthly;
