import { useState, useContext } from 'react'
import * as React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { UserContext } from '../context/UserContext'
import { FirebaseContext } from '../context/FirebaseContext'
import Text from '../components/Text'
import * as Permissions from 'expo-permissions';
import Platform from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen({ navigation }) {
    const [user, setUser] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [profilePhoto, setProfilePhoto] = useState(user.profilePhotoUrl);
    const uid = useState(user.uid);

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
                    <TouchableOpacity style={{ marginRight: 20 }}>
                        <Text medium>Cancel</Text>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 20 }}
                    onPress={() => updateProfile()}
                >
                    <Text bold medium color={'#40a0ed'}>Done</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, updateProfile]);

    const updateProfile = async () => {
        const userUpdate = await { username }
        await firebase.updateProfile(userUpdate);
    }

    const getPermission = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            return status;
        }
    }
    const addProfilePhoto = async () => {
        const status = await getPermission();
        if (status !== "granted") {
            alert("We need permission to access your camera roll.")
            return;
        }
        pickImage();
    }
    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaType: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            })
            if (!result.cancelled) {
                setProfilePhoto(result.uri)
            }
        } catch (err) {
            console.log("Error @pickerImage: ", err);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.profilePhotoContainer}>
                {<Image />}
                <Image style={styles.profilePhoto} source={user.profilePhotoUrl === "default" ? require("../../assets/defaultProfilePhoto.jpg")
                    : {
                        uri: user.profilePhotoUrl
                    }} />
            </View>
            <TouchableOpacity style={{ marginTop: 10 }} onPress={addProfilePhoto}>
                <Text small bold color="#40a0ed">Change Profile Photo</Text>
            </TouchableOpacity>
            <View style={styles.wrapLongLine}>
                <View style={styles.longLine}></View>
            </View>
            <View style={styles.wrapOptionInformation}>
                <Text medium style={styles.titleOptionInformation}>Name</Text>
                <TextInput
                    style={styles.labelOptionInformation}
                    value={email}
                    fontSize={16}
                    fontWeight={'400'}
                    onChangeText={(email) => setEmail(email.trim())} />
            </View>
            <View style={styles.wrapShortLine}>
                <View style={styles.shortLine}></View>
            </View>
            <View style={styles.wrapOptionInformation}>
                <Text medium style={styles.titleOptionInformation}>Username</Text>
                <TextInput
                    style={styles.labelOptionInformation}
                    value={username}
                    fontSize={16}
                    onChangeText={(username) => setUsername(username.trim())} />
            </View>
            <View style={styles.wrapShortLine}>
                <View style={styles.shortLine}></View>
            </View>
            <View style={styles.wrapOptionInformation}>
                <Text medium style={styles.titleOptionInformation}>Bio</Text>
                <TextInput
                    style={styles.labelOptionInformation}
                    value={email}
                    fontSize={16}
                    fontWeight={'400'}
                    onChangeText={(email) => setEmail(email.trim())} />
            </View>
            <View style={styles.wrapShortLine}>
                <View style={styles.shortLine}></View>
            </View>
            <View style={styles.wrapOptionInformation}>
                <Text medium style={styles.titleOptionInformation}>Email</Text>
                <TextInput
                    style={styles.labelOptionInformation}
                    value={email}
                    fontSize={16}
                    fontWeight={'400'}
                    onChangeText={(email) => setEmail(email.trim())} />
            </View>
            <View style={styles.wrapLongLine}>
                <View style={styles.longLine}></View>
            </View>
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
})
