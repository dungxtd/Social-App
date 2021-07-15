import styled from 'styled-components/native'
import React, { Component } from "react";
import { FirebaseContext } from '../context/FirebaseContext'
import { UserContext } from '../context/UserContext'
import Text from '../components/Text'
import { useState, useRef, useContext, useEffect, useLayoutEffect, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react'
import { StyleSheet, View, StatusBar, FlatList, Image, Platform } from 'react-native'
import { Entypo, Ionicons, Feather } from '@expo/vector-icons'
import Moment from 'moment';
import KeyboardAccessoryView from '../components/InputComponent'
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
    InteractionTextInput,
    InteractionKeyboardAvoidingView,
} from '../components/Styled';
const db = firebase.firestore();
import firebase from 'firebase'
import "firebase/firestore"
export default function CommentScreen({ route, navigation }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const postAiDi = useState(route.params.post.postId);
    const [item, setItem] = useState({ ...route.params.post });
    const [comment, setComment] = useState([]);
    const uid = useState({ ...user.uid });
    const [refresh, setRefresh] = useState(false);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Comment',
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontSize: 17,
            },
            headerStyle: {
                backgroundColor: 'white',
                elevation: 0,
            },
            headerBackTitleVisible: false,
            headerBackImage: () => (
                <View style={{ marginLeft: 10 }}>
                    <Interaction style={{ marginRight: 20 }} disabled={loading}>
                        <Text medium>Cancel</Text>
                    </Interaction>
                </View>
            )
        });
    }, [navigation, handleGetPost]);
    const commentAction = async (comment, post) => {
        // console.log(post);
        await db.collection("posts")
            .doc(post.postId)
            .collection("comments")
            .add({
                comment: comment,
                time: firebase.firestore.Timestamp.fromDate(new Date()),
                userId: user.uid,
            });
        await setRefresh(true);
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
        setItem({ ...post });
    }
    useEffect(() => {
        // setRefresh(true);
        console.log("useEffect comment");
        handleGetPost();

    }, [refresh])
    const renderItem = ({ item }) => {
        return (
            <View>
                <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 10, paddingLeft: 20 }}>
                    <Image style={styles.commentProfilePhoto} source={{ uri: user.profilePhotoUrl }} />
                    <View style={styles.postInfoContainer}>
                        <Text bold> {item.user.username} </Text>
                        <Text small> {Moment(item.time.toDate()).format('HH:mm').toString()} </Text>
                    </View>
                    <Text>{item.comment}</Text>
                </View>
                <View style={styles.wrapProfileLine}>
                    <View style={styles.profileLine}></View>
                </View>
            </View>
        );
    };
    const handleGetPost = async () => {
        try {
            const arrComment = [];
            await db.collection("posts").doc(postAiDi[0].toString()).collection("comments").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.id, ' => ', doc.data()) arrComment.push({ ...doc.data(), commentId: doc.id });
                });
            })
            const arrCommentWithUser = [];
            await db.collection("users")
                .get()
                .then((querySnapshot) => {
                    arrComment.forEach((comment) => {
                        querySnapshot.forEach((doc) => {
                            if (doc.id == comment.userId) arrCommentWithUser.push({ ...comment, user: doc.data() });
                        });
                    })
                })
                .catch((error) => {
                    console.log("@handleGetPost: ", error);
                });
            arrCommentWithUser.sort((a, b) => a.time.toDate() > b.time.toDate() ? 1 : -1)
            await setComment(arrCommentWithUser);
            await setRefresh(false);
            // console.log(comment);
        } catch (error) {
            console.log("@handeGetPost: ", error)
        }

    }
    return (
        <View style={styles.postContainer}>
            <View style={styles.commentContainer}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={styles.postHeaderContainer}>
                                <Image style={styles.postProfilePhoto} source={{ uri: item.user.profilePhotoUrl }} />
                                <View style={styles.postInfoContainer}>
                                    <Text bold medium> {item.user.username} </Text>
                                    <Text small> {Moment(item.time.toDate()).format('HH:mm DD/MM/YYYY').toString()} </Text>
                                </View>
                            </View>
                            <View style={styles.post}>
                                {/* <Image style={styles.postImage} source={{ uri: item.postPhotoUrl }} /> */}
                                <View style={styles.postTitle}>
                                    <Text bold>  {item.user.username} </Text>
                                    {item.content !== null && item.content.length > 0 ? <Text> {item.content} </Text> : null}
                                </View>
                            </View>
                            <View style={styles.optionsPost}>
                                <Interaction onPress={() => onLikePress(item)}>
                                    <Ionicons style={styles.optionPost} name={item.currentUserLiked ? "ios-heart" : "ios-heart-outline"} size={25} color={item.currentUserLiked ? "red" : "#111"} />
                                </Interaction>
                                <Interaction >
                                    <Ionicons style={styles.optionPost} name="ios-chatbubble-outline" size={23} color="#111" />
                                </Interaction>
                                <Interaction >
                                    <Feather style={styles.optionPostSend} name="send" size={21} color="#111" />
                                </Interaction>
                            </View>
                            <View style={styles.detailPost}>
                                {item.likes.length > 0 ? (
                                    <Text bold style={styles.postLiked}>{item.likes.length} {item.likes.length > 1 ? "likes" : "like"}</Text>
                                ) : null}
                                {item.comments.length > 0 ? <Text small style={styles.postCommented}>View all {item.comments.length} {item.comments.length > 1 ? "comments" : "comment"}</Text> : null}
                            </View>
                            <View style={styles.wrapPostLine}>
                                <View style={styles.postLine}></View>
                            </View>
                        </>}
                    data={comment}
                    renderItem={renderItem}
                    keyExtractor={item => item.commentId}
                    ListFooterComponent={
                        <Text></Text>
                    }
                // refreshing={refresh}
                // onRefresh={handeRefresh}
                // extraData={selectedPost}
                />
            </View>
            <KeyboardAccessoryView onClick={(text) => commentAction(text, item)} />
        </View>


    )
}

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        marginBottom: 18,
        paddingTop: 8,
        backgroundColor: '#ffffff',
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
    commentProfilePhoto: {
        width: 32,
        height: 32,
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
    },
    wrapOptionInformation: {
        marginTop: 7.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 36,
        width: '100%',

        // marginLeft: 20
    },
    titleOptionInformation: {
        flex: 2,
    },
    labelOptionInformation: {
        flex: 6,
        // fontSize: 16
    },
    iconComment: {
        flex: 1,
    },
    wrapProfileLine: {
        marginTop: 0,
        width: '100%',
        height: 10,
        alignItems: 'flex-start',
        paddingLeft: 15,
    },
    profileLine: {
        width: '75%',
        height: '100%',
        borderColor: "#dedede",
        borderBottomWidth: 0.5,
    },
    commentContainer: {
        flex: 1
    },

})
const Loading = styled.ActivityIndicator.attrs(props => ({
    color: '#111',
    size: 'small',
}))``;