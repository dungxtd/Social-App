import React, { useContext } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import Text from '../components/Text'
import { Entypo, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'
import { UserContext } from '../context/UserContext'
import { FirebaseContext } from '../context/FirebaseContext'

export default function ProfileScreen({ navigation }) {

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
                <View style={styles.profileUsernameTitle}>
                    <Text medium bold center >{user.username}</Text>
                    <MaterialIcons name={'verified'} size={16} color={'#40a0ed'} style={{ paddingTop: 2 }} />
                </View>
                <View style={styles.profileInfoContainer}>
                    <View style={styles.profilePhotoContainer}>
                        <Image style={styles.profilePhoto} source={user.profilePhotoUrl === "default" ? require("../../assets/defaultProfilePhoto.jpg")
                            : {
                                uri: user.profilePhotoUrl
                            }} />
                    </View>
                    <View style={styles.startsContainer}>
                        <View style={styles.startContainer}>
                            <Text bold center>0</Text>
                            <Text center small>Posts</Text>
                        </View>
                        <View style={styles.startContainer}>
                            <Text bold center>1000</Text>
                            <Text center small>Followers</Text>
                        </View>
                        <View style={styles.startContainer}>
                            <Text bold center>0</Text>
                            <Text center small>Following</Text>
                        </View>
                    </View>
                </View>
                {/* <View style={styles.wrapPostLine}>
                    <View style={styles.postLine}></View>
                </View> */}
                <View style={styles.profileNameAndDescription}>
                    <Text bold>Dũng</Text>
                    <Text style={{ paddingTop: 2 }}>dep zai tuyet voi</Text>
                </View>
                <TouchableOpacity style={styles.buttonEditProfile} onPress={() => {
                    navigation.navigate("EditProfile")
                }}>
                    <Text bold>Edit Profile</Text>
                </TouchableOpacity>
                <View style={styles.wrapProfileLine}>
                    <View style={styles.profileLine}></View>
                </View>
            </View>
            <TouchableOpacity onPress={logOut} >
                <Text medium bold color="red">Log out</Text>
            </TouchableOpacity>

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
    buttonEditProfile: {
        width: '100%',
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#dedede",
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 36,
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
