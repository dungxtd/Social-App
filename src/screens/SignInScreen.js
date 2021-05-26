import React, { useState, useContext } from 'react'
import styled from 'styled-components/native'
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Text from "../components/Text"
import HelloImage from '../../assets/hello.png';
import { FirebaseContext } from '../context/FirebaseContext'
import { UserContext } from '../context/UserContext'
import InputScrollView from 'react-native-input-scroll-view';


export default function SignInScreen({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);

    const signIn = async () => {
        setLoading(true);
        try {
            await firebase.signIn(email, password);

            const uid = firebase.getCurrentUser().uid;

            const userInfo = await firebase.getUserInfo(uid);

            setUser({
                username: userInfo.username,
                email: userInfo.email,
                uid,
                profilePhotoUrl: userInfo.profilePhotoUrl,
                isLoggedIn: true,

            })
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.headerImage}
                    source={HelloImage}
                />
                <Text title bold center style={({ marginTop: 20 })}>Login</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.auth}>
                    <View style={styles.authContainer}>
                        <Text style={styles.authTitle}>Email address</Text>

                        <TextInput style={styles.authField}
                            autoCompleteType="email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            // autoFocus={true}
                            keyboardType="email-address"
                            onChangeText={(email) => setEmail(email.trim())}
                            value={email}
                        ></TextInput>
                    </View>
                    <View style={styles.authContainer}>
                        <Text style={styles.authTitle}>Password</Text>
                        <TextInput style={styles.authField}
                            autoCompleteType="password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password.trim())}
                            value={password}
                            onSubmitEditing={Keyboard.dismiss}
                        ></TextInput>
                    </View>
                    <TouchableOpacity onPress={signIn} disabled={loading} style={styles.signInContainer}>
                        {loading ? (
                            <Loading />
                        ) : (
                            <Text bold center color="#fff">Sign In</Text>
                        )}

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signUpContainer} onPress={() => {
                        navigation.navigate("SignUp")
                    }}>
                        <Text center color="#111" small semi center>Don't have an account? <Text bold>Sign Up</Text></Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        textAlign: 'center',
        display: 'flex',
    },
    header: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerImage: {
        width: 200,
        height: 200,
        paddingLeft: 0,
    },
    main: {
        flex: 5,
        display: 'flex',
    },
    auth: {
    },
    authContainer: {
        marginLeft: 32,
        marginRight: 32,
        marginBottom: 32,
    },
    authTitle: {
        color: 'black',
        textTransform: 'uppercase',
        fontWeight: '300',
        fontSize: 13,
    },
    authField: {
        color: 'black',
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        height: 48,
        fontSize: 16,
    },
    signInContainer: {
        marginLeft: 32,
        marginRight: 32,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111',
        borderRadius: 6,
    },
    signUpContainer: {
        marginTop: 12,
    }
})
const Loading = styled.ActivityIndicator.attrs(props => ({
    color: '#ffffff',
    size: 'small',

}))``;
