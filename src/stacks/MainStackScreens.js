import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons"

import HomeScreen from '../screens/HomeScreen'
import MessageScreen from '../screens/MessageScreen'
import NotificationScreen from '../screens/NotificationScreen'
import ProfileScreen from '../screens/ProfileScreen'
import PostScreen from '../screens/PostScreen'

export default function MainStackScreen() {
    const MainStack = createBottomTabNavigator();

    const tabBarOptions = {
        showLabel: false,
        showIcon: true,
        style: {
            backgroundColor: '#fff',
            paddingBottom: 16,
        }
    }

    // const screenOptions = (({ route }) => ({
    //     tabBarIcons: ({ focused }) => {
    //         let iconName = 'ios-home'
    //         return <Ionicons name={iconName} size={24} color={focused ? '#fff' : '#666666'} />;
    //     }
    // }))

    return (
        <MainStack.Navigator tabBarOptions={tabBarOptions}>
            <MainStack.Screen name="Home" component={HomeScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={'ios-home'}
                            size={24}
                            color={focused ? '#FFCA28' : '#BDBDBD'}
                        />
                    ),
                })}

            />
            <MainStack.Screen name="Message" component={MessageScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={'ios-chatbox-ellipses'}
                            size={24}
                            color={focused ? '#FFCA28' : '#BDBDBD'}
                        />
                    )
                })}
            />
            <MainStack.Screen name="Post" component={PostScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={'ios-create'}
                            size={24}
                            color={focused ? '#FFCA28' : '#BDBDBD'}
                        />
                    )
                })}
            />
            <MainStack.Screen name="Notification" component={NotificationScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={'ios-notifications'}
                            size={24}
                            color={focused ? '#FFCA28' : '#BDBDBD'}
                        />
                    )
                })}
            />
            <MainStack.Screen name="Profile" component={ProfileScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={'ios-person'}
                            size={24}
                            color={focused ? '#FFCA28' : '#BDBDBD'}
                        />
                    )

                })}
            />
        </MainStack.Navigator>
    )
}

