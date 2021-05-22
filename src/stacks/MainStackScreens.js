import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import MessageScreen from '../screens/MessageScreen'
import NotificationScreen from '../screens/NotificationScreen'
import ProfileScreen from '../screens/ProfileScreen'
import PostScreen from '../screens/PostScreen'

export default function MainStackScreen() {
    const MainStack = createBottomTabNavigator();

    const tabBarOptions = {
        showLabel: false,
        style: {
            backgroundColor: '#222222',
            paddingBottom: 12,
        }
    }

    const screenOptions = (({ route }) => ({
        tabBarIcons: ({ focused }) => {
            let iconName = "home"
        }
    }))

    return (
        <MainStack.Navigator >
            <MainStack.Screen name="Home" component={HomeScreen}></MainStack.Screen>
            <MainStack.Screen name="Message" component={MessageScreen}></MainStack.Screen>
            <MainStack.Screen name="Notification" component={NotificationScreen}></MainStack.Screen>
            <MainStack.Screen name="Profile" component={ProfileScreen}></MainStack.Screen>
            <MainStack.Screen name="Post" component={PostScreen}></MainStack.Screen>
        </MainStack.Navigator>
    )
}

