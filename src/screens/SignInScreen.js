import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Text from "../components/Text"
import HelloImage from '../../assets/hello.png';


export default function SignInScreen({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

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
                        ></TextInput>
                    </View>
                    <TouchableOpacity disabled={loading} style={styles.signInContainer}>
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
