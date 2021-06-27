import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import Text from "../components/Text"
import { UserContext } from '../context/UserContext'
import { FirebaseContext } from '../context/FirebaseContext'

export default function LoadingScreen() {

    const [_, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);


    useEffect(() => {
        setTimeout(async () => {
            const user = firebase.getCurrentUser();
            if (user) {
                const userInfo = await firebase.getUserInfo(user.uid);
                setUser({
                    isLoggedIn: true,
                    email: userInfo.email,
                    uid: user.uid,
                    bio: userInfo.bio,
                    name: userInfo.name,
                    posts: userInfo.posts,
                    followers: userInfo.followers,
                    following: userInfo.following,
                    username: userInfo.username,
                    profilePhotoUrl: userInfo.profilePhotoUrl
                })
            }
            else {
                setUser(state => ({ ...state, isLoggedIn: false }))
            }
        }, 500)
    }, [])

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, position: 'relative' }}>
            <LottieView
                source={require('../../assets/159-servishero-loading.json')}
                autoPlay
                loop
                style={{
                    width: "60%", height: "60%",
                    position: "absolute", left: "15%", top: "12%",
                }} />
            <Text medium bold center
                style={{
                    position: "absolute", left: "42%", top: "55%",
                }}
            >Loading...</Text>
        </View>
    )
}

