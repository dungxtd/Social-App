import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components/native'
import * as React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { UserContext } from '../context/UserContext'
import { FirebaseContext } from '../context/FirebaseContext'
import Text from '../components/Text'
import * as Permissions from 'expo-permissions';
import Platform from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const firebase = useContext(FirebaseContext)
    const [user, setUser] = useContext(UserContext);
    const [userUpdate, setUserUpdate] = useState({ ...user });
    //const [userData, setUserData] = useState(null);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Edit Profile',
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
                    <TouchableOpacity style={{ marginRight: 20 }} disabled={loading}>
                        <Text medium>Cancel</Text>
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation, updateProfile]);
    const updateProfile = async () => {
        setLoading(true);
        try {
            var profilePhotoUrlUpdate = await firebase.uploadProfilePhoto(userUpdate.profilePhotoUrl);
            setUser({ ...userUpdated, profilePhotoUrl: profilePhotoUrlUpdate });
            console.log(user);
            await firebase.updateProfile(userUpdate);
        } catch (error) {
            console.log("Error @updateProfile: ", error);
        } finally {
            setLoading(false);
            navigation.navigate('Profile');
        }
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, [])

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaType: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            })
            if (!result.cancelled) {
                setUserUpdate({ ...userUpdate, profilePhotoUrl: (result.uri) })
            }
        } catch (err) {
            console.log("Error @pickerImage: ", err);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.profilePhotoContainer}>
                {<Image />}
                <Image style={styles.profilePhoto} source={userUpdate.profilePhotoUrl === "default" ? require("../../assets/defaultProfilePhoto.jpg")
                    : {
                        uri: userUpdate.profilePhotoUrl
                    }} />
            </View>
            <TouchableOpacity style={{ marginTop: 10 }} onPress={pickImage}>
                <Text small bold color="#40a0ed">Change Profile Photo</Text>
            </TouchableOpacity>
            <View style={styles.wrapLongLine}>
                <View style={styles.longLine}></View>
            </View>
            <View style={styles.wrapOptionInformation}>
                <Text medium style={styles.titleOptionInformation}>Name</Text>
                <TextInput
                    style={styles.labelOptionInformation}
                    fontSize={16}
                    fontWeight={'400'}
                    value={userUpdate ? userUpdate.name : ''}
                    onChangeText={(txt) => setUserUpdate({ ...userUpdate, name: txt })}
                />
            </View>
            <View style={styles.wrapShortLine}>
                <View style={styles.shortLine}></View>
            </View>
            <View style={styles.wrapOptionInformation}>
                <Text medium style={styles.titleOptionInformation}>Username</Text>
                <TextInput
                    style={styles.labelOptionInformation}
                    fontSize={16}
                    value={userUpdate ? userUpdate.username : ''}
                    onChangeText={(txt) => setUserUpdate({ ...userUpdate, username: txt })}
                />
            </View>
            <View style={styles.wrapShortLine}>
                <View style={styles.shortLine}></View>
            </View>
            <View style={styles.wrapOptionInformation}>
                <Text medium style={styles.titleOptionInformation}>Bio</Text>
                <TextInput
                    style={styles.labelOptionInformation}
                    fontSize={16}
                    fontWeight={'400'}
                    value={userUpdate ? userUpdate.bio : ''}
                    onChangeText={(txt) => setUserUpdate({ ...userUpdate, bio: txt })}
                />
            </View>
            <View style={styles.wrapShortLine}>
                <View style={styles.shortLine}></View>
            </View>
            <View style={styles.wrapOptionInformation}>
                <Text medium style={styles.titleOptionInformation}>Email</Text>
                <TextInput
                    style={styles.labelOptionInformation}
                    fontSize={16}
                    fontWeight={'400'}
                    value={userUpdate ? userUpdate.email : ''}
                    onChangeText={(txt) => setUserUpdate({ ...userUpdate, email: txt })}
                />
            </View>
            <View style={styles.wrapLongLine}>
                <View style={styles.longLine}></View>
            </View>
            <View style={styles.wrapButtonDone}>
                <TouchableOpacity style={styles.buttonDone} disabled={loading} onPress={updateProfile} >
                    {loading ? (
                        <Loading />
                    ) : (
                        <Text medium bold color="#40a0ed">Done</Text>
                    )}
                </TouchableOpacity></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
    },
    profilePhotoContainer: {
        marginTop: 10,
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
    wrapLongLine: {
        marginTop: 10,
        width: '100%',
        height: 5,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    longLine: {
        width: '100%',
        height: '100%',
        borderColor: "#dedede",
        borderBottomWidth: 0.5,
    },
    wrapOptionInformation: {
        marginTop: 7.5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 36,
        width: '100%',
        // marginLeft: 20
    },
    titleOptionInformation: {
        flex: 2,
    },
    labelOptionInformation: {
        flex: 5,
        // fontSize: 16
    },
    wrapShortLine: {
        // marginTop: 10,
        width: '100%',
        height: 5,
        alignItems: 'flex-end',
        // justifyContent: 'center',
    },
    shortLine: {
        width: '73%',
        height: '100%',
        borderColor: "#dedede",
        borderBottomWidth: 0.5,
    },
    buttonDone: {
        width: '25%',
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#dedede",
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 16,
        backgroundColor: '#f9f9f9',
    },
    wrapButtonDone: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
const Loading = styled.ActivityIndicator.attrs(props => ({
    color: '#111',
    size: 'small',
}))``;