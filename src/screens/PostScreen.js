import React, { useContext } from 'react'
import { StyleSheet, View, TextInput, Keyboard, TouchableOpacity, Image } from 'react-native'
import InputScrollView from 'react-native-input-scroll-view';
import Text from '../components/Text'
import { UserContext } from '../context/UserContext'

export default function PostScreen() {
    const [value, onChangeText] = React.useState('');
    const [user, setUser] = useContext(UserContext)


    return (
        <View>

            <InputScrollView >
                <View style={styles.profileInfoContainer}>
                    <View style={styles.profilePhotoContainer}>
                        <Image style={styles.profilePhoto} source={user.profilePhotoUrl === "default" ? require("../../assets/defaultProfilePhoto.jpg")
                            : {
                                uri: user.profilePhotoUrl
                            }} />
                    </View>
                    <Text medium bold center style={styles.profileUsernameTitle}>{user.username}</Text>
                </View>
                <TextInput
                    autoFocus={true}
                    placeholder="What's on your mind?"
                    style={styles.input}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    ho
                    multiline />
            </InputScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: '100%',
        marginLeft: 12,
        marginRight: 12,
        paddingBottom: '30%',
        fontSize: 18,
    },
    profileInfoContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 5
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
        paddingLeft: 5,
    },
});
