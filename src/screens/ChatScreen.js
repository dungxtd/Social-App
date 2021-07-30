import React, { useContext, useEffect, useState, useFocusEffect } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, FlatList } from 'react-native'
import Text from '../components/Text'
import { Entypo, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'
import { UserContext } from '../context/UserContext'
import { FirebaseContext } from '../context/FirebaseContext'
import KeyboardAccessoryView from '../components/InputComponent'
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
import Moment from 'moment';
export default function ChatScreen({ route, navigation }) {
    const [listChat, setListChat] = useState([]);
    const [user, setUser] = useContext(UserContext)
    const [item, setItem] = useState({ ...route.params.post });
    const [comment, setComment] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        // setRefresh(true);
        console.log("useEffectHome");
        handeRefreshs();
    }, []);
    const handeRefreshs = async () => {
        const allChat = [];
        const myUid = user.uid;
        await db.collection("users").doc(myUid).collection("chats").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().userId == item.userId) {
                    allChat.push({ ...doc.data(), chatId: doc.id });
                }
            });
        })
        await db.collection("users").doc(item.userId).collection("chats").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().userId == user.uid) {
                    allChat.push({ ...doc.data(), chatId: doc.id });
                }
            });
        })
        console.log(allChat)
        allChat.sort((a, b) => a.time.toDate() < b.time.toDate() ? 1 : -1)
        setListChat(allChat);
    };
    const chatAction = async (text) => {
        await db.collection("users")
            .doc(user.uid)
            .collection("chats")
            .add({
                chat: text,
                time: firebase.firestore.Timestamp.fromDate(new Date()),
                userId: item.userId,
                profilePhotoUrl: item.user.profilePhotoUrl,
                userSendId: user.uid,
                profileSendPhotoUrl: user.profilePhotoUrl,
            })
        handeRefreshs();
    };
    const renderItem = ({ item }) => {
        return (

            <Interaction >
                {item.userSendId == user.uid ? (
                    <View style={styles.postHeaderContainer1}>
                        <Image style={styles.postProfilePhoto} source={item.profileSendPhotoUrl === "default" ? require("../../assets/defaultProfilePhoto.jpg")
                            : {
                                uri: item.profileSendPhotoUrl
                            }} />
                        <View style={{ paddingLeft: 5 }}>
                            <Text medium>{item.chat}</Text>
                            <Text small> {Moment(item.time.toDate()).format('HH:mm DD/MM/YYYY').toString()} </Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.postHeaderContainer}>
                        <Image style={styles.postProfilePhoto} source={item.profileSendPhotoUrl === "default" ? require("../../assets/defaultProfilePhoto.jpg")
                            : {
                                uri: item.profileSendPhotoUrl
                            }} />
                        <View style={{ paddingLeft: 5 }}>
                            <Text medium>{item.chat}</Text>
                            <Text small> {Moment(item.time.toDate()).format('HH:mm DD/MM/YYYY').toString()} </Text>
                        </View>
                    </View>
                )}

            </Interaction>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.chatContainer}>
                <FlatList
                    inverted
                    data={listChat}
                    renderItem={renderItem}
                    keyExtractor={item => item.chatId}
                    style={{ height: '100%' }}
                />
            </View>
            <KeyboardAccessoryView onClick={(text) => chatAction(text)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        // marginTop: 32,
        flex: 1,
        paddingBottom: 20,
        justifyContent: 'space-between'
    },
    chatContainer: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 50,
        // display: 'flex',
        // flexDirection: 'row',
    },
    profileInfoContainer: {
        // display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        // flex: 1,
        justifyContent: 'space-between'
    },
    profilePhotoContainer: {
        shadowOpacity: 0.2,
        shadowRadius: 30,
        shadowColor: '#222222',
        // flex: 1,
    },
    profilePhoto: {
        width: 96,
        height: 96,
        borderRadius: 48,
    },
    profileUsernameTitle: {
        width: '100%',
        // marginTop: 8,
        // marginBottom: 16,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    startsContainer: {
        flex: 1,
        // paddingLeft: 24,
        // justifyContent: 'center',
        // marginBottom: 64,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignItems: 'center',
    },
    startContainer: {
        justifyContent: 'center',
        marginLeft: 15,
    },
    profileNameAndDescription: {
        marginTop: 5,
    },
    wrapPostLine: {
        width: '100%',
        height: 10,
        alignItems: 'flex-end',
        // justifyContent: 'center',
    },
    postLine: {
        width: '65%',
        height: '100%',
        borderColor: "#dedede",
        borderBottomWidth: 0.5,
    },
    buttonFollower: {
        width: '100%',
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#dedede",
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 16,
        backgroundColor: 'white'
    },
    buttonFollowing: {
        width: '100%',
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#dedede",
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 16,
    },
    wrapProfileLine: {
        marginTop: 24,
        width: '100%',
        height: 10,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    profileLine: {
        width: '95%',
        height: '100%',
        borderColor: "#111",
        borderBottomWidth: 0.5,
    },
    postHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginTop: 5,
        width: '100%',
    },
    postHeaderContainer1: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginLeft: 5,
        marginTop: 5,
        width: '100%',
    },
    postProfilePhoto: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderColor: "#dedede",
        borderWidth: 1,
    },
})
