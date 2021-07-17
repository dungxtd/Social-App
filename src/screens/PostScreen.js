import React, { useContext, useState } from 'react'
import { StyleSheet, ScrollView, View, TextInput, Keyboard, TouchableOpacity, Image, TouchableWithoutFeedback, Dimensions, PixelRatio } from 'react-native'
import InputScrollView from 'react-native-input-scroll-view';
import Text from '../components/Text'
import styled from 'styled-components/native'
import { Entypo, Ionicons, Feather, AntDesign } from '@expo/vector-icons'
import { UserContext } from '../context/UserContext'
import { FirebaseContext } from '../context/FirebaseContext'
import * as ImagePicker from 'expo-image-picker';
export default function PostScreen({ navigation }) {
    const firebase = useContext(FirebaseContext)
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [postPhotoUrl, setPostPhotoUrl] = useState(null);
    const [user, setUser] = useContext(UserContext)
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Create Post',
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
                    <AntDesign.Button
                        name="left"
                        size={20}
                        color="#111"
                        backgroundColor="white"
                    />
                </View>
            )
        });
    }, [navigation, createPost]);
    const createPost = async () => {
        setLoading(true);
        try {
            console.log(postPhotoUrl);
            console.log(content);
            const post = { content: content, postPhotoUrl: postPhotoUrl };
            await firebase.createPost(post);
        } catch (error) {
            console.log("Error @createPost: ", error);
        } finally {
            setLoading(false);
            navigation.navigate('Home');
        }
    }
    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaType: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.75,
            })
            if (!result.cancelled) {
                await setPostPhotoUrl(result.uri);
                // console.log(postPhotoUrl);
            }
        } catch (err) {
            console.log("Error @pickerImage: ", err);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.container}>
                <View style={styles.profileInfoContainer} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.profilePhotoContainer}>
                            <Image style={styles.profilePhoto} source={user.profilePhotoUrl === "default" ? require("../../assets/defaultProfilePhoto.jpg")
                                : {
                                    uri: user.profilePhotoUrl
                                }} />
                        </View>
                        <Text medium bold center style={styles.profileUsernameTitle}>{user.username}</Text>
                    </View>
                    <TouchableOpacity onPress={pickImage} >
                        <Text small bold color="#40a0ed">Add Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 10 }} disabled={loading || (postPhotoUrl == null && content.length == 0)} onPress={createPost} >
                        {loading ? (
                            <Loading />
                        ) : (
                            <Text medium bold color={loading || (postPhotoUrl == null && content.length == 0) ? "#dedede" : "#40a0ed"} >Post</Text>
                        )}
                    </TouchableOpacity>

                </View>
                <ScrollView>
                    <TextInput
                        autoFocus={true}
                        // onFocus={Keyboard.dismiss()}
                        placeholder="What's on your mind?"
                        style={styles.input}
                        onChangeText={text => { setContent(text) }}
                        value={content}
                        multiline
                    // editable={false} selectTextOnFocus={false}
                    />
                    {postPhotoUrl !== null ? <Image style={{ width: Dimensions.get('window').width - 20, height: Dimensions.get('window').width - 20, marginTop: 20 }} source={{ uri: postPhotoUrl }} /> : null}
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    input: {
        flex: 1,
        height: '50%',
        // marginLeft: 12,
        // marginRight: 12,
        paddingBottom: 20,
        fontSize: 18,
    },
    profileInfoContainer: {
        display: 'flex',
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
    profilePhotoContainer: {
        shadowOpacity: 0.2,
        shadowRadius: 30,
        shadowColor: '#222222',
    },
    profilePhoto: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    profileUsernameTitle: {
        paddingLeft: 10,
    },
    buttonPost: {
        width: '25%',
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#dedede",
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#f9f9f9',
        marginBottom: 60,
    },
    wrapButtonPost: {
        // flex: 2,
        height: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
});
const Loading = styled.ActivityIndicator.attrs(props => ({
    color: '#111',
    size: 'small',
}))``;