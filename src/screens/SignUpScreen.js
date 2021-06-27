import React, { useState, useContext } from 'react'
import styled from 'styled-components/native'
import { View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Text from "../components/Text"
import HelloImage from '../../assets/join.png';
import * as Permissions from 'expo-permissions';
import Platform from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { log } from 'react-native-reanimated';

import { FirebaseContext } from '../context/FirebaseContext'
import { UserContext } from '../context/UserContext'


export default function SignUpScreen({ navigation }) {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState();
    const firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);

    const signUp = async () => {
        setLoading(true)
        const user = { username, email, password, profilePhoto, posts: 0, followers: 0, following: 0 }
        try {
            const createUser = await firebase.createUser(user);
            setUser({ ...createUser, isLoggedIn: true })
        } catch (error) {
            console.log("Error @SignUp: ", error);
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
                <Text large center style={({ marginTop: 20 })}>
                    Sign up to get started
                </Text>
            </View>
            <View style={styles.main}>

                <View style={styles.auth}>
                    <View style={styles.authContainer}>
                        <Text style={styles.authTitle}>User name</Text>
                        <TextInput
                            style={styles.authField}
                            autoCapitalize="none"
                            autoCorrect={false}
                            // autoFocus={true}
                            onChangeText={(username) => setUsername(username.trim())}
                            value={username}
                        ></TextInput>
                    </View>
                    <View style={styles.authContainer}>
                        <Text style={styles.authTitle}>Email address</Text>
                        <TextInput style={styles.authField}
                            autoCompleteType="email"
                            autoCapitalize="none"
                            autoCorrect={false}
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
                        ></TextInput>
                    </View>
                    <TouchableOpacity disabled={loading} style={styles.signInContainer} onPress={signUp}>
                        {loading ? (
                            <Loading />
                        ) : (
                            <Text bold center color="#fff">Sign Up</Text>
                        )}

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signUpContainer}
                        onPress={() => { navigation.navigate("SignIn") }}
                    >
                        <Text center color="#111" small center>Already have an account?<Text bold> Sign In</Text></Text>
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
        justifyContent: 'center',
        flex: 4,
        alignItems: 'center',
    },

    headerImage: {
        width: 200,
        height: 200,
        paddingLeft: 0,
    },
    main: {
        flex: 6,
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
