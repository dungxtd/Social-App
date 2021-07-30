import React from 'react'
import { useState, useRef, useContext, useEffect, useLayoutEffect, TouchableOpacity, Button } from 'react'
import {
    NavigationContainer,
    useFocusEffect,
} from '@react-navigation/native';
import { StyleSheet, View, StatusBar, FlatList, Image, TextInput } from 'react-native'
import Text from '../components/Text'
import Post from '../components/Post'
import { Entypo, Ionicons, Feather } from '@expo/vector-icons'
import Data from '../components/Data'
import PostScreen from './PostScreen'
import { FirebaseContext } from '../context/FirebaseContext'
import Moment from 'moment';
import { UserContext } from '../context/UserContext'
const db = firebase.firestore();
import firebase from 'firebase'
import "firebase/firestore"
import {
    Container,
    Card,
    UserInfo,
    UserImg,
    UserName,
    UserInfoText,
    PostTime,
    PostText,
    PostImg,
    InteractionWrapper,
    Interaction,
    InteractionText,
    Divider,
} from '../components/Styled';
export default function NotificationScreen({ navigation }) {
    const [user, setUser] = useContext(UserContext);
    const [listUser, setListUser] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        // setRefresh(true);
        console.log("useEffectSearch");
        // handeSearchUser();
        setListUser([]);
    }, [])
    const handeSearchUser = async () => {
        const myUid = user.uid;
        const lstUsers = [];
        try {
            await db.collection("users")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var user = { ...doc.data() };
                        if (doc.data().followers.includes(myUid)) {
                            user.Isfollowing = true;
                        }
                        else user.Isfollowing = false;
                        if (user.username.includes(searchText) || user.name.includes(searchText))
                            lstUsers.push({ ...user, userId: doc.id });
                    });
                })
                .catch((error) => {
                    console.log("@getUsersForPosts: ", error);
                });
            setListUser(lstUsers);
            console.log(lstUsers);
        } catch (error) {
            console.log("@handeSearchUser: ", error)
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            console.log("useEffectSearchReturn");
            // handeSearchUser();
            setListUser([]);
            setSearchText("");

            //   alert('Screen was focused');
            // Do something when the screen is focused
            return () => {
                // alert('Screen was unfocused');
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );
    const renderItem = ({ item }) => {
        return (
            <Interaction style={styles.postHeaderContainer} onPress={() => onProfilePress(item)}>
                <Image style={styles.postProfilePhoto} source={item.profilePhotoUrl === "default" ? require("../../assets/defaultProfilePhoto.jpg")
                    : {
                        uri: item.profilePhotoUrl
                    }} />
                <View style={styles.postInfoContainer}>
                    <Text bold medium> {item.username} </Text>
                    <Text style={{ paddingTop: 2 }}> {item.name} </Text>
                </View>
            </Interaction>
        );
    };
    const onProfilePress = async (users) => {
        var item = { user: users, userId: users.userId };
        if (item.userId != user.uid)
            navigation.navigate('FollowUser', {
                post: item
            });
        else navigation.navigate('Profile', {
        });
    }
    return (
        <View style={styles.container}>
            <View style={styles.feedContainer}>
                <View style={{ flexDirection: "row" }}>
                    <TextInput style={styles.authField}
                        onChangeText={(email) => setSearchText(email.trim())}
                        value={searchText}
                        placeholder="Chat with someone..."
                    />
                    <Interaction style={styles.iconSearch} onPress={() => handeSearchUser()}>
                        <Ionicons style={styles.optionPost} name={"search-circle-outline"} size={35} color={"#111"} />
                    </Interaction>
                </View>
                <FlatList
                    data={listUser}
                    renderItem={renderItem}
                    keyExtractor={item => item.userId}
                    style={{ height: '100%' }}
                />
            </View>
            <StatusBar barStyle="dark-content" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 48,
        backgroundColor: 'white',
    },
    feedContainer: {
        paddingTop: 50,
        paddingLeft: 10,
        paddingRight: 10,
    },
    postContainer: {
        marginBottom: 18,
        // backgroundColor: '#dedede',
    },
    postHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginTop: 5
    },
    authField: {
        color: 'black',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 6,
        height: 48,
        fontSize: 16,
        padding: 10,
        marginBottom: 15,
        flex: 1,
    },
    postProfilePhoto: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderColor: "#dedede",
        borderWidth: 1,
    },
    postInfoContainer: {
        marginLeft: 5,
    },
    post: {
        marginTop: 10,
    },
    postTitle: {
        marginLeft: 12,
    },
    optionsPost: {
        marginTop: 10,
        flexDirection: 'row',
    },
    optionPost: {
        marginLeft: 10,
    },
    optionPostSend: {
        marginLeft: 10,
        marginTop: 4,
    },
    detailPost: {
        marginLeft: 10,
    },
    postImage: {
        marginBottom: 10,
        width: '100%',
        height: 360,
    },
    postLiked: {
        marginTop: 3,
        marginLeft: 3,
    },
    postCommented: {
        marginTop: 2,
        marginLeft: 3,
    },
    wrapPostLine: {
        width: '100%',
        height: 10,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    postLine: {
        width: '90%',
        height: '100%',
        borderColor: "#dedede",
        borderBottomWidth: 0.5,
    },
    iconSearch: {
        position: "absolute",
        right: 10,
        top: 6,
    }
})

