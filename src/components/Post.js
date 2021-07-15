import React from 'react'
import { useState, useRef, useContext, useEffect, useLayoutEffect, TouchableOpacity, Button } from 'react'
import { StyleSheet, View, StatusBar, FlatList, Image } from 'react-native'
import Text from '../components/Text'
import { Entypo, Ionicons, Feather } from '@expo/vector-icons'
import Moment from 'moment';
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
export default function Post({ item, onLikePress, onCommentPress }) {
    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeaderContainer}>
                <Image style={styles.postProfilePhoto} source={{ uri: item.user.profilePhotoUrl }} />
                <View style={styles.postInfoContainer}>
                    <Text bold medium> {item.user.username} </Text>
                    <Text small> {Moment(item.time.toDate()).format('HH:mm DD/MM/YYYY').toString()} </Text>
                </View>
            </View>
            <View style={styles.post}>
                <Image style={styles.postImage} source={{ uri: item.postPhotoUrl }} />
                <View style={styles.postTitle}>
                    <Text bold>  {item.user.username} </Text>
                    {item.content !== null && item.content.length > 0 ? <Text> {item.content} </Text> : null}
                </View>
            </View>
            <View style={styles.optionsPost}>
                <Interaction onPress={() => onLikePress(item)}>
                    <Ionicons style={styles.optionPost} name={item.currentUserLiked ? "ios-heart" : "ios-heart-outline"} size={25} color={item.currentUserLiked ? "red" : "#111"} />
                </Interaction>
                <Interaction onPress={() => onCommentPress(item)}>
                    <Ionicons style={styles.optionPost} name="ios-chatbubble-outline" size={23} color="#111" />
                </Interaction>
                <Interaction onPress={() => onCommentPress(item)}>
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
        </View>
    )
};



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
