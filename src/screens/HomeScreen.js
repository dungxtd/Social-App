import React from 'react'
import { useState, useRef, useContext, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View, StatusBar, FlatList, Image } from 'react-native'
import Text from '../components/Text'
import { Entypo, Ionicons, Feather } from '@expo/vector-icons'
import Data from '../components/Data'
import PostScreen from './PostScreen'
import firebase from 'firebase'
import { FirebaseContext } from '../context/FirebaseContext'
const db = firebase.firestore();
export default function HomeScreen() {
    const firebase = useContext(FirebaseContext);
    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        setRefresh(true);
        console.log("useEffect");
        handeRefresh();
    }, [])

    handeRefresh = async () => {
        const allPosts = [];
        try {
            await db.collection("posts").where("userId", "!=", "")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if ((doc.id, " => ", doc.data()) != null) allPosts.push({ ...doc.data(), postId: doc.id });
                    });
                    setPosts(allPosts);
                    console.log(1);
                })
                .catch((error) => {
                    console.log("@getAllPosts: ", error);
                });
            setRefresh(false);
        } catch (error) {
            console.log("@getAllPosts: ", error)
        }

    }
    const renderPost = ({ item }) =>
        <View style={styles.postContainer}>
            <View style={styles.postHeaderContainer}>
                {/* <Image style={styles.postProfilePhoto} source={{ uri: item.user.profilePhotoUrl }} /> */}
                <View style={styles.postInfoContainer}>
                    {/* <Text bold>{item.user.username}</Text>
                    <Text small>{item.postedAt}</Text> */}
                </View>
            </View>
            <View style={styles.post}>
                <Image style={styles.postImage} source={{ uri: item.postPhotoUrl }} />
                <View style={styles.postTitle}>
                    {/* <Text bold>{item.user.username}</Text> */}
                    <Text>{item.content}</Text>
                </View>
            </View>
            <View style={styles.optionsPost}>
                <Ionicons style={styles.optionPost} name="ios-heart-outline" size={25} color="#111" />
                <Ionicons style={styles.optionPost} name="ios-chatbubble-outline" size={23} color="#111" />
                <Feather style={styles.optionPostSend} name="send" size={21} color="#111" />
            </View>
            <View style={styles.detailPost}>
                <Text bold style={styles.postLiked}>{item.likes} likes</Text>
                <Text small style={styles.postCommented}>View all {item.comments} comments</Text>
            </View>
            <View style={styles.wrapPostLine}>
                <View style={styles.postLine}></View>
            </View>
        </View>


    return (
        <View style={styles.container}>

            <View style={styles.feedContainer}>
                <FlatList
                    data={posts}
                    renderItem={renderPost}
                    keyExtractor={item => item.postId}
                    refreshing={refresh}
                    onRefresh={handeRefresh}
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
        // marginBottom: 28,
    },
    postContainer: {
        marginBottom: 18,
        // backgroundColor: '#dedede',
    },
    postHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
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
        marginLeft: 10,
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
    },
    postCommented: {
        marginTop: 2,
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
    }

})
