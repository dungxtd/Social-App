import React, { useContext } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import Text from '../components/Text'

import { UserContext } from '../context/UserContext'
import { FirebaseContext } from '../context/FirebaseContext'

export default function ProfileScreen() {

    const [user, setUser] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)
    const logOut = async () => {
        const loggedOut = await firebase.logOut();
        if (loggedOut) {
            setUser(state => ({ ...state, isLoggedIn: false }))
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profileInfoContainer}>
                    <View style={styles.profilePhotoContainer}>
                        <Image style={styles.profilePhoto} source={user.profilePhotoUrl === "default" ? require("../../assets/defaultProfilePhoto.jpg")
                            : {
                                uri: user.profilePhotoUrl
                            }} />
                    </View>
                    <Text medium bold center style={styles.profileUsernameTitle}>{user.username}</Text>
                </View>
                <View style={styles.startsContainer}>
                    <View style={styles.startContainer}>
                        <Text bold center>0</Text>
                        <Text center>Posts</Text>
                    </View>
                    <View style={styles.startContainer}>
                        <Text bold center>1000</Text>
                        <Text center>Followers</Text>
                    </View>
                    <View style={styles.startContainer}>
                        <Text bold center>0</Text>
                        <Text center>Following</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={logOut}>
                <Text medium bold color="red">Log out</Text>
            </TouchableOpacity>
        </View>
    )



}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 32,
        flex: 1,
        padding: 20,
        justifyContent: 'space-between'
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    profileInfoContainer: {
        display: 'flex',
        flex: 1,
    },
    profilePhotoContainer: {
        shadowOpacity: 0.2,
        shadowRadius: 30,
        shadowColor: '#222222',
    },
    profilePhoto: {
        width: 96,
        height: 96,
        borderRadius: 48,
    },
    profileUsernameTitle: {
        marginTop: 16,
        marginBottom: 32,
    },
    startsContainer: {
        flex: 3,
        marginLeft: 32,
        justifyContent: 'center',
        marginBottom: 64,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    startContainer: {
        justifyContent: 'center',
    }
})
