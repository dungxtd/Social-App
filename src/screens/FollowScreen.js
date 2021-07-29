import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import Text from '../components/Text'
import { Entypo, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'
import { UserContext } from '../context/UserContext'
import { FirebaseContext } from '../context/FirebaseContext'
import firebase from 'firebase'
import "firebase/firestore"
const db = firebase.firestore();
export default function FollowScreen({ route, navigation }) {

    const [user, setUser] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)
    const [item, setItem] = useState({ ...route.params.post });
    const [comment, setComment] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const onFollowPress = async () => {
        var followers = item.user.followers;
        var following = user.following;
        var itemUpdate = { ...item };
        if (!item.user.Isfollowing) {
            following.push(item.userId);
            followers.push(user.uid);
            await db.collection("users")
                .doc(item.userId)
                .update({
                    "followers": followers
                });
            await db.collection("users").doc(user.uid)
                .update({
                    "following": following
                });

        }
        else {
            var index = followers.indexOf(user.uid.toString());
            if (index !== -1)
                followers.splice(index, 1);
            var index1 = following.indexOf(item.userId);
            if (index1 !== -1)
                following.splice(index, 1);
            await db.collection("users")
                .doc(item.userId)
                .update({
                    "followers": followers
                })
            await db.collection("users").doc(user.uid)
                .update({
                    "following": following
                })

        }
        itemUpdate.user.Isfollowing = !itemUpdate.user.Isfollowing;
        setItem(itemUpdate);
        setUser({ ...user, following: following });
    }
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profileUsernameTitle}>
                    <Text medium bold center> {item.user.username} </Text>
                    <MaterialIcons name={'verified'} size={16} color={'#40a0ed'} style={{ paddingTop: 2 }} />
                </View>
                <View style={styles.profileInfoContainer}>
                    <View style={styles.profilePhotoContainer}>
                        <Image style={styles.profilePhoto} source={item.user.profilePhotoUrl === "default" ? require("../../assets/defaultProfilePhoto.jpg")
                            : {
                                uri: item.user.profilePhotoUrl
                            }} />
                    </View>
                    <View style={styles.startsContainer}>
                        <View style={styles.startContainer}>
                            <Text bold center>{item.user.posts.length}</Text>
                            <Text center small>Posts</Text>
                        </View>
                        <View style={styles.startContainer}>
                            <Text bold center>{item.user.followers.length}</Text>
                            <Text center small>Followers</Text>
                        </View>
                        <View style={styles.startContainer}>
                            <Text bold center>{item.user.following.length}</Text>
                            <Text center small>Following</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.profileNameAndDescription}>
                    <Text bold>{item.user.name}</Text>
                    <Text style={{ paddingTop: 2, }}>{item.user.bio}</Text>
                </View>
                <TouchableOpacity style={!item.user.Isfollowing ? styles.buttonFollower : styles.buttonFollowing} onPress={() => onFollowPress()}>
                    <Text bold>{!item.user.Isfollowing ? "Follow" : "Following"}</Text>
                </TouchableOpacity>
                <View style={styles.wrapProfileLine}>
                    <View style={styles.profileLine}></View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        marginTop: 32,
        flex: 1,
        padding: 20,
        justifyContent: 'space-between'
    },
    profileContainer: {
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
})
