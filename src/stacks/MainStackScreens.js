import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Image, TouchableOpacity, Button } from 'react-native'
import { Entypo, Ionicons, Feather, AntDesign } from '@expo/vector-icons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Text from '../components/Text'


import HomeScreen from '../screens/HomeScreen'
import MessageScreen from '../screens/MessageScreen'
import NotificationScreen from '../screens/NotificationScreen'
import ProfileScreen from '../screens/ProfileScreen'
import FollowScreen from '../screens/FollowScreen'
import EditProfileScreen from '../screens/EditProfileScreen'
import PostScreen from '../screens/PostScreen'
import CommentScreen from '../screens/CommentScreen'
const MainStack = createBottomTabNavigator();
const FeedStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const tabBarOptions = {
    showLabel: false,
    showIcon: true,
    style: {
        backgroundColor: '#fff',
        paddingBottom: 16,
    }
}

const FeedScreen = ({ navigation }) => (
    <FeedStack.Navigator initialRouteName="Home">
        <FeedStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
                title: 'Home',
                headerTitleAlign: 'left',
                headerTitleStyle: {
                    fontSize: 18,
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerRight: () => (
                    <TouchableOpacity style={{ marginRight: 15, padding: 5 }} onPress={() => navigation.navigate("Post")}>
                        <AntDesign
                            name="pluscircleo"
                            size={22}
                            backgroundColor="#fff"
                            color="#111"
                        />
                    </TouchableOpacity>
                ),
            }}
        />
        <FeedStack.Screen
            name="Post"
            component={PostScreen}
        />
        <FeedStack.Screen
            name="Comment"
            component={CommentScreen}
            options={({ navigation, route }) => ({})}
        />
        <FeedStack.Screen
            name="Follow"
            component={FollowScreen}
            options={({ navigation, route }) => ({})}
            options={{ headerShown: false }}
        />
    </FeedStack.Navigator>
);
const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator initialRouteName="Profile">
        <ProfileStack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
        />
        <ProfileStack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={({ navigation, route }) => ({})}
        />
    </ProfileStack.Navigator>
);

export default function MainStackScreen() {

    return (
        <MainStack.Navigator tabBarOptions={tabBarOptions}>
            <MainStack.Screen
                name="Feed"
                component={FeedScreen}
                options={({ route }) => ({
                    // headerTitle: props => <LogoTitle {...props} />,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={'ios-home-outline'}
                            size={24}
                            color={focused ? '#111' : '#BDBDBD'}
                        />
                    ),
                })}
            />
            <MainStack.Screen name="Message" component={MessageScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name={'message1'}
                            size={24}
                            color={focused ? '#111' : '#BDBDBD'}
                        />
                    ),
                })}
            />
            <MainStack.Screen name="Notification" component={NotificationScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={'ios-notifications-outline'}
                            size={24}
                            color={focused ? '#111' : '#BDBDBD'}
                        />
                    )
                })}
            />
            <MainStack.Screen name="Profile" component={ProfileStackScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={'ios-person-outline'}
                            size={24}
                            color={focused ? '#111' : '#BDBDBD'}
                        />
                    )

                })}
            />
        </MainStack.Navigator>
    )
}

