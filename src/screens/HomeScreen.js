import React from 'react'
import { useState, useRef, useContext, useEffect, useLayoutEffect, TouchableOpacity, Button } from 'react'
import { StyleSheet, View, StatusBar, FlatList, Image } from 'react-native'
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
export default function HomeScreen({ navigation }) {
    // const firebase = useContext(FirebaseContext);
    const [user, setUser] = useContext(UserContext);
    const uid = useContext(FirebaseContext).getCurrentUser().uid;
    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    useEffect(() => {
        // setRefresh(true);
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
                        if ((doc.id, " => ", doc.data()) != null)
                            allPosts.push({ ...doc.data(), postId: doc.id, currentUserLiked: doc.data().likes.map(e => e.userId).includes(uid.toString()) });
                    });
                    // console.log(allPosts);
                })
                .catch((error) => {
                    console.log("@getAllPosts: ", error);
                });

            const allPostsWithUsers = [];
            await db.collection("users")
                .get()
                .then((querySnapshot) => {
                    allPosts.forEach((post) => {
                        querySnapshot.forEach((doc) => {
                            if (doc.id == post.userId) allPostsWithUsers.push({ ...post, user: doc.data() });
                        });
                    })
                })
                .catch((error) => {
                    console.log("@getUsersForPosts: ", error);
                });
            setRefresh(false);
            allPostsWithUsers.sort((a, b) => a.time.toDate() < b.time.toDate() ? 1 : -1)
            setPosts(allPostsWithUsers);
        } catch (error) {
            console.log("@getAllPosts: ", error)
        }

    }
    const onLikePress = async (post) => {
        if (!post.currentUserLiked) {
            var postLikes = post.likes;
            postLikes.push({ 'userId': uid.toString(), 'time': firebase.firestore.Timestamp.fromDate(new Date()) });
            await db.collection("posts")
                .doc(post.postId)
                .update({
                    "likes": postLikes
                })
            post.likes = postLikes;
            post.currentUserLiked = true;
        } else {
            var postLikes = post.likes;
            var index = postLikes.map(e => e.userId).indexOf(uid.toString())
            if (index !== -1)
                postLikes.splice(index, 1);
            await db.collection("posts")
                .doc(post.postId)
                .update({
                    "likes": postLikes
                })
            post.likes = postLikes;
            post.currentUserLiked = false;
        }
        setSelectedPost({ ...post })
    }
    const onCommentPress = async (post) => {
        navigation.navigate('Comment', {
            post: post
        });
    }
    const renderItem = ({ item }) => {
        return (
            <Post
                item={item}
                onPress={() => setSelectedPost(item)}
                onLikePress={onLikePress}
                onCommentPress={onCommentPress}
            />
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.feedContainer}>
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={item => item.postId}
                    refreshing={refresh}
                    onRefresh={handeRefresh}
                    extraData={selectedPost}
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
        paddingTop: 15,
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
        marginLeft: 6,
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
    }

})
